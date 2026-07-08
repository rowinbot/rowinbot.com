import dagre from '@dagrejs/dagre'

import {
  type DiagramGraph,
  type DiagramGraphAnnotation,
  type DiagramGraphEdge,
  type DiagramNodeKind,
  nodeSize,
} from './diagram-graph'

export interface Point {
  x: number
  y: number
}

export interface LaidOutNode {
  id: string
  kind: DiagramNodeKind
  label: string
  sublabels?: string[]
  x: number
  y: number
  width: number
  height: number
}

export interface LaidOutEdge {
  id: string
  points: Point[]
  label?: string
  labelPoint?: Point
  dashed?: boolean
}

export interface PlacedAnnotation {
  x: number
  y: number
  lines: string[]
  arrowPath: string
}

export interface DiagramLayout {
  nodes: LaidOutNode[]
  edges: LaidOutEdge[]
  annotations: PlacedAnnotation[]
  viewBox: string
}

interface LayoutOptions {
  rankdir?: 'TB' | 'LR'
  nodesep?: number
  ranksep?: number
  padding?: number
}

const EDGE_LABEL_CHAR_WIDTH = 7
const EDGE_LABEL_HEIGHT = 18
const ANNOTATION_GAP = 32
const ANNOTATION_LINE_HEIGHT = 16
const ANNOTATION_CHAR_WIDTH = 7
const VIEW_PADDING = 18

/*
  Lays a data-only graph out with dagre synchronously (pure JS, no DOM) so it is
  safe inside renderToString under RR7 SSR. dagre owns "where" — node centers,
  full edge polylines, and reserved label positions — the notebook SVG owns
  "how". Free-floating margin annotations are placed afterward and folded into
  the fitted viewBox so a note never spills past the frame.
*/
export function layoutDiagram(
  graph: DiagramGraph,
  { rankdir = 'TB', nodesep = 46, ranksep = 58, padding = 22 }: LayoutOptions = {},
): DiagramLayout {
  const g = new dagre.graphlib.Graph({ multigraph: true })
  g.setGraph({ rankdir, nodesep, ranksep, marginx: padding, marginy: padding })
  g.setDefaultEdgeLabel(() => ({}))

  graph.nodes.forEach((node) => {
    g.setNode(node.id, nodeSize(node))
  })

  graph.edges.forEach((edge, index) => {
    const label = edge.label
      ? {
          width: edge.label.length * EDGE_LABEL_CHAR_WIDTH + 10,
          height: EDGE_LABEL_HEIGHT,
          labelpos: 'c' as const,
        }
      : {}
    g.setEdge(edge.from, edge.to, label, edgeId(edge, index))
  })

  dagre.layout(g)

  const nodes: LaidOutNode[] = graph.nodes.map((node) => {
    const positioned = g.node(node.id)
    return {
      id: node.id,
      kind: node.kind,
      label: node.label,
      sublabels: node.sublabels,
      x: positioned.x,
      y: positioned.y,
      width: positioned.width,
      height: positioned.height,
    }
  })

  const edges: LaidOutEdge[] = graph.edges.map((edge, index) => {
    const id = edgeId(edge, index)
    const positioned = g.edge(edge.from, edge.to, id)
    return {
      id,
      points: positioned.points.map((point: Point) => ({ x: point.x, y: point.y })),
      label: edge.label,
      labelPoint:
        edge.label && typeof positioned.x === 'number'
          ? { x: positioned.x, y: positioned.y }
          : undefined,
      dashed: edge.dashed,
    }
  })

  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const annotations = graph.annotations
    .map((annotation) => {
      const anchor = nodeById.get(annotation.anchor)
      return anchor ? placeAnnotation(annotation, anchor) : null
    })
    .filter((placement): placement is PlacedAnnotationWithBounds => placement !== null)

  const viewBox = fitViewBox(nodes, edges, annotations)

  return {
    nodes,
    edges,
    annotations: annotations.map(({ bounds: _bounds, ...placed }) => placed),
    viewBox,
  }
}

interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

interface PlacedAnnotationWithBounds extends PlacedAnnotation {
  bounds: Bounds
}

/*
  Places a margin note beside its anchor on the requested side and draws the
  arrow from the note's anchor-facing edge to the anchor's facing edge — so the
  arrow reads from wherever the note actually sits, not always from its left.
*/
function placeAnnotation(
  annotation: DiagramGraphAnnotation,
  anchor: LaidOutNode,
): PlacedAnnotationWithBounds {
  const { side, lines } = annotation
  const noteWidth =
    lines.reduce((max, line) => Math.max(max, line.length), 0) * ANNOTATION_CHAR_WIDTH
  const noteHeight = lines.length * ANNOTATION_LINE_HEIGHT
  const halfW = anchor.width / 2
  const halfH = anchor.height / 2

  let boxX: number
  let boxY: number
  switch (side) {
    case 'right':
      boxX = anchor.x + halfW + ANNOTATION_GAP
      boxY = anchor.y - noteHeight / 2
      break
    case 'left':
      boxX = anchor.x - halfW - ANNOTATION_GAP - noteWidth
      boxY = anchor.y - noteHeight / 2
      break
    case 'above':
      boxX = anchor.x - noteWidth / 2
      boxY = anchor.y - halfH - ANNOTATION_GAP - noteHeight
      break
    case 'below':
    default:
      boxX = anchor.x - noteWidth / 2
      boxY = anchor.y + halfH + ANNOTATION_GAP
      break
  }

  const from = noteFacingPoint(side, boxX, boxY, noteWidth, noteHeight)
  const to = anchorFacingPoint(side, anchor, halfW, halfH)
  const control = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
  const arrowPath = `M${from.x},${from.y} Q${control.x},${control.y} ${to.x},${to.y}`

  return {
    x: boxX,
    y: boxY + ANNOTATION_LINE_HEIGHT * 0.8,
    lines,
    arrowPath,
    bounds: {
      minX: boxX,
      maxX: boxX + noteWidth,
      minY: boxY,
      maxY: boxY + noteHeight,
    },
  }
}

function noteFacingPoint(
  side: DiagramGraphAnnotation['side'],
  boxX: number,
  boxY: number,
  w: number,
  h: number,
): Point {
  switch (side) {
    case 'right':
      return { x: boxX, y: boxY + h / 2 }
    case 'left':
      return { x: boxX + w, y: boxY + h / 2 }
    case 'above':
      return { x: boxX + w / 2, y: boxY + h }
    case 'below':
    default:
      return { x: boxX + w / 2, y: boxY }
  }
}

function anchorFacingPoint(
  side: DiagramGraphAnnotation['side'],
  anchor: LaidOutNode,
  halfW: number,
  halfH: number,
): Point {
  switch (side) {
    case 'right':
      return { x: anchor.x + halfW, y: anchor.y }
    case 'left':
      return { x: anchor.x - halfW, y: anchor.y }
    case 'above':
      return { x: anchor.x, y: anchor.y - halfH }
    case 'below':
    default:
      return { x: anchor.x, y: anchor.y + halfH }
  }
}

function fitViewBox(
  nodes: LaidOutNode[],
  edges: LaidOutEdge[],
  annotations: PlacedAnnotationWithBounds[],
): string {
  const box: Bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }

  for (const node of nodes) {
    box.minX = Math.min(box.minX, node.x - node.width / 2)
    box.maxX = Math.max(box.maxX, node.x + node.width / 2)
    box.minY = Math.min(box.minY, node.y - node.height / 2)
    box.maxY = Math.max(box.maxY, node.y + node.height / 2)
  }

  for (const edge of edges) {
    for (const point of edge.points) {
      box.minX = Math.min(box.minX, point.x)
      box.maxX = Math.max(box.maxX, point.x)
      box.minY = Math.min(box.minY, point.y)
      box.maxY = Math.max(box.maxY, point.y)
    }
  }

  for (const { bounds } of annotations) {
    box.minX = Math.min(box.minX, bounds.minX)
    box.maxX = Math.max(box.maxX, bounds.maxX)
    box.minY = Math.min(box.minY, bounds.minY)
    box.maxY = Math.max(box.maxY, bounds.maxY)
  }

  const minX = box.minX - VIEW_PADDING
  const minY = box.minY - VIEW_PADDING
  const width = box.maxX - box.minX + VIEW_PADDING * 2
  const height = box.maxY - box.minY + VIEW_PADDING * 2
  return `${minX} ${minY} ${width} ${height}`
}

function edgeId(edge: DiagramGraphEdge, index: number): string {
  return `${edge.from}-${edge.to}-${index}`
}

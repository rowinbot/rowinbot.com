import { DiagramAnnotation } from '../diagram-annotation'
import { layoutGraph, type LaidOutNode } from './dagre-layout'
import { DiagramEdge } from './diagram-edge'
import { DiagramNode } from './diagram-node'
import {
  ARIA_LABEL,
  TITLE,
  type DiagramGraph,
  type DiagramGraphAnnotation,
} from './site-pipeline-graph'

interface DagreFigureProps {
  graph: DiagramGraph
}

const ANNOTATION_GAP = 30
const LINE_HEIGHT = 15
const NOTE_CHAR_WIDTH = 7.3
const VIEW_PADDING = 16

interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

interface AnnotationPlacement {
  x: number
  y: number
  lines: string[]
  arrowPath: string
  bounds: Bounds
}

/*
  Approach A: dagre assigns coordinates at render time (synchronous, SSR-safe),
  the notebook SVG components draw them. The viewBox is fitted to the true
  content box — nodes AND the free annotations, which sit outside dagre's own
  node/edge extent — so a margin note never spills past the frame.
*/
export function DagreFigure({ graph }: DagreFigureProps) {
  const layout = layoutGraph(graph, { rankdir: 'TB', ranksep: 56, nodesep: 40 })
  const nodeById = new Map(layout.nodes.map((node) => [node.id, node]))

  const placements = graph.annotations
    .map((annotation) => {
      const anchor = nodeById.get(annotation.anchor)
      return anchor ? placeAnnotation(annotation, anchor) : null
    })
    .filter((placement): placement is AnnotationPlacement => placement !== null)

  const view = fitViewBox(layout.nodes, placements)

  return (
    <svg
      className="diagram diagram-lab"
      viewBox={`${view.minX} ${view.minY} ${view.maxX - view.minX} ${view.maxY - view.minY}`}
      role="img"
      aria-label={ARIA_LABEL}
    >
      <title>{TITLE}</title>
      <g>
        {layout.edges.map((edge) => (
          <DiagramEdge key={edge.id} edge={edge} />
        ))}
        {layout.nodes.map((node) => (
          <DiagramNode key={node.id} node={node} />
        ))}
        {placements.map((placement, index) => (
          <DiagramAnnotation
            key={index}
            x={placement.x}
            y={placement.y}
            lines={placement.lines}
            lineHeight={LINE_HEIGHT}
            arrowPath={placement.arrowPath}
          />
        ))}
      </g>
    </svg>
  )
}

function placeAnnotation(
  annotation: DiagramGraphAnnotation,
  anchor: LaidOutNode
): AnnotationPlacement {
  const { side, lines } = annotation
  const noteWidth = lines.reduce((max, line) => Math.max(max, line.length), 0) * NOTE_CHAR_WIDTH
  const noteHeight = lines.length * LINE_HEIGHT
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

  // Arrow leaves the note edge that faces the anchor and lands on the anchor's
  // facing edge — so it reads from wherever the note actually sits, not always
  // from the note's left.
  const from = anchorFacingPoint(side, boxX, boxY, noteWidth, noteHeight)
  const to = nodeFacingPoint(side, anchor, halfW, halfH)
  const arrowPath = `M${from.x},${from.y} Q${(from.x + to.x) / 2},${(from.y + to.y) / 2} ${to.x},${to.y}`

  return {
    x: boxX,
    y: boxY + LINE_HEIGHT * 0.8,
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

function anchorFacingPoint(
  side: DiagramGraphAnnotation['side'],
  boxX: number,
  boxY: number,
  w: number,
  h: number
): { x: number; y: number } {
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

function nodeFacingPoint(
  side: DiagramGraphAnnotation['side'],
  anchor: LaidOutNode,
  halfW: number,
  halfH: number
): { x: number; y: number } {
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
  placements: AnnotationPlacement[]
): Bounds {
  const box: Bounds = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  }

  for (const node of nodes) {
    box.minX = Math.min(box.minX, node.x - node.width / 2)
    box.maxX = Math.max(box.maxX, node.x + node.width / 2)
    box.minY = Math.min(box.minY, node.y - node.height / 2)
    box.maxY = Math.max(box.maxY, node.y + node.height / 2)
  }

  for (const { bounds } of placements) {
    box.minX = Math.min(box.minX, bounds.minX)
    box.maxX = Math.max(box.maxX, bounds.maxX)
    box.minY = Math.min(box.minY, bounds.minY)
    box.maxY = Math.max(box.maxY, bounds.maxY)
  }

  return {
    minX: box.minX - VIEW_PADDING,
    minY: box.minY - VIEW_PADDING,
    maxX: box.maxX + VIEW_PADDING,
    maxY: box.maxY + VIEW_PADDING,
  }
}

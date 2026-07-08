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
  const layout = layoutGraph(graph)
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
  const below = annotation.side === 'below'
  const nodeEdge = below
    ? anchor.y + anchor.height / 2
    : anchor.y - anchor.height / 2
  const textTop = below
    ? nodeEdge + ANNOTATION_GAP
    : nodeEdge - ANNOTATION_GAP - (annotation.lines.length - 1) * LINE_HEIGHT
  const x = anchor.x - anchor.width / 2

  const arrowStart = { x: x + 14, y: below ? textTop - 14 : textTop + annotation.lines.length * LINE_HEIGHT }
  const arrowEnd = { x: anchor.x - 8, y: nodeEdge + (below ? 3 : -3) }
  const arrowPath = `M${arrowStart.x},${arrowStart.y} Q${(arrowStart.x + arrowEnd.x) / 2},${arrowEnd.y} ${arrowEnd.x},${arrowEnd.y}`

  const widest = annotation.lines.reduce((max, line) => Math.max(max, line.length), 0)
  const bounds: Bounds = {
    minX: x,
    maxX: x + widest * NOTE_CHAR_WIDTH,
    minY: textTop - LINE_HEIGHT,
    maxY: textTop + annotation.lines.length * LINE_HEIGHT,
  }

  return { x, y: textTop, lines: annotation.lines, arrowPath, bounds }
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

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

/*
  Approach A: dagre assigns coordinates at render time (synchronous, SSR-safe),
  the notebook SVG components draw them. Same viewBox-driven svg.diagram the
  hand-authored figures use, so theming, the #rough filter, role=img + <title>,
  and the CSS scroll-driven wipe on `.diagram > g` all apply unchanged.
*/
const ANNOTATION_GAP = 30

export function DagreFigure({ graph }: DagreFigureProps) {
  const layout = layoutGraph(graph)
  const nodeById = new Map(layout.nodes.map((node) => [node.id, node]))

  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
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
        {graph.annotations.map((annotation) => {
          const anchor = nodeById.get(annotation.anchor)
          if (!anchor) return null
          return (
            <AnchoredAnnotation
              key={annotation.anchor}
              annotation={annotation}
              anchor={anchor}
            />
          )
        })}
      </g>
    </svg>
  )
}

interface AnchoredAnnotationProps {
  annotation: DiagramGraphAnnotation
  anchor: LaidOutNode
}

/*
  Places a free red note relative to its anchor node's computed position and
  draws a hand arrow back to the node — so auto-layout keeps the margin-note
  character the hand-placed figure had, without hand-tuned coordinates.
*/
function AnchoredAnnotation({ annotation, anchor }: AnchoredAnnotationProps) {
  const below = annotation.side === 'below'
  const nodeEdge = below
    ? anchor.y + anchor.height / 2
    : anchor.y - anchor.height / 2
  const textY = below ? nodeEdge + ANNOTATION_GAP : nodeEdge - ANNOTATION_GAP
  const x = anchor.x - anchor.width / 2
  const arrowFrom = { x: x + 12, y: below ? textY - 12 : textY + 6 }
  const arrowTo = { x: anchor.x - 8, y: nodeEdge + (below ? 2 : -2) }
  const arrowPath = `M${arrowFrom.x},${arrowFrom.y} Q${(arrowFrom.x + arrowTo.x) / 2},${arrowTo.y} ${arrowTo.x},${arrowTo.y}`

  return (
    <DiagramAnnotation
      x={x}
      y={below ? textY : textY - (annotation.lines.length - 1) * 13}
      lines={annotation.lines}
      arrowPath={arrowPath}
    />
  )
}

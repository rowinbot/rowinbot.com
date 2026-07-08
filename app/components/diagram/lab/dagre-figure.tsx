import { layoutGraph } from './dagre-layout'
import { DiagramEdge } from './diagram-edge'
import { DiagramNode } from './diagram-node'
import {
  ARIA_LABEL,
  TITLE,
  type DiagramGraph,
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
export function DagreFigure({ graph }: DagreFigureProps) {
  const layout = layoutGraph(graph)

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
      </g>
    </svg>
  )
}

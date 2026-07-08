import { DiagramAnnotation } from './diagram-annotation'
import { DiagramEdge } from './diagram-edge'
import { type DiagramGraph } from './diagram-graph'
import { layoutDiagram } from './diagram-layout'
import { DiagramNode } from './diagram-node'

interface DiagramProps {
  graph: DiagramGraph
  title: string
  ariaLabel: string
}

const ANNOTATION_LINE_HEIGHT = 16

/*
  The public diagram: it runs dagre at render time (synchronous, SSR-safe) and
  draws the result into the notebook ink system. dagre decides layout, this
  component decides nothing about geometry — swap the graph and the figure
  redraws. The <g> keeps the CSS scroll-driven draw-on and reduced-motion
  behavior the hand-authored figures had.
*/
export function Diagram({ graph, title, ariaLabel }: DiagramProps) {
  const layout = layoutDiagram(graph)

  return (
    <svg
      className="diagram diagram-auto"
      viewBox={layout.viewBox}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{title}</title>
      <g>
        {layout.edges.map((edge) => (
          <DiagramEdge key={edge.id} edge={edge} />
        ))}
        {layout.nodes.map((node) => (
          <DiagramNode key={node.id} node={node} />
        ))}
        {layout.annotations.map((annotation, index) => (
          <DiagramAnnotation
            key={index}
            x={annotation.x}
            y={annotation.y}
            lines={annotation.lines}
            lineHeight={ANNOTATION_LINE_HEIGHT}
            arrowPath={annotation.arrowPath}
          />
        ))}
      </g>
    </svg>
  )
}

export type { DiagramProps }

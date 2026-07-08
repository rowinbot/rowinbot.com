import { type LaidOutEdge } from './dagre-layout'

interface DiagramEdgeProps {
  edge: LaidOutEdge
}

/*
  Turns dagre's computed polyline into the same hand-drawn stroke the existing
  figures use: the #rough filter, the shared #ah arrowhead, and an optional
  dashed side-output style — all themed through .diagram .stroke.
*/
export function DiagramEdge({ edge }: DiagramEdgeProps) {
  const { points, label, dashed } = edge
  if (points.length === 0) return null

  const mid = points[Math.floor(points.length / 2)]

  return (
    <>
      <path
        className={dashed ? 'stroke stroke-dash' : 'stroke'}
        filter="url(#rough)"
        d={toPath(points)}
        markerEnd="url(#ah)"
      />
      {label ? (
        <text className="edge-l" x={mid.x} y={mid.y - 6} textAnchor="middle">
          {label}
        </text>
      ) : null}
    </>
  )
}

function toPath(points: Array<{ x: number; y: number }>): string {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ')
}

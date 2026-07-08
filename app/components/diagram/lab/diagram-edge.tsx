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

  const start = points[0]
  const end = points[points.length - 1]
  const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }

  return (
    <>
      <path
        className={dashed ? 'stroke stroke-dash' : 'stroke'}
        filter="url(#rough)"
        d={bowedPath(start, end)}
        markerEnd="url(#ah)"
      />
      {label ? (
        <text className="edge-l" x={mid.x} y={mid.y - 8} textAnchor="middle">
          {label}
        </text>
      ) : null}
    </>
  )
}

type Point = { x: number; y: number }

/*
  A gently bowed cubic between the endpoints. The perpendicular bow guarantees a
  2D bounding box even for a purely horizontal/vertical run — without it the
  #rough SVG filter's objectBoundingBox region collapses to zero area and a
  straight edge vanishes — and it reads as a hand-drawn line.
*/
function bowedPath(a: Point, b: Point): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const length = Math.hypot(dx, dy) || 1
  const bow = Math.min(9, length * 0.12)
  const px = (-dy / length) * bow
  const py = (dx / length) * bow
  const c1 = { x: a.x + dx / 3 + px, y: a.y + dy / 3 + py }
  const c2 = { x: a.x + (dx * 2) / 3 + px, y: a.y + (dy * 2) / 3 + py }
  return `M${a.x},${a.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${b.x},${b.y}`
}

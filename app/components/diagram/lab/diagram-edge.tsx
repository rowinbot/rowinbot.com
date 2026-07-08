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
      {label ? <EdgeLabel text={label} x={mid.x} y={mid.y} /> : null}
    </>
  )
}

const EDGE_LABEL_CHAR = 6.4
const EDGE_LABEL_HEIGHT = 16

/*
  A label chip: a surface-filled rounded rect behind the text so the label stays
  legible where an auto-laid edge routes it tight against a node, instead of the
  text bleeding into the box beneath it.
*/
function EdgeLabel({ text, x, y }: { text: string; x: number; y: number }) {
  const width = text.length * EDGE_LABEL_CHAR + 8
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - EDGE_LABEL_HEIGHT / 2}
        width={width}
        height={EDGE_LABEL_HEIGHT}
        rx={3}
        fill="var(--surface)"
      />
      <text className="edge-l" x={x} y={y + 4} textAnchor="middle">
        {text}
      </text>
    </g>
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

import { type LaidOutEdge, type Point } from './diagram-layout'

interface DiagramEdgeProps {
  edge: LaidOutEdge
}

/*
  Renders dagre's full computed polyline — not just its endpoints — so a long
  routed back-edge follows its channel instead of cutting a straight diagonal
  across the graph. The line wears the shared #rough filter, the #ah arrowhead,
  and an optional dashed side-output style, all themed through .diagram .stroke.
*/
export function DiagramEdge({ edge }: DiagramEdgeProps) {
  const { points, label, labelPoint, dashed } = edge
  if (points.length < 2) return null

  const chip = labelPoint ?? midpoint(points[0], points[points.length - 1])

  return (
    <>
      <path
        className={dashed ? 'stroke stroke-dash' : 'stroke'}
        filter="url(#rough)"
        d={edgePath(points)}
        markerEnd="url(#ah)"
      />
      {label ? <EdgeLabel text={label} x={chip.x} y={chip.y} /> : null}
    </>
  )
}

const EDGE_LABEL_CHAR = 7
const EDGE_LABEL_HEIGHT = 18

/*
  A surface-filled chip behind the label so it stays legible where an auto-laid
  edge routes it tight against a node, instead of bleeding into the box beneath.
*/
function EdgeLabel({ text, x, y }: { text: string; x: number; y: number }) {
  const width = text.length * EDGE_LABEL_CHAR + 10
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

/*
  A smoothed path through every polyline vertex, rounding each dagre bend so it
  reads hand-drawn. A two-point (or collinear) run is bowed instead: a purely
  axis-aligned line gives the #rough filter's objectBoundingBox region zero area
  and vanishes, so the perpendicular bow guarantees a 2D box.
*/
function edgePath(points: Point[]): string {
  if (points.length === 2 || isCollinear(points)) {
    return bowedPath(points[0], points[points.length - 1])
  }

  const first = points[0]
  const firstMid = midpoint(points[0], points[1])
  let d = `M${first.x},${first.y} L${firstMid.x},${firstMid.y}`
  for (let i = 1; i < points.length - 1; i++) {
    const mid = midpoint(points[i], points[i + 1])
    d += ` Q${points[i].x},${points[i].y} ${mid.x},${mid.y}`
  }
  const last = points[points.length - 1]
  d += ` L${last.x},${last.y}`
  return d
}

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

function isCollinear(points: Point[]): boolean {
  const allSameX = points.every((point) => Math.abs(point.x - points[0].x) < 0.5)
  const allSameY = points.every((point) => Math.abs(point.y - points[0].y) < 0.5)
  return allSameX || allSameY
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

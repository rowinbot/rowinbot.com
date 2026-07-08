import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from '@xyflow/react'

export interface RoughEdgeData {
  label?: string
  dashed?: boolean
  [key: string]: unknown
}

/*
  A React Flow custom edge type that draws the notebook stroke: React Flow computes
  the route, and we render it with the shared #rough filter, the #ah arrowhead, and
  token colors — so edges wear the same hand-drawn look as the SVG figures.
*/
export function RoughEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps & { data?: RoughEdgeData }) {
  const path = bowedPath(sourceX, sourceY, targetX, targetY)
  const labelX = (sourceX + targetX) / 2
  const labelY = (sourceY + targetY) / 2

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd="url(#ah)"
        style={{
          stroke: 'var(--accent)',
          strokeWidth: 2,
          fill: 'none',
          filter: 'url(#rough)',
          strokeDasharray: data?.dashed ? '6 6' : undefined,
        }}
      />
      {data?.label ? (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: 'var(--surface)',
              color: 'var(--link)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: '0 3px',
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}

/*
  A bowed cubic between the handles. The perpendicular bow keeps a 2D bounding
  box even when the two nodes share a row, so the #rough filter never collapses
  a straight horizontal edge to nothing — the same fix the SVG figure uses.
*/
function bowedPath(ax: number, ay: number, bx: number, by: number): string {
  const dx = bx - ax
  const dy = by - ay
  const length = Math.hypot(dx, dy) || 1
  const bow = Math.min(9, length * 0.12)
  const px = (-dy / length) * bow
  const py = (dx / length) * bow
  const c1x = ax + dx / 3 + px
  const c1y = ay + dy / 3 + py
  const c2x = ax + (dx * 2) / 3 + px
  const c2y = ay + (dy * 2) / 3 + py
  return `M${ax},${ay} C${c1x},${c1y} ${c2x},${c2y} ${bx},${by}`
}

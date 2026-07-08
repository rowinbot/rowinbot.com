import { type LaidOutNode } from './dagre-layout'

interface DiagramNodeProps {
  node: LaidOutNode
}

/*
  A single laid-out node rendered into the notebook ink system: the shape wears
  the shared #rough filter and token classes (var(--box)/var(--accent) via
  .diagram .box etc.), while the labels stay unfiltered so text is crisp.
*/
export function DiagramNode({ node }: DiagramNodeProps) {
  const { x, y, width, height, kind, label, sublabel } = node
  const left = x - width / 2
  const top = y - height / 2

  return (
    <g>
      {kind === 'decision' ? (
        <path
          className="diamond stroke"
          filter="url(#rough)"
          d={diamondPath(x, y, width, height)}
        />
      ) : (
        <rect
          className={shapeClass(kind)}
          filter="url(#rough)"
          x={left}
          y={top}
          width={width}
          height={height}
          rx={kind === 'terminal' ? height / 2 : 5}
        />
      )}

      {sublabel ? (
        <>
          <text className="lbl" x={x} y={y - 1} textAnchor="middle">
            {label}
          </text>
          <text className="lbl-sub" x={x} y={y + 14} textAnchor="middle">
            {sublabel}
          </text>
        </>
      ) : (
        <text className="lbl" x={x} y={y + 4} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

function shapeClass(kind: LaidOutNode['kind']): string {
  if (kind === 'origin') return 'box box-origin stroke'
  if (kind === 'terminal') return 'term stroke'
  return 'box stroke'
}

function diamondPath(cx: number, cy: number, width: number, height: number): string {
  const halfW = width / 2
  const halfH = height / 2
  return `M${cx},${cy - halfH} L${cx + halfW},${cy} L${cx},${cy + halfH} L${cx - halfW},${cy} Z`
}

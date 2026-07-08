import {
  SUBLABEL_LINE_HEIGHT,
  TITLE_LINE_HEIGHT,
  type DiagramNodeKind,
} from './diagram-graph'
import { type LaidOutNode } from './diagram-layout'

interface DiagramNodeProps {
  node: LaidOutNode
}

/*
  A laid-out node drawn into the notebook ink system: the shape wears the shared
  #rough filter and token classes, while its label stack stays unfiltered so the
  text is crisp. Title lines and muted sublabels are centered as one block, so a
  one-line box and a two-line decision both sit true to the shape's middle.
*/
export function DiagramNode({ node }: DiagramNodeProps) {
  const { x, y, width, height, kind, label, sublabels } = node
  const titleLines = label.split('\n')
  const subs = sublabels ?? []

  const blockHeight = titleLines.length * TITLE_LINE_HEIGHT + subs.length * SUBLABEL_LINE_HEIGHT
  const firstBaseline = y - blockHeight / 2 + TITLE_LINE_HEIGHT * 0.74
  const titleBlock = titleLines.length * TITLE_LINE_HEIGHT

  const titleBaselines = titleLines.map((line, index) => ({
    line,
    at: firstBaseline + index * TITLE_LINE_HEIGHT,
  }))
  const subBaselines = subs.map((line, index) => ({
    line,
    at: firstBaseline + titleBlock + index * SUBLABEL_LINE_HEIGHT,
  }))

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
          x={x - width / 2}
          y={y - height / 2}
          width={width}
          height={height}
          rx={kind === 'terminal' ? height / 2 : 5}
        />
      )}

      {titleBaselines.map(({ line, at }) => (
        <text key={`t-${line}`} className="lbl" x={x} y={at} textAnchor="middle">
          {line}
        </text>
      ))}
      {subBaselines.map(({ line, at }) => (
        <text key={`s-${line}`} className="lbl-sub" x={x} y={at} textAnchor="middle">
          {line}
        </text>
      ))}
    </g>
  )
}

function shapeClass(kind: DiagramNodeKind): string {
  if (kind === 'origin') return 'box box-origin stroke'
  if (kind === 'terminal') return 'term stroke'
  return 'box stroke'
}

function diamondPath(cx: number, cy: number, width: number, height: number): string {
  const halfW = width / 2
  const halfH = height / 2
  return `M${cx},${cy - halfH} L${cx + halfW},${cy} L${cx},${cy + halfH} L${cx - halfW},${cy} Z`
}

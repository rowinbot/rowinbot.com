import { Handle, Position, type NodeProps } from '@xyflow/react'

import { type DiagramNodeKind } from './site-pipeline-graph'

export interface RoughNodeData {
  label: string
  sublabel?: string
  kind: DiagramNodeKind
  width: number
  height: number
  [key: string]: unknown
}

/*
  A React Flow custom node type that wears the notebook look through React Flow's
  own extension point: it renders inline SVG carrying the shared #rough filter and
  the token colors (var(--box)/--accent/--ink, resolved document-wide), instead of
  React Flow's default HTML box. This is how B matches A's hand-drawn aesthetic.
*/
export function RoughNode({ data }: NodeProps & { data: RoughNodeData }) {
  const { label, sublabel, kind, width, height } = data
  const terminal = kind === 'terminal'

  return (
    <div style={{ width, height, position: 'relative' }}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <svg width={width} height={height} style={{ overflow: 'visible', display: 'block' }}>
        <rect
          x={1}
          y={1}
          width={width - 2}
          height={height - 2}
          rx={terminal ? (height - 2) / 2 : 5}
          fill={kind === 'origin' ? 'var(--wash)' : 'var(--box)'}
          stroke={terminal ? 'var(--ink-soft)' : 'var(--accent)'}
          strokeWidth={2}
          filter="url(#rough)"
        />
        {sublabel ? (
          <>
            <text {...labelAttrs(width, height / 2 - 1)}>{label}</text>
            <text {...subLabelAttrs(width, height / 2 + 13)}>{sublabel}</text>
          </>
        ) : (
          <text {...labelAttrs(width, height / 2 + 4)}>{label}</text>
        )}
      </svg>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  )
}

function labelAttrs(width: number, y: number) {
  return {
    x: width / 2,
    y,
    textAnchor: 'middle' as const,
    fill: 'var(--ink)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    fontWeight: 600,
  }
}

function subLabelAttrs(width: number, y: number) {
  return {
    x: width / 2,
    y,
    textAnchor: 'middle' as const,
    fill: 'var(--ink-soft)',
    fontFamily: 'var(--font-mono)',
    fontSize: 9.5,
  }
}

const handleStyle = {
  width: 6,
  height: 6,
  background: 'var(--accent)',
  border: 'none',
}

import { Handle, Position, type NodeProps } from '@xyflow/react'

import { type DiagramNodeKind } from './site-pipeline-graph'

export interface NotebookNodeData {
  label: string
  sublabel?: string
  kind: DiagramNodeKind
  [key: string]: unknown
}

/*
  Custom React Flow node styled from the notebook tokens. React Flow renders
  nodes as HTML <div>s, so we recolor with the same CSS vars the SVG figures use
  (var(--box)/var(--accent)/var(--ink)) instead of React Flow's own palette.
*/
export function NotebookNode({ data }: NodeProps & { data: NotebookNodeData }) {
  const { label, sublabel, kind } = data

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '6px 10px',
        borderRadius: kind === 'terminal' ? 999 : 5,
        border: `2px solid ${kind === 'terminal' ? 'var(--ink-soft)' : 'var(--accent)'}`,
        background: kind === 'origin' ? 'var(--wash)' : 'var(--box)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <span
        style={{ color: 'var(--ink)', fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}
      >
        {label}
      </span>
      {sublabel ? (
        <span style={{ color: 'var(--ink-soft)', fontSize: 9.5, marginTop: 2 }}>
          {sublabel}
        </span>
      ) : null}
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  )
}

const handleStyle = {
  width: 6,
  height: 6,
  background: 'var(--accent)',
  border: 'none',
}

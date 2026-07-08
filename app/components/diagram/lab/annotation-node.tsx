import { Handle, Position, type NodeProps } from '@xyflow/react'

export interface AnnotationNodeData {
  lines: string[]
  [key: string]: unknown
}

/*
  React Flow has no free-floating text: an annotation has to become a first-class
  node. This renders the red margin note as a text-only node (no box) with a
  hidden handle so a connector edge can point it at its anchor — the extension
  React Flow requires to match approach A's free notes.
*/
export function AnnotationNode({ data }: NodeProps & { data: AnnotationNodeData }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 1.4,
        color: 'var(--mark)',
        whiteSpace: 'nowrap',
      }}
    >
      {data.lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
      <Handle
        type="source"
        position={Position.Left}
        style={{ opacity: 0, width: 1, height: 1, border: 'none' }}
      />
    </div>
  )
}

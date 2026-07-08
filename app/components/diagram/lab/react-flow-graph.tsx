import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeTypes,
} from '@xyflow/react'
import { useMemo } from 'react'

import { getConciseTheme, useAppTheme } from '~/components/theme'

import { AnnotationNode, type AnnotationNodeData } from './annotation-node'
import { layoutGraph } from './dagre-layout'
import { RoughEdge, type RoughEdgeData } from './rough-edge'
import { RoughNode, type RoughNodeData } from './rough-node'
import {
  ARIA_LABEL,
  type DiagramGraph,
  nodeSize,
} from './site-pipeline-graph'

import '@xyflow/react/dist/style.css'

interface ReactFlowGraphProps {
  graph: DiagramGraph
}

const ANNOTATION_GAP = 30
const NOTE_CHAR_WIDTH = 7.2
const NOTE_LINE_HEIGHT = 17

const nodeTypes: NodeTypes = { rough: RoughNode, annotation: AnnotationNode }
const edgeTypes: EdgeTypes = { rough: RoughEdge }

// Override React Flow's own pane/background tokens so its canvas follows the
// notebook surface instead of its default near-black dark palette.
const reactFlowStyle = {
  background: 'var(--surface)',
  '--xy-background-color-default': 'var(--surface)',
} as React.CSSProperties

/*
  Approach B: the same shared graph rendered by React Flow through its own
  extension points — custom `rough` node + edge types that wear the #rough filter
  and token colors, dagre-laid-out (deterministic), interactive (pan/zoom). Shows
  whether React Flow can match A's look while adding its capabilities. Client-only.
*/
export default function ReactFlowGraph({ graph }: ReactFlowGraphProps) {
  const theme = useAppTheme()
  const colorMode = getConciseTheme(theme)

  const { nodes, edges } = useMemo(() => toReactFlow(graph), [graph])

  return (
    <div
      style={{ width: '100%', height: 360 }}
      role="img"
      aria-label={ARIA_LABEL}
    >
      <ReactFlow
        colorMode={colorMode}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        style={reactFlowStyle}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} color="var(--rule)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}

function toReactFlow(graph: DiagramGraph): { nodes: Node[]; edges: Edge[] } {
  const layout = layoutGraph(graph)

  const nodes: Node[] = layout.nodes.map((node) => {
    const size = nodeSize(node.kind)
    return {
      id: node.id,
      type: 'rough',
      position: { x: node.x - size.width / 2, y: node.y - size.height / 2 },
      width: size.width,
      height: size.height,
      data: {
        label: node.label,
        sublabel: node.sublabel,
        kind: node.kind,
        width: size.width,
        height: size.height,
      } satisfies RoughNodeData,
    }
  })

  const edges: Edge[] = graph.edges.map((edge, index) => ({
    id: `${edge.from}-${edge.to}-${index}`,
    source: edge.from,
    target: edge.to,
    type: 'rough',
    data: { label: edge.label, dashed: edge.dashed } satisfies RoughEdgeData,
  }))

  const nodeById = new Map(layout.nodes.map((node) => [node.id, node]))

  graph.annotations.forEach((annotation, index) => {
    const anchor = nodeById.get(annotation.anchor)
    if (!anchor) return

    const anchorSize = nodeSize(anchor.kind)
    const widest = annotation.lines.reduce((max, l) => Math.max(max, l.length), 0)
    const noteId = `note-${annotation.anchor}-${index}`
    const noteHeight = annotation.lines.length * NOTE_LINE_HEIGHT
    const below = annotation.side === 'below'

    nodes.push({
      id: noteId,
      type: 'annotation',
      position: {
        x: anchor.x - anchorSize.width / 2,
        y: below
          ? anchor.y + anchorSize.height / 2 + ANNOTATION_GAP
          : anchor.y - anchorSize.height / 2 - ANNOTATION_GAP - noteHeight,
      },
      width: Math.round(widest * NOTE_CHAR_WIDTH),
      height: noteHeight,
      data: { lines: annotation.lines } satisfies AnnotationNodeData,
      selectable: false,
      draggable: false,
    })

    edges.push({
      id: `edge-${noteId}`,
      source: noteId,
      target: annotation.anchor,
      type: 'rough',
      data: { dashed: true, red: true } satisfies RoughEdgeData,
    })
  })

  return { nodes, edges }
}

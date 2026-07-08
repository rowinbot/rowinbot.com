import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
} from '@xyflow/react'
import { useMemo } from 'react'

import { getConciseTheme, useAppTheme } from '~/components/theme'

import { layoutGraph } from './dagre-layout'
import { NotebookNode, type NotebookNodeData } from './notebook-node'
import {
  ARIA_LABEL,
  type DiagramGraph,
  nodeSize,
} from './site-pipeline-graph'

import '@xyflow/react/dist/style.css'

interface ReactFlowGraphProps {
  graph: DiagramGraph
}

const nodeTypes: NodeTypes = { notebook: NotebookNode }

// Override React Flow's own pane/background tokens so its canvas follows the
// notebook surface instead of its default near-black dark palette.
const reactFlowStyle = {
  background: 'var(--surface)',
  '--xy-background-color-default': 'var(--surface)',
} as React.CSSProperties

/*
  Approach B: the same shared graph rendered by React Flow. Laid out with dagre
  (React Flow's documented layouting pattern), themed to the notebook tokens,
  and left interactive (pan/zoom/controls) so the tradeoff is visible. Rendered
  only on the client via lazy import — see react-flow-figure.tsx.
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
      type: 'notebook',
      position: { x: node.x - size.width / 2, y: node.y - size.height / 2 },
      width: size.width,
      height: size.height,
      data: {
        label: node.label,
        sublabel: node.sublabel,
        kind: node.kind,
      } satisfies NotebookNodeData,
    }
  })

  const edges: Edge[] = graph.edges.map((edge, index) => ({
    id: `${edge.from}-${edge.to}-${index}`,
    source: edge.from,
    target: edge.to,
    label: edge.label,
    style: {
      stroke: 'var(--accent)',
      strokeWidth: 2,
      strokeDasharray: edge.dashed ? '6 6' : undefined,
    },
    labelStyle: { fill: 'var(--link)', fontFamily: 'var(--font-mono)', fontSize: 10 },
    labelBgStyle: { fill: 'var(--surface)' },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent)' },
  }))

  return { nodes, edges }
}

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

const nodeTypes: NodeTypes = { rough: RoughNode }
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

  return { nodes, edges }
}

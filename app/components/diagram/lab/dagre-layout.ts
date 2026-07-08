import dagre from '@dagrejs/dagre'

import {
  type DiagramGraph,
  type DiagramGraphEdge,
  type DiagramNodeKind,
  nodeSize,
} from './site-pipeline-graph'

export interface LaidOutNode {
  id: string
  kind: DiagramNodeKind
  label: string
  sublabel?: string
  x: number
  y: number
  width: number
  height: number
}

export interface LaidOutEdge {
  id: string
  points: Array<{ x: number; y: number }>
  label?: string
  dashed?: boolean
}

export interface LaidOutGraph {
  width: number
  height: number
  nodes: LaidOutNode[]
  edges: LaidOutEdge[]
}

interface LayoutOptions {
  rankdir?: 'TB' | 'LR'
  nodesep?: number
  ranksep?: number
  padding?: number
}

/*
  Runs dagre synchronously (pure JS, no window) so it is safe inside
  renderToString under RR7 SSR. Returns node centers and edge polylines that
  the notebook SVG components render — dagre owns "where", our CSS owns "how".
*/
export function layoutGraph(
  graph: DiagramGraph,
  { rankdir = 'LR', nodesep = 44, ranksep = 70, padding = 20 }: LayoutOptions = {},
): LaidOutGraph {
  const g = new dagre.graphlib.Graph({ multigraph: true })
  g.setGraph({ rankdir, nodesep, ranksep, marginx: padding, marginy: padding })
  g.setDefaultEdgeLabel(() => ({}))

  graph.nodes.forEach((node) => {
    g.setNode(node.id, nodeSize(node.kind))
  })

  graph.edges.forEach((edge, index) => {
    g.setEdge(edge.from, edge.to, {}, edgeId(edge, index))
  })

  dagre.layout(g)

  const nodes: LaidOutNode[] = graph.nodes.map((node) => {
    const positioned = g.node(node.id)
    return {
      id: node.id,
      kind: node.kind,
      label: node.label,
      sublabel: node.sublabel,
      x: positioned.x,
      y: positioned.y,
      width: positioned.width,
      height: positioned.height,
    }
  })

  const edges: LaidOutEdge[] = graph.edges.map((edge, index) => {
    const id = edgeId(edge, index)
    const positioned = g.edge(edge.from, edge.to, id)
    return {
      id,
      points: positioned.points.map((point: { x: number; y: number }) => ({
        x: point.x,
        y: point.y,
      })),
      label: edge.label,
      dashed: edge.dashed,
    }
  })

  const graphLabel = g.graph()

  return {
    width: graphLabel.width ?? 0,
    height: graphLabel.height ?? 0,
    nodes,
    edges,
  }
}

function edgeId(edge: DiagramGraphEdge, index: number): string {
  return `${edge.from}-${edge.to}-${index}`
}

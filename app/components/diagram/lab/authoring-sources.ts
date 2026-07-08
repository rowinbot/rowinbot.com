import { layoutGraph } from './dagre-layout'
import { nodeSize, sitePipelineGraph } from './site-pipeline-graph'

/*
  The exact text a human authors for each approach, shown next to each render so
  the comparison is about authoring ergonomics, not just output. The dagre and
  React Flow sources are serialized from the real shared graph so what's shown
  can't drift from what's rendered; the Mermaid source IS what the renderer parses.
*/

// Approach C — a human types this plain-text flowchart. This same string is fed
// to mermaid.render(), so it is both the source-of-truth and the display source.
export const mermaidSource = `flowchart LR
  mdx[MDX source] --> builder[content builder]
  builder --> json[JSON]
  json --> server[Express + RR7]
  server --> browser([browser])
  builder -.->|side output| blur[image blur]
  builder -.->|side output| og[Satori OG]`

// Approach A — a human writes these two arrays; dagre assigns every coordinate.
export const dagreSource = buildDagreSource()

// Approach B — the deterministic JSON a React Flow editor persists (or a human
// writes): nodes carry positions, edges carry source/target. Rendered read-only.
export const reactFlowSource = buildReactFlowSource()

function buildDagreSource(): string {
  const nodes = sitePipelineGraph.nodes
    .map((node) => {
      const sub = node.sublabel ? `, sublabel: '${node.sublabel}'` : ''
      return `  { id: '${node.id}', kind: '${node.kind}', label: '${node.label}'${sub} },`
    })
    .join('\n')

  const edges = sitePipelineGraph.edges
    .map((edge) => {
      const label = edge.label ? `, label: '${edge.label}'` : ''
      const dashed = edge.dashed ? ', dashed: true' : ''
      return `  { from: '${edge.from}', to: '${edge.to}'${label}${dashed} },`
    })
    .join('\n')

  return `const nodes = [\n${nodes}\n]\n\nconst edges = [\n${edges}\n]`
}

function buildReactFlowSource(): string {
  const layout = layoutGraph(sitePipelineGraph)

  const nodes = layout.nodes
    .map((node) => {
      const size = nodeSize(node.kind)
      const x = Math.round(node.x - size.width / 2)
      const y = Math.round(node.y - size.height / 2)
      return `  { id: '${node.id}', type: 'rough', position: { x: ${x}, y: ${y} }, data: { label: '${node.label}', kind: '${node.kind}' } },`
    })
    .join('\n')

  const edges = sitePipelineGraph.edges
    .map((edge, index) => {
      const label = edge.label ? `, label: '${edge.label}'` : ''
      return `  { id: 'e${index}', source: '${edge.from}', target: '${edge.to}', type: 'rough'${label} },`
    })
    .join('\n')

  return `const nodes = [\n${nodes}\n]\n\nconst edges = [\n${edges}\n]`
}

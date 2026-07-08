/*
  Shared, coordinate-free model of this site's content pipeline. Both lab
  renderers (dagre + notebook SVG, and React Flow) consume this identical
  graph so the comparison is apples-to-apples: only the layout + render
  strategy differs, never the data.
*/

export type DiagramNodeKind = 'box' | 'origin' | 'terminal' | 'decision'

export interface DiagramGraphNode {
  id: string
  label: string
  sublabel?: string
  kind: DiagramNodeKind
}

export interface DiagramGraphEdge {
  from: string
  to: string
  label?: string
  dashed?: boolean
}

export interface DiagramGraphAnnotation {
  anchor: string
  side: 'left' | 'right' | 'above' | 'below'
  lines: string[]
}

export interface DiagramGraph {
  nodes: DiagramGraphNode[]
  edges: DiagramGraphEdge[]
  annotations: DiagramGraphAnnotation[]
}

export const sitePipelineGraph: DiagramGraph = {
  nodes: [
    { id: 'mdx', kind: 'box', label: 'MDX source', sublabel: 'journal + pages' },
    {
      id: 'builder',
      kind: 'origin',
      label: 'content builder',
      sublabel: 'mdx-bundler',
    },
    { id: 'blur', kind: 'box', label: 'image blur', sublabel: 'data-URLs' },
    { id: 'og', kind: 'box', label: 'Satori OG', sublabel: 'per entry' },
    { id: 'json', kind: 'box', label: 'JSON', sublabel: 'content/build/' },
    {
      id: 'server',
      kind: 'origin',
      label: 'Express + RR7',
      sublabel: 'SSR · Fly.io',
    },
    { id: 'browser', kind: 'terminal', label: 'browser', sublabel: 'page view' },
  ],
  edges: [
    { from: 'mdx', to: 'builder' },
    { from: 'builder', to: 'json' },
    { from: 'json', to: 'server' },
    { from: 'server', to: 'browser' },
    { from: 'builder', to: 'blur', label: 'side output', dashed: true },
    { from: 'builder', to: 'og', label: 'side output', dashed: true },
  ],
  annotations: [
    {
      anchor: 'server',
      side: 'right',
      lines: [
        'build-time,',
        'not per-request —',
        'a page view is a',
        'file read, not',
        'a compile.',
      ],
    },
    {
      anchor: 'og',
      side: 'left',
      lines: ['blur + OG made', 'once, here', 'at build.'],
    },
  ],
}

/*
  One sizing rule for both renderers, keyed by node kind, so dagre and React
  Flow lay the same graph out against identical box geometry.
*/
export function nodeSize(kind: DiagramNodeKind): { width: number; height: number } {
  switch (kind) {
    case 'terminal':
      return { width: 132, height: 54 }
    case 'decision':
      return { width: 120, height: 92 }
    case 'origin':
      return { width: 168, height: 68 }
    case 'box':
    default:
      return { width: 152, height: 64 }
  }
}

export const ARIA_LABEL =
  "Architecture diagram of this site's content pipeline: MDX source for the journal and pages is bundled by a content builder using mdx-bundler, which also emits image blur data-URLs and Satori OG images as build-time side outputs; the builder writes prebuilt JSON into content/build; and an Express plus React Router v7 server on Fly.io reads that JSON at request time to render the page for the browser."

export const TITLE = 'This site’s content pipeline — MDX to SSR'

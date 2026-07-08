import { type DiagramGraph } from '../diagram-graph'

export const SITE_PIPELINE_TITLE =
  'How this site is built — the build-time MDX content pipeline'

export const SITE_PIPELINE_ARIA_LABEL =
  "Hand-drawn architecture diagram of this site's content pipeline: MDX source for the journal and pages is bundled by a content builder using mdx-bundler, which also emits image blur data-URLs and Satori OG images as build-time side outputs; the builder writes prebuilt JSON into content/build; and an Express plus React Router v7 server on Fly.io reads that JSON at request time to render the page for the browser."

export const sitePipelineGraph: DiagramGraph = {
  nodes: [
    { id: 'mdx', kind: 'box', label: 'MDX SOURCE', sublabels: ['journal + pages', 'content/*.mdx'] },
    {
      id: 'builder',
      kind: 'origin',
      label: 'CONTENT BUILDER',
      sublabels: ['mdx-bundler', 'runs on content:watch', 'build step — not runtime'],
    },
    { id: 'blur', kind: 'box', label: 'image blur', sublabels: ['data-URLs'] },
    { id: 'og', kind: 'box', label: 'Satori OG images', sublabels: ['per entry'] },
    { id: 'json', kind: 'box', label: 'JSON', sublabels: ['content/build/', 'entries + index'] },
    {
      id: 'server',
      kind: 'origin',
      label: 'EXPRESS + REACT ROUTER v7',
      sublabels: ['SSR · reads JSON at request time', 'Fly.io (mad)'],
    },
    { id: 'browser', kind: 'terminal', label: 'BROWSER', sublabels: ['page view'] },
  ],
  edges: [
    { from: 'mdx', to: 'builder' },
    { from: 'builder', to: 'json' },
    { from: 'json', to: 'server', label: 'read, not built' },
    { from: 'server', to: 'browser' },
    { from: 'builder', to: 'blur', dashed: true, label: 'side outputs' },
    { from: 'builder', to: 'og', dashed: true },
  ],
  annotations: [
    {
      anchor: 'server',
      side: 'left',
      lines: ['build-time, not per-request —', 'a page view is a file read,', 'not a compile.'],
    },
    {
      anchor: 'og',
      side: 'left',
      lines: ['blur + OG made once,', 'here at build.'],
    },
  ],
}

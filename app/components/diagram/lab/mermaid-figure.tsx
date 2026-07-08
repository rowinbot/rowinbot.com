import { Suspense, lazy } from 'react'

import { ClientOnly } from './client-only'

const MermaidGraph = lazy(() => import('./mermaid-graph'))

/*
  Approach C entry point. Mermaid loads only on the client (lazy + ClientOnly),
  so its large runtime never enters the server bundle. In production this same
  graph could instead be rendered to SVG at content-build time (the content
  builder already processes MDX), shipping ~0 client JS — see the lab write-up.
*/
export function MermaidFigure() {
  return (
    <ClientOnly fallback={<Placeholder />}>
      {() => (
        <Suspense fallback={<Placeholder />}>
          <MermaidGraph />
        </Suspense>
      )}
    </ClientOnly>
  )
}

function Placeholder() {
  return (
    <div className="grid h-24 place-items-center font-mono text-meta text-ink-soft">
      rendering Mermaid…
    </div>
  )
}

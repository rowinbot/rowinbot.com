import { Suspense, lazy } from 'react'

import { ClientOnly } from './client-only'
import { type DiagramGraph } from './site-pipeline-graph'

const ReactFlowGraph = lazy(() => import('./react-flow-graph'))

interface ReactFlowFigureProps {
  graph: DiagramGraph
}

/*
  Approach B entry point. React Flow and its stylesheet load only on the client
  (lazy + ClientOnly), so the module never runs during SSR and cannot crash the
  server render or mismatch hydration. The server paints the placeholder.
*/
export function ReactFlowFigure({ graph }: ReactFlowFigureProps) {
  return (
    <ClientOnly fallback={<Placeholder />}>
      {() => (
        <Suspense fallback={<Placeholder />}>
          <ReactFlowGraph graph={graph} />
        </Suspense>
      )}
    </ClientOnly>
  )
}

function Placeholder() {
  return (
    <div
      className="grid place-items-center rounded-sm border border-dashed border-rule bg-surface/60 font-mono text-meta text-ink-soft"
      style={{ height: 360 }}
    >
      loading interactive graph…
    </div>
  )
}

import { DiagramFrame, SitePipelineFigure } from '~/components/diagram'
import { DagreFigure } from '~/components/diagram/lab/dagre-figure'
import { ReactFlowFigure } from '~/components/diagram/lab/react-flow-figure'
import { sitePipelineGraph } from '~/components/diagram/lab/site-pipeline-graph'
import { SectionHeader } from '~/components/ui'
import { websiteUrl } from '~/utils/misc'
import { getSocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/diagrams-lab.route'

export function meta(_: Route.MetaArgs) {
  return getSocialMetaTags({
    title: 'Diagram lab — dagre vs React Flow',
    description:
      'A private comparison of two auto-layout approaches for the notebook diagrams, rendering the same content-pipeline graph.',
    url: `${websiteUrl}/labs/diagrams`,
  })
}

export default function DiagramsLabRoute() {
  return (
    <main
      id="main"
      className="mx-auto max-w-4xl px-4 pb-24 sm:px-8"
    >
      <section className="pt-[clamp(2.125rem,5vw,4rem)]">
        <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
          Lab · not linked
        </p>
        <h1 className="m-0 mb-[18px] font-display text-d2 font-black tracking-[-0.02em] text-ink">
          Auto-layout diagram comparison
        </h1>
        <p className="m-0 max-w-[64ch] font-mono text-[0.84375rem] leading-[1.72] text-ink">
          Both figures below render the{' '}
          <span className="italic text-mark">identical</span> content-pipeline
          graph — the same coordinate-free{' '}
          <code className="text-ink">nodes[]</code> and{' '}
          <code className="text-ink">edges[]</code> — laid out by dagre. Only the
          renderer differs, so this is an apples-to-apples look at the two
          approaches before choosing one.
        </p>
      </section>

      <section aria-labelledby="approach-a" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader
          title="Approach A — dagre + notebook SVG"
          id="approach-a"
        />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          dagre computes node positions and edge polylines synchronously at
          render time, and small <code>DiagramNode</code>/<code>DiagramEdge</code>{' '}
          components draw them into the existing SVG system — the shared{' '}
          <code>#rough</code> filter, the token colours, and the scroll-driven
          draw-on. It renders on the server (no <code>window</code>), themes for
          free from CSS variables, and adds no client-side diagram runtime, but
          it is a static figure with no interactivity.
        </p>
        <DiagramFrame caption="approach a — dagre + svg" note="SSR · static">
          <DagreFigure graph={sitePipelineGraph} />
        </DiagramFrame>
      </section>

      <section aria-labelledby="approach-b" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader title="Approach B — React Flow" id="approach-b" />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          The same graph in React Flow, laid out with dagre and themed to the
          notebook tokens via a custom node. React Flow renders nodes as HTML and
          needs the DOM, so it is client-only (lazy + mount guard) with an SSR
          placeholder. You gain pan, zoom, and controls out of the box, at the
          cost of a client-only render, a larger bundle, and a canvas paradigm
          rather than a print-like article figure.
        </p>
        <DiagramFrame caption="approach b — react flow" note="client · interactive">
          <ReactFlowFigure graph={sitePipelineGraph} />
        </DiagramFrame>
      </section>

      <section
        aria-labelledby="approach-ref"
        className="pt-[clamp(3rem,7vw,5rem)]"
      >
        <SectionHeader
          title="For reference — current hand-placed figure"
          id="approach-ref"
        />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          The figure shipping on the homepage today, with every coordinate placed
          by hand. This is the look both approaches aim to preserve while
          removing the hand-tuning.
        </p>
        <DiagramFrame caption="current — hand-placed" note="rowinbot.com">
          <SitePipelineFigure />
        </DiagramFrame>
      </section>
    </main>
  )
}

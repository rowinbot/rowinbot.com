import { DiagramFrame, SitePipelineFigure } from '~/components/diagram'
import {
  dagreSource,
  mermaidSource,
  reactFlowSource,
} from '~/components/diagram/lab/authoring-sources'
import { DagreFigure } from '~/components/diagram/lab/dagre-figure'
import { MermaidFigure } from '~/components/diagram/lab/mermaid-figure'
import { ReactFlowFigure } from '~/components/diagram/lab/react-flow-figure'
import { sitePipelineGraph } from '~/components/diagram/lab/site-pipeline-graph'
import { SourcePanel } from '~/components/diagram/lab/source-panel'
import { SectionHeader } from '~/components/ui'
import { websiteUrl } from '~/utils/misc'
import { getSocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/diagrams-lab.route'

export function meta(_: Route.MetaArgs) {
  return getSocialMetaTags({
    title: 'Diagram lab — dagre vs React Flow vs Mermaid',
    description:
      'A private comparison of three ways to author the same content-pipeline diagram, judged on authoring ergonomics.',
    url: `${websiteUrl}/labs/diagrams`,
  })
}

export default function DiagramsLabRoute() {
  return (
    <main id="main" className="mx-auto max-w-4xl px-4 pb-24 sm:px-8">
      <section className="pt-[clamp(2.125rem,5vw,4rem)]">
        <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
          Lab · not linked
        </p>
        <h1 className="m-0 mb-[18px] font-display text-d2 font-black tracking-[-0.02em] text-ink">
          Diagram authoring comparison
        </h1>
        <p className="m-0 max-w-[64ch] font-mono text-[0.84375rem] leading-[1.72] text-ink">
          Three ways to author the{' '}
          <span className="italic text-mark">same</span> content-pipeline diagram.
          The question isn&apos;t only how each one looks — it&apos;s which is
          pleasant and deterministic to author{' '}
          <span className="italic text-mark">by hand</span>. Each render shows the
          exact source you&apos;d write next to it.
        </p>
      </section>

      <section aria-labelledby="approach-a" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader title="Approach A — dagre + notebook SVG" id="approach-a" />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          You author two arrays — nodes and edges, no coordinates — and dagre
          assigns every position synchronously at render time. Small SVG
          components draw them into the existing notebook system: the shared{' '}
          <code>#rough</code> filter, token colours, scroll-driven draw-on. Renders
          on the server, themes for free, ~0 added client JS. Static figure.
        </p>
        <DiagramFrame caption="approach a — dagre + svg" note="SSR · static">
          <DagreFigure graph={sitePipelineGraph} />
        </DiagramFrame>
        <SourcePanel
          caption="what you'd write — nodes/edges data"
          source={dagreSource}
        />
      </section>

      <section aria-labelledby="approach-b" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader title="Approach B — React Flow (custom types)" id="approach-b" />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          The same graph in React Flow, using{' '}
          <span className="italic">custom node and edge types</span> that wear the{' '}
          <code>#rough</code> filter and token colours through React Flow&apos;s
          own extension points — dagre-laid-out, interactive (pan/zoom). It shows
          React Flow can match the hand-drawn look, but it&apos;s client-only and
          heavier. Its real authoring angle is a drag editor that persists the JSON
          below — see the write-up.
        </p>
        <DiagramFrame caption="approach b — react flow" note="client · interactive">
          <ReactFlowFigure graph={sitePipelineGraph} />
        </DiagramFrame>
        <SourcePanel
          caption="what you'd write (or an editor persists) — positioned JSON"
          source={reactFlowSource}
        />
      </section>

      <section aria-labelledby="approach-c" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader title="Approach C — Mermaid (text DSL)" id="approach-c" />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          You type a plain-text flowchart and Mermaid lays it out and renders it
          with its <code>handDrawn</code> look, themed toward our tokens. This is
          the most direct answer to &ldquo;I want to author it myself&rdquo;. It
          bakes colours at parse, so it re-renders on theme toggle; it needs the
          DOM (client-only here, but could render to SVG at content-build time for
          ~0 client JS).
        </p>
        <DiagramFrame caption="approach c — mermaid" note="text · hand-drawn">
          <MermaidFigure />
        </DiagramFrame>
        <SourcePanel
          caption="what you'd write — Mermaid flowchart"
          source={mermaidSource}
        />
      </section>

      <section aria-labelledby="approach-ref" className="pt-[clamp(3rem,7vw,5rem)]">
        <SectionHeader
          title="For reference — current hand-placed figure"
          id="approach-ref"
        />
        <p className="m-0 mb-5 max-w-[64ch] font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
          The figure shipping on the homepage today, with every coordinate placed
          by hand. This is the look the three approaches aim to preserve while
          removing the hand-tuning.
        </p>
        <DiagramFrame caption="current — hand-placed" note="rowinbot.com">
          <SitePipelineFigure />
        </DiagramFrame>
      </section>
    </main>
  )
}

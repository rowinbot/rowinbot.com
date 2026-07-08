import { InkLink, SectionHeader } from '~/components/ui'

const KALEBTEC_HREF = 'https://kalebtec.com?ref=rowinbot'

export function KalebtecBridge() {
  return (
    <section className="bridge" aria-labelledby="bridge-heading">
      <div className="pt-[clamp(3.5rem,8vw,6.5rem)]">
        <SectionHeader title="Shipping it for real" id="bridge-heading" />
      </div>

      <div className="grid items-center gap-[clamp(1.25rem,4vw,3.75rem)] md:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal relative rounded border-2 border-mark bg-surface px-6 py-[22px] shadow-[3px_4px_0_color-mix(in_srgb,var(--mark)_14%,transparent)]">
          <span className="absolute left-[18px] top-[-13px] rounded-sm border-[1.5px] border-mark bg-paper px-2 py-0.5 font-mono text-[0.65625rem] uppercase tracking-[0.16em] text-mark">
            margin note
          </span>
          <p className="m-0 mt-1.5 font-display text-[clamp(1.0625rem,2vw,1.3125rem)] font-bold leading-snug text-ink">
            Have a product to build or scale? I take client work through my
            studio, <span className="text-mark">Kalebtec</span> — my engineering,
            plus a studio&rsquo;s operations and continuity.
          </p>
          <InkLink
            href={KALEBTEC_HREF}
            variant="underline"
            className="mt-3.5 inline-block text-sm"
          >
            → kalebtec.com
          </InkLink>
        </div>

        <div className="reveal">
          <svg
            viewBox="0 0 260 150"
            width="100%"
            aria-hidden="true"
            className="bridge-arrow h-auto max-w-[280px]"
          >
            <g filter="url(#rough)">
              <path
                className="hand-arrow"
                pathLength={1}
                d="M6,40 C70,28 120,60 150,84 C168,98 182,104 210,108"
                markerEnd="url(#ah)"
              />
            </g>
            <text className="red-note" x="120" y="132" textAnchor="middle">
              your problem → shipped
            </text>
          </svg>
          <p className="font-mono text-meta leading-[1.8] text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink">
            Those diagrams are how <strong>this</strong> site works — yours would
            look nothing like them. What carries over is the approach: senior
            engineering from day one, with a studio behind it.
          </p>
        </div>
      </div>
    </section>
  )
}

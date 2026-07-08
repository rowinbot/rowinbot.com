import { InkLink, TapedPhoto } from '~/components/ui'

import { PawPrint } from './paw-print'

export function Hero() {
  return (
    <section className="pt-[clamp(2.125rem,5vw,4rem)]">
      <div className="grid items-center gap-[clamp(1.75rem,5vw,4.5rem)] md:grid-cols-[320px_1fr]">
        <TapedPhoto
          src="/images/rowin-2024.jpg"
          alt="Rowin Hernandez, photographed in 2024"
          caption="that's me — Vigo, 2024"
          captionHover="yes, that's Vigo behind me"
          width={300}
          height={400}
        />

        <div className="order-first md:order-none">
          <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
            Product engineer · tech lead
          </p>
          <h1 className="m-0 mb-[18px] font-display text-d1 font-black tracking-[-0.02em] text-ink">
            Rowin Hernandez
          </h1>
          <p className="m-0 mb-[18px] max-w-[32ch] font-display text-[clamp(1.0625rem,2.1vw,1.375rem)] font-bold leading-snug text-ink">
            Senior product engineer and tech lead with a strong bias toward
            shipping complex product surfaces{' '}
            <span className="ink-highlight">end-to-end</span>.{' '}
            <span className="text-mark">Co-founder of Kalebtec.</span>
          </p>
          <p className="m-0 mb-4 max-w-[52ch] border-l-2 border-accent pl-4 font-mono text-[0.84375rem] leading-[1.74] text-ink">
            Venezuela&nbsp;→&nbsp;Vigo, Galicia. Building for the web since 2010,
            coding professionally since 2015, working remotely since 2016.{' '}
            <span className="ink-highlight">TypeScript &amp; Node</span> across
            React and Vue.
          </p>
          <p className="warmth-note relative m-0 mb-[22px] pl-4 font-mono text-[0.78125rem] italic leading-relaxed text-mark">
            cyclist*, proud dad, and staff to Mila the cat.
            <PawPrint />
          </p>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-3">
            <InkLink
              href="/journal"
              variant="boxed"
              className="border-ink bg-ink !text-paper hover:!bg-mark hover:!text-paper hover:border-mark"
            >
              Read the journal →
            </InkLink>
            <InkLink href="/my-experience" variant="boxed">
              See the work
            </InkLink>
          </div>
        </div>
      </div>
    </section>
  )
}

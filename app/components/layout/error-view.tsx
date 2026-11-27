import { InkLink } from '~/components/ui'
import { Routes } from '~/routes'

interface ErrorViewProps {
  status: number
  heading: string
  message: string
}

export function ErrorView({ status, heading, message }: ErrorViewProps) {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <section
        aria-labelledby="error-title"
        className="pt-[clamp(2.125rem,5vw,4rem)]"
      >
        <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
          Error {status}
        </p>
        <h1
          id="error-title"
          className="m-0 font-display text-d1 font-black tracking-[-0.02em] text-ink"
        >
          {heading}
        </h1>
        <p className="mt-5 max-w-[30.1em] font-display text-[clamp(1.0625rem,2vw,1.375rem)] font-bold leading-snug text-ink">
          {message}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-3.5 gap-y-3">
          <InkLink
            href={Routes.home}
            variant="boxed"
            className="border-ink bg-ink !text-paper hover:!bg-mark hover:!text-paper hover:border-mark"
          >
            Back to the homepage
          </InkLink>
          <InkLink href={Routes.journal} variant="boxed">
            Read the journal
          </InkLink>
        </div>
      </section>
    </main>
  )
}

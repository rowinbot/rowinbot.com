import { DeskDrafts, JournalCard, journalDrafts } from '~/components/journal'
import { SectionHeader } from '~/components/ui'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { getAbsolutePathname } from '~/utils/misc'
import { getSocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/journal.route'

export async function loader() {
  const entries = await getAllJournalEntries()

  return { entries }
}

export const meta: Route.MetaFunction = ({ location }) => {
  return getSocialMetaTags({
    title: 'Journal | Rowin Hernandez',
    description:
      'Notes that outgrew the margin and became entries — writing on AWS, React, agents and shipping product.',
    url: getAbsolutePathname(location.pathname),
  })
}

function yearRange(entries: JournalIndexEntry[]): string {
  const years = entries
    .map((entry) => Number(entry.date.split('/')[2]))
    .filter((year) => !Number.isNaN(year))

  if (years.length === 0) return ''

  const min = Math.min(...years)
  const max = Math.max(...years)

  return min === max ? `${min}` : `${min} – ${max}`
}

export default function JournalRoute({ loaderData }: Route.ComponentProps) {
  const { entries } = loaderData
  const [lead, ...rest] = entries

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <section
        aria-labelledby="journal-title"
        className="pt-[clamp(2.125rem,5vw,4rem)]"
      >
        <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
          The journal
        </p>
        <h1 className="m-0 font-display text-d1 font-black tracking-[-0.02em] text-ink">
          Journal
        </h1>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <p className="m-0 max-w-[34ch] font-display text-[clamp(1.0625rem,2vw,1.375rem)] font-bold leading-snug text-ink">
            Notes that outgrew the margin and became entries.
          </p>
          <p className="m-0 text-right font-mono text-label leading-relaxed text-ink-soft">
            the archive
            <br />
            <span className="font-semibold text-ink">
              {entries.length} published
            </span>{' '}
            · {yearRange(entries)}
          </p>
        </div>
      </section>

      <section aria-labelledby="entries-heading" className="mt-[clamp(2rem,5vw,3.5rem)]">
        <SectionHeader title="All entries" id="entries-heading" />

        {lead && (
          <div className="grid gap-4">
            <JournalCard entry={lead} wide />
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((entry) => (
              <JournalCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </section>

      <DeskDrafts drafts={journalDrafts} />
    </main>
  )
}

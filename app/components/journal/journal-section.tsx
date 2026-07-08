import { SectionHeader } from '~/components/ui'

import { type Draft, DeskDrafts } from './desk-drafts'
import { JournalCard } from './journal-card'

interface JournalSectionProps {
  entries: JournalIndexEntry[]
  drafts: Draft[]
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

export function JournalSection({ entries, drafts }: JournalSectionProps) {
  const [lead, ...rest] = entries
  const row = rest.slice(0, 3)

  return (
    <section aria-labelledby="journal-heading">
      <div className="pt-[clamp(3.5rem,8vw,6.5rem)]">
        <SectionHeader
          title="Journal"
          id="journal-heading"
          seeAllHref="/journal"
          seeAllLabel="all entries →"
        />
      </div>

      <div className="mb-5 mt-4 flex flex-wrap items-end justify-between gap-4">
        <p className="m-0 max-w-[32ch] font-display text-[clamp(1.1875rem,2.2vw,1.5rem)] font-extrabold leading-tight text-ink">
          Notes that outgrew the margin and became entries.
        </p>
        <p className="m-0 text-right font-mono text-label leading-relaxed text-ink-soft">
          the journal
          <br />
          <span className="font-semibold text-ink">
            {entries.length} published
          </span>{' '}
          · {yearRange(entries)}
        </p>
      </div>

      {lead && (
        <div className="grid gap-4">
          <JournalCard entry={lead} wide />
        </div>
      )}

      {row.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {row.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}

      <DeskDrafts drafts={drafts} />
    </section>
  )
}

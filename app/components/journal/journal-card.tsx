import { Link } from 'react-router'

import clsx from '~/utils/clsx'

import { formatJournalDate } from './format-date'

interface JournalCardProps {
  entry: JournalIndexEntry
  wide?: boolean
}

function DateRing() {
  return (
    <svg
      className="date-ring"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="20" rx="47" ry="16" pathLength={1} />
    </svg>
  )
}

export function JournalCard({ entry, wide = false }: JournalCardProps) {
  return (
    <Link
      to={`/journal/${entry.id}`}
      className={clsx(
        'journal-card group reveal relative block rounded-sm border border-rule bg-surface p-5 text-ink',
        'shadow-[2px_3px_0_rgba(43,42,40,0.05)] transition-[transform,box-shadow] duration-200',
        'motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-0.5 motion-safe:hover:-rotate-[0.25deg]',
        'hover:shadow-[4px_6px_0_rgba(43,42,40,0.08)]',
        'before:absolute before:left-1/2 before:top-[-9px] before:h-[18px] before:w-16 before:-translate-x-1/2 before:-rotate-2 before:rounded-[1px] before:border before:border-dashed before:border-mark/40 before:bg-mark/[0.14] before:content-[""]',
        wide && 'sm:col-span-full'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-label uppercase tracking-[0.08em] text-mark">
          {entry.tags.join(' · ')}
        </p>
        {wide && (
          <span className="shrink-0 font-mono text-[0.65625rem] text-ink-soft">
            /journal/{entry.id}
          </span>
        )}
      </div>

      <h3
        className={clsx(
          'mb-2 mt-3 font-display font-extrabold leading-tight tracking-tight text-ink transition-colors group-hover:text-mark',
          wide ? 'text-[clamp(1.25rem,2.4vw,1.6875rem)]' : 'text-xl'
        )}
      >
        {entry.title}
      </h3>

      <p
        className={clsx(
          'mb-3.5 font-mono text-meta leading-relaxed text-ink-soft',
          wide && 'max-w-[60ch]'
        )}
      >
        {entry.description}
      </p>

      <div className="flex items-center justify-between font-mono text-meta text-ink-soft">
        <span className="relative">
          <DateRing />
          {formatJournalDate(entry.date)}
        </span>
        <span className="font-semibold text-link">
          {wide ? 'read the entry →' : 'read →'}
        </span>
      </div>

      {!wide && (
        <p className="mt-2 font-mono text-[0.65625rem] text-ink-soft">
          /journal/{entry.id}
        </p>
      )}
    </Link>
  )
}

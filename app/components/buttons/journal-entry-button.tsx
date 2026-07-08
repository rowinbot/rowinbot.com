import { Link } from 'react-router'

interface JournalEntryButtonProps {
  id: string
  entry: JournalEntryMeta
}

export function JournalEntryButton(props: JournalEntryButtonProps) {
  const { entry } = props
  const date = entry.formattedDate ?? entry.date

  return (
    <Link
      to={`/journal/${props.id}`}
      className="group flex flex-col gap-3 border border-rule bg-surface p-6 transition-colors hover:border-mark"
    >
      {entry.tags.length > 0 && (
        <p className="font-mono text-label uppercase tracking-[0.08em] text-mark">
          {entry.tags.join(' · ')}
        </p>
      )}

      <h3 className="font-display text-xl font-extrabold leading-snug tracking-tight text-ink transition-colors group-hover:text-mark">
        {entry.title}
      </h3>

      <p className="font-mono text-meta leading-relaxed text-ink-soft">
        {entry.description}
      </p>

      <div className="mt-2 flex items-center justify-between font-mono text-meta text-ink-soft">
        <span>{date}</span>
        <span className="font-semibold text-link">read →</span>
      </div>
    </Link>
  )
}

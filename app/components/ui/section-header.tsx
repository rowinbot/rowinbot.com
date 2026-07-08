import { InkLink } from './ink-link'
import { Rule } from './rule'

interface SectionHeaderProps {
  title: string
  id?: string
  seeAllHref?: string
  seeAllLabel?: string
}

export function SectionHeader({
  title,
  id,
  seeAllHref,
  seeAllLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-center gap-3.5">
      <h2
        id={id}
        className="m-0 font-display text-[clamp(0.8125rem,1.5vw,0.9375rem)] font-extrabold uppercase tracking-[0.12em] text-ink"
      >
        {title}
      </h2>
      <Rule variant="ticks" />
      {seeAllHref && seeAllLabel && (
        <InkLink
          href={seeAllHref}
          className="whitespace-nowrap font-semibold tracking-[0.06em]"
        >
          {seeAllLabel}
        </InkLink>
      )}
    </div>
  )
}

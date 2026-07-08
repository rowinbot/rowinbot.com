import { Tag } from '~/components/ui'

interface DraftLineProps {
  title: string
  pillar: string
}

export function DraftLine({ title, pillar }: DraftLineProps) {
  return (
    <li className="draft-line flex items-baseline gap-3 border-b border-dashed border-rule px-0.5 py-3 font-mono text-ink-soft transition-transform">
      <span
        aria-hidden="true"
        className="relative top-0.5 h-[13px] w-[13px] shrink-0 rounded-sm border-[1.5px] border-ink-soft opacity-65 [.draft-line:hover_&]:border-mark"
      />
      <span className="font-display text-[0.90625rem] font-semibold leading-snug text-ink">
        {title}
      </span>
      <Tag className="ml-auto shrink-0">{pillar}</Tag>
    </li>
  )
}

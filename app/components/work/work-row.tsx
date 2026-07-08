import { type ReactNode } from 'react'
import { Link } from 'react-router'

interface WorkRowProps {
  name: string
  role: string
  href: string
  children: ReactNode
}

export function WorkRow({ name, role, href, children }: WorkRowProps) {
  return (
    <li className="work-row reveal grid grid-cols-1 items-baseline gap-y-1.5 border-b border-rule px-0.5 py-4 transition-colors hover:bg-surface md:grid-cols-[minmax(140px,190px)_1fr_auto] md:gap-x-[clamp(0.625rem,2vw,1.625rem)]">
      <div className="font-display text-[clamp(0.9375rem,1.7vw,1.125rem)] font-extrabold leading-tight tracking-tight text-ink">
        {name}
        <small className="mt-1.5 block font-mono text-[0.65625rem] font-normal uppercase tracking-[0.04em] text-mark">
          {role}
        </small>
      </div>
      <div className="font-mono text-meta leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
      <Link
        to={href}
        className="hidden self-center whitespace-nowrap font-mono text-label text-link hover:text-mark md:block"
      >
        details →
      </Link>
    </li>
  )
}

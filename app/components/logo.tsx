import { Link } from 'react-router'

import { BrandMark } from '~/components/ui'
import clsx from '~/utils/clsx'

interface BrandProps {
  className?: string
}

export function Brand({ className }: BrandProps) {
  return (
    <Link
      to="/"
      aria-label="Rowin Hernandez — home"
      className={clsx('group inline-flex items-center gap-3 text-ink', className)}
    >
      <BrandMark className="size-9 shrink-0 transition-transform duration-300 group-hover:-rotate-6 sm:size-10" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-black tracking-tight sm:text-2xl">
          Rowin Hernandez
        </span>
        <span className="mt-1.5 font-mono text-label lowercase tracking-[0.22em] text-ink-soft">
          rowinbot.com
        </span>
      </span>
    </Link>
  )
}

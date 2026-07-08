import { Link } from 'react-router'

import clsx from '~/utils/clsx'

interface BrandProps {
  className?: string
}

export function Brand({ className }: BrandProps) {
  return (
    <Link
      to="/"
      className={clsx('inline-flex flex-col leading-none text-ink', className)}
    >
      <span className="font-display text-xl font-black tracking-tight sm:text-2xl">
        Rowin Hernandez
      </span>
      <span className="mt-1.5 font-mono text-label lowercase tracking-[0.22em] text-ink-soft">
        rowinbot.com
      </span>
    </Link>
  )
}

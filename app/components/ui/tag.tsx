import { type ReactNode } from 'react'

import clsx from '~/utils/clsx'

interface TagProps {
  children: ReactNode
  variant?: 'pill' | 'flag'
  className?: string
}

export function Tag({ children, variant = 'pill', className }: TagProps) {
  return (
    <span
      className={clsx(
        'font-mono uppercase tracking-[0.14em]',
        variant === 'pill' &&
          'rounded-full border border-rule px-2.5 py-0.5 text-[0.625rem] text-ink-soft',
        variant === 'flag' &&
          'border-[1.5px] border-mark px-2 py-0.5 text-label text-mark rounded-sm',
        className
      )}
    >
      {children}
    </span>
  )
}

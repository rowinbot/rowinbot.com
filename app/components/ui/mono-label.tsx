import { type ElementType, type ReactNode } from 'react'

import clsx from '~/utils/clsx'

interface MonoLabelProps {
  children: ReactNode
  as?: ElementType
  tone?: 'ink' | 'ink-soft' | 'mark' | 'link'
  className?: string
}

const toneClass = {
  ink: 'text-ink',
  'ink-soft': 'text-ink-soft',
  mark: 'text-mark',
  link: 'text-link',
} as const

export function MonoLabel({
  children,
  as: Component = 'span',
  tone = 'ink-soft',
  className,
}: MonoLabelProps) {
  return (
    <Component
      className={clsx(
        'font-mono text-label uppercase tracking-[0.16em]',
        toneClass[tone],
        className
      )}
    >
      {children}
    </Component>
  )
}

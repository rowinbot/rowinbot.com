import { type ReactNode } from 'react'

import clsx from '~/utils/clsx'

interface IconButtonProps {
  children: ReactNode
  label: string
  onClick?: () => void
  ariaPressed?: boolean
  className?: string
}

export function IconButton({
  children,
  label,
  onClick,
  ariaPressed,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={ariaPressed}
      title={label}
      className={clsx(
        'inline-flex h-[34px] w-[34px] items-center justify-center rounded border border-transparent text-ink-soft',
        'transition-[color,border-color,transform] duration-150 hover:border-rule hover:text-mark active:translate-y-px',
        className
      )}
    >
      {children}
    </button>
  )
}

import clsx from '~/utils/clsx'

interface RuleProps {
  variant?: 'solid' | 'dashed' | 'ticks'
  className?: string
}

export function Rule({ variant = 'solid', className }: RuleProps) {
  if (variant === 'ticks') {
    return (
      <span
        aria-hidden="true"
        className={clsx(
          'block h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,var(--rule)_0_8px,transparent_8px_14px)]',
          className
        )}
      />
    )
  }

  return (
    <hr
      className={clsx(
        'border-0 border-t',
        variant === 'dashed' ? 'border-dashed border-rule' : 'border-rule',
        className
      )}
    />
  )
}

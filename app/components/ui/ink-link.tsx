import { type ReactNode } from 'react'
import { Link } from 'react-router'

import clsx from '~/utils/clsx'

interface InkLinkProps {
  href: string
  children: ReactNode
  variant?: 'default' | 'underline' | 'boxed'
  className?: string
}

const variantClass = {
  default: 'text-link hover:text-mark transition-colors',
  underline:
    'text-link font-semibold border-b-2 border-accent hover:text-mark hover:border-mark transition-colors',
  boxed:
    'inline-block border-[1.5px] border-ink px-4 py-2 text-ink hover:border-mark hover:text-mark hover:-translate-y-px transition-[color,border-color,transform] rounded-sm',
} as const

export function InkLink({
  href,
  children,
  variant = 'default',
  className,
}: InkLinkProps) {
  const classes = clsx('font-mono text-meta', variantClass[variant], className)
  const isInternal = href.startsWith('/') && !href.startsWith('//')

  if (isInternal) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      className={classes}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

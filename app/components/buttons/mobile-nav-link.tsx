import { type ReactNode } from 'react'
import { NavLink } from 'react-router';

import clsx from '~/utils/clsx'

interface MobileNavLinkProps {
  to: string
  children: ReactNode
  onClick?: () => void
}

export function MobileNavLink(props: MobileNavLinkProps) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        clsx(
          'cursor-pointer border-b border-dashed border-rule px-6 py-5 font-mono text-sm uppercase tracking-[0.08em] transition-colors',
          isActive
            ? 'border-l-2 border-l-mark bg-surface text-mark'
            : 'text-ink-soft hover:bg-surface hover:text-mark'
        )
      }
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  )
}

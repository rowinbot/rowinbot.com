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
          'px-6 py-5 font-cyber uppercase tracking-[0.2em] text-sm font-semibold cursor-pointer border-b border-cyber-border/50 transition-all duration-300',
          isActive
            ? 'text-cyber-cyan neon-text-cyan bg-cyber-cyan/5 border-l-2 border-l-cyber-cyan'
            : 'text-cyber-text-dim hover:text-cyber-cyan hover:neon-text-cyan hover:bg-cyber-cyan/5'
        )
      }
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  )
}

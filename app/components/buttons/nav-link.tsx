import { type ReactNode } from 'react'
import { generatePath, NavLink as RRNavLink } from 'react-router'

import { type Routes } from '~/routes'
import clsx from '~/utils/clsx'

type GeneratePathParams<P extends Routes> = {
  originalPath: P
  params?: Parameters<typeof generatePath<P>>[1]
}

interface NavLinkProps<P extends Routes> {
  to: GeneratePathParams<P>
  children: ReactNode
}

export function NavLink<P extends Routes>(props: NavLinkProps<P>) {
  return (
    <RRNavLink
      to={generatePath(props.to.originalPath, props.to.params)}
      className={({ isActive }) =>
        clsx(
          'px-4 py-2 font-cyber uppercase tracking-[0.2em] text-xs font-semibold cursor-pointer transition-all duration-300',
          isActive
            ? 'text-cyber-cyan neon-text-cyan border-b-2 border-cyber-cyan'
            : 'text-cyber-text-dim hover:text-cyber-cyan hover:neon-text-cyan border-b-2 border-transparent'
        )
      }
    >
      {props.children}
    </RRNavLink>
  )
}

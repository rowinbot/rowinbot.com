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
          'cursor-pointer border-b-2 pb-0.5 font-mono text-meta uppercase tracking-[0.08em] transition-colors',
          isActive
            ? 'border-mark text-mark'
            : 'border-transparent text-ink-soft hover:text-mark'
        )
      }
    >
      {props.children}
    </RRNavLink>
  )
}

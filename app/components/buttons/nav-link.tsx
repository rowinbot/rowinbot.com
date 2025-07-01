import { generatePath, Link } from 'react-router'
import { ReactNode } from 'react'
import { Routes } from '~/routes'

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
    <Link
      to={generatePath(props.to.originalPath, props.to.params)}
      className="px-4 py-2 text-sm app-text cursor-pointer"
    >
      {props.children}
    </Link>
  )
}

import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

interface NavLinkProps {
  to: string
  children: ReactNode
}

export function NavLink(props: NavLinkProps) {
  return (
    <Link to={props.to} className="px-4 py-2 text-sm app-text cursor-pointer">
      {props.children}
    </Link>
  )
}

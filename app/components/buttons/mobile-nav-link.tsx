import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

interface MobileNavLinkProps {
  to: string
  children: ReactNode
}

export function MobileNavLink(props: MobileNavLinkProps) {
  return (
    <Link to={props.to} className="px-4 py-2 text-sm app-text cursor-pointer">
      {props.children}
    </Link>
  )
}

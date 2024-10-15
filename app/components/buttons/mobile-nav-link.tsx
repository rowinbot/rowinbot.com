import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

interface MobileNavLinkProps {
  to: string
  children: ReactNode
  onClick?: () => void
}

export function MobileNavLink(props: MobileNavLinkProps) {
  return (
    <Link
      to={props.to}
      className="px-4 py-6 text-sm app-text cursor-pointer border-b border-slate-950 dark:border-slate-600 font-medium"
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  )
}

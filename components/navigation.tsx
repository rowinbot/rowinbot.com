import type { ReactNode } from 'react'

interface NavLinkProps {
  children: ReactNode
}

export function NavLink({ children }: NavLinkProps) {
  return <a className="px-4 py-2 text-sm text-slate-700">{children}</a>
}

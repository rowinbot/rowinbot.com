import type { ReactNode } from 'react'

interface NavLinkProps {
  children: ReactNode
}

export function NavLink({ children }: NavLinkProps) {
  return (
    <a
      href="#"
      className="px-4 py-2 text-sm text-slate-700 dark:text-white cursor-pointer"
    >
      {children}
    </a>
  )
}

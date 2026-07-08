import { type ReactNode } from 'react'

export function PersonalRoles(): ReactNode {
  const personalRoles = [
    "Programmer since '10",
    "Remote since '16",
    'Proud dad',
    'a11y advocate',
    'cyclist*',
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {personalRoles.map((role) => (
        <span
          key={role}
          className="border border-rule px-4 py-1.5 font-mono text-meta text-ink-soft transition-colors hover:border-mark hover:text-mark"
        >
          {role}
        </span>
      ))}
    </div>
  )
}

import { type ReactNode } from 'react'

export function PersonalRoles(): ReactNode {
  const personalRoles = [
    "Programmer '10",
    "Husband '18",
    'Father of a smart boy',
    'Not really a cyclist',
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {personalRoles.map((role) => (
        <span
          key={role}
          className="border border-cyber-border px-4 py-1.5 font-mono text-sm text-cyber-text-dim transition-colors duration-300 hover:border-cyber-cyan/60 hover:text-cyber-cyan"
        >
          {role}
        </span>
      ))}
    </div>
  )
}

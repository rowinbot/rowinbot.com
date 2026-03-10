import { ReactNode } from 'react'

export function PersonalRoles(): ReactNode {
  const personalRoles = [
    "Programmer '10",
    "Husband '18",
    'Father of a smart boy',
    'Not really a cyclist',
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {personalRoles.map((role) => (
        <span
          key={role}
          className="border border-white/30 px-4 py-1.5 font-mono text-sm text-white/70 transition-colors duration-300 hover:border-cyber-cyan/60 hover:text-cyber-cyan backdrop-blur-sm"
        >
          {role}
        </span>
      ))}
    </div>
  )
}

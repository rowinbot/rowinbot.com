import { ReactNode } from 'react'

export function PersonalRoles(): ReactNode {
  const personalRoles = [
    "Programmer '10 🧑🏻‍💻",
    "Husband '18 🤵🏻",
    'Father of a smart boy 👶',
    'Not really a cyclist 🚴‍♂️',
  ]

  return personalRoles.map((role, key) => (
    <span key={role}>
      <span className="2xs:whitespace-nowrap">
        {role}
        {key < personalRoles.length - 1 && ' |'}
      </span>
      {' ' /** This is a hack to make the paragraph wrap */}
    </span>
  ))
}

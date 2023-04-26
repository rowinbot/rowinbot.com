export function PersonalRoles() {
  const personalRoles = [
    "Programmer '10 🧑🏻‍💻",
    "Husband '18 🤵🏻",
    'Father of a smart boy 👶',
    'Not really a cyclist 🚴‍♂️',
  ]

  return (
    // TODO: This Fragment is a hack for TypeScript, will have to check how to do this and still make it valid to use as a React component.
    <>
      {personalRoles.map((role, key) => (
        <span key={role}>
          <span className="2xs:whitespace-nowrap">
            {role}
            {key < personalRoles.length - 1 && ' |'}
          </span>
          {' ' /** This is a hack to make the paragraph wrap */}
        </span>
      ))}
    </>
  )
}

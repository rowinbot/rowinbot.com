export function Logo() {
  return (
    <svg
      className="fill-slate-900 dark:fill-white"
      width={20}
      height={25}
      viewBox="0 0 30 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H20.1546C25.5921 0 30 4.41794 30 9.86775C30 13.2025 28.3195 16.3117 25.5326 18.1332L23.3063 19.5884C27.5402 23.297 30 28.6762 30 34.3636H21.4286C21.4286 30.8635 19.7716 27.571 16.9632 25.4907L14.4446 23.625H8.57143V34.3636H0V0ZM8.57143 15.0341H14.5825L20.8505 10.9373C21.2111 10.7016 21.4286 10.2993 21.4286 9.86775C21.4286 9.16257 20.8582 8.59091 20.1546 8.59091H8.57143V15.0341Z"
      />
    </svg>
  )
}

export function AdaptiveFullLogo() {
  return (
    <span className="app-text flex-shrink-0 text-2xl">
      <span className="align-middle inline-flex -translate-y-[2px] mr-2">
        <Logo />
      </span>
      Rowin Hernandez
    </span>
  )
}

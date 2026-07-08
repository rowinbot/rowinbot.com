import clsx from '~/utils/clsx'

interface PageStampProps {
  number: string
  className?: string
}

export function PageStamp({ number, className }: PageStampProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'pointer-events-none select-none font-mono text-[7rem] font-semibold leading-none text-ink/[0.04]',
        className
      )}
    >
      {number}
    </span>
  )
}

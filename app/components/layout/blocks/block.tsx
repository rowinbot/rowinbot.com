import clsx from '~/utils/clsx'

export function Block({
  maxW = '7xl',
  ...props
}: {
  className?: string
  maxW?: '4xl' | '7xl'
  children: React.ReactNode
}) {
  return (
    <section
      className={clsx(
        maxW === '4xl' && 'max-w-4xl',
        maxW === '7xl' && 'max-w-7xl',
        props.className
      )}
    >
      {props.children}
    </section>
  )
}

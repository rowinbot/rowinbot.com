import clsx from 'clsx'

export function CenteredBlock({
  maxW = '7xl',
  ...props
}: {
  containerClassName?: string
  className?: string
  maxW?: '4xl' | '7xl'
  children: React.ReactNode
}) {
  return (
    <section className={clsx('w-full px-4 sm:px-8', props.containerClassName)}>
      <div
        className={clsx(
          maxW === '4xl' && 'max-w-4xl',
          maxW === '7xl' && 'max-w-7xl',
          'w-full mx-auto',
          props.className
        )}
      >
        {props.children}
      </div>
    </section>
  )
}

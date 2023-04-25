import clsx from '~/utils/clsx'
import { Block } from './block'

export function AlignedBlock({
  containerClassName,
  className,
  align = 'center',
  ...props
}: PropsOf<typeof Block> & {
  align?: 'center' | 'left' | 'right'
  containerClassName?: string
}) {
  return (
    <Block
      className={clsx('w-full mx-auto px-4 sm:px-8', containerClassName)}
      {...props}
    >
      <div
        className={clsx(
          align === 'right' && 'ml-auto',
          align === 'left' && 'mr-auto',
          align === 'center' && 'mx-auto',
          'w-full',
          className
        )}
      >
        {props.children}
      </div>
    </Block>
  )
}

import { Link } from 'react-router';

import { type AnchorHTMLAttributes } from 'react'
import clsx from '~/utils/clsx'

export function AnchorLink({
  className,
  href = '',
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http')
  const isHash = href?.startsWith('#')

  const Component = isExternal ? 'a' : Link

  const props = isExternal || isHash ? { ...rest, href } : { ...rest, to: href }

  return (
    <Component
      className={clsx(
        'text-blue-600 dark:text-blue-200 dark:hover:text-blue-400 hover:text-blue-900',
        className
      )}
      rel="noopener noreferrer"
      target={!isHash ? '_blank' : undefined}
      to={''}
      {...props}
    >
      {rest.children}
    </Component>
  )
}

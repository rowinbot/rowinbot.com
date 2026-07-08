import { type AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router';

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
      className={clsx('text-link underline-offset-4 hover:text-mark', className)}
      rel="noopener noreferrer"
      target={!isHash ? '_blank' : undefined}
      to={''}
      {...props}
    >
      {rest.children}
    </Component>
  )
}

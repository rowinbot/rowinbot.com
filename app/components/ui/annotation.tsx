import { type ElementType, type ReactNode } from 'react'

import clsx from '~/utils/clsx'

interface AnnotationProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

export function Annotation({
  children,
  as: Component = 'p',
  className,
}: AnnotationProps) {
  return (
    <Component
      className={clsx(
        'font-mono text-meta italic leading-relaxed text-mark',
        className
      )}
    >
      {children}
    </Component>
  )
}

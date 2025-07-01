'use client'

import { MDXContentProps } from 'mdx-bundler/dist/client'
import { useMemo } from 'react'
import { getMdxPageComponent } from '~/utils/mdx'

export function MdxRenderer({
  code,
  ...props
}: MDXContentProps & { code: string }) {
  const MdxComponent = useMemo(() => getMdxPageComponent(code), [code])

  if (!MdxComponent) return null
  return <MdxComponent {...props} />
}

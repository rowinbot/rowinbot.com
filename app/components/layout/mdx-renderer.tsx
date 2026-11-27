'use client'

import { type MDXContentProps } from 'mdx-bundler/dist/client'
import { createElement } from 'react'

import { getMdxPageComponent } from '~/utils/mdx'

export function MdxRenderer({
  code,
  ...props
}: MDXContentProps & { code: string }) {
  return createElement(getMdxPageComponent(code), props)
}

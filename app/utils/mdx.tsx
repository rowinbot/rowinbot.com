import { Link } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import type { AnchorHTMLAttributes } from 'react'

function ALink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link to={href ?? ''} {...rest}>
      {rest.children}
    </Link>
  )
}

const mdxComponents = {
  a: ALink,
}

export function getMdxJournalEntryComponent(code: string) {
  const Component = getMDXComponent(code)
  function AppMdxComponent({ components, ...rest }: PropsOf<typeof Component>) {
    return (
      <div className="journal-entry">
        <Component components={{ ...mdxComponents, ...components }} {...rest} />
      </div>
    )
  }
  return AppMdxComponent
}

import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { getMDXComponent } from 'mdx-bundler/client'
import { useCallback, type AnchorHTMLAttributes, useState } from 'react'

function ALink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link to={href ?? ''} {...rest}>
      {rest.children}
    </Link>
  )
}

function UnknownTerm(props: React.PropsWithChildren) {
  return <span className="unknown-term">{props.children}</span>
}

function Details({
  title = 'Learn more',
  colorScheme = 'orange',
  ...props
}: React.PropsWithChildren<{
  title?: string
  summary: string
  colorScheme?: 'green' | 'orange'
  defaultToOpen?: boolean
}>) {
  const [open, setOpen] = useState(props.defaultToOpen ?? false)

  const onToggle = useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      // Somehow this event is fired at mount (at least) on Chrome.
      // so we can't just flip open so we need to check the DOM element
      // directly to see if it's open or not.
      setOpen(e.currentTarget.open)
    },
    []
  )

  return (
    <details
      open={open}
      onToggle={onToggle}
      className={clsx(
        'dark:bg-slate-950 bg-slate-200 border-[1px] border-slate-800 border-opacity-80 rounded-xl -m-[1px]'
      )}
    >
      <summary className="block cursor-pointer select-none py-2 focus-visible:outline-offset-8 rounded-xl mx-journal-entry-x">
        <span
          className={clsx(
            colorScheme === 'green' && 'text-emerald-500',
            colorScheme === 'orange' && 'text-orange-500',
            'text-sm font-semibold tracking-wider uppercase block py-2'
          )}
        >
          {title}
        </span>

        <span
          className={clsx(
            'w-3 -ml-5 mr-2 inline-block align-middle text-sm transition-transform duration-75',
            open && 'rotate-90 scale-125'
          )}
          aria-hidden
        >
          ➤
        </span>
        {props.summary && <span>{props.summary}</span>}
      </summary>

      <div className="py-8 block border-t-[1px] border-slate-800 border-opacity-40">
        {props.children}
      </div>
    </details>
  )
}

const mdxComponents = {
  a: ALink,
  UnknownTerm,
  Details,
  IllustrationTime: (
    props: React.PropsWithChildren<{
      summary: string
      defaultToOpen?: boolean
    }>
  ) => (
    <Details
      title={'Problems from friend of a friend'}
      colorScheme="green"
      {...props}
    />
  ),
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

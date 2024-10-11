import clsx from '~/utils/clsx'
import { getMDXComponent } from 'mdx-bundler/client'
import { useCallback, useState } from 'react'
import { Anchor } from '~/components/buttons'
import { Icon } from '@iconify-icon/react'

type HeadingProps = React.PropsWithChildren<{ id?: string | undefined }>

function UnknownTerm(props: React.PropsWithChildren) {
  return <span className="unknown-term">{props.children}</span>
}

function HeadingWithLink({
  level: Heading,
  children,
  ...props
}: HeadingProps & {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) {
  return (
    <Heading className="group relative" {...props}>
      {!!props.id && (
        <a
          href={`#${props.id}`}
          className="group-hover:opacity-100 opacity-0 transition-opacity duration-200 absolute -left-0.5 bottom-0 top-0 my-auto"
        >
          <Icon
            icon="radix-icons:link-2"
            className="align-middle pb-1 scale-75"
          />
        </a>
      )}
      {children}
    </Heading>
  )
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
        'dark:bg-slate-950 bg-gray-50 border-[1px] border-slate-800 border-opacity-80 rounded-xl no-marker max-lg:mx-1'
      )}
    >
      <summary className="block cursor-pointer select-none py-2 focus-visible:outline-offset-8 rounded-xl mx-x-safe sm:mx-x-sm">
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
            'w-3 sm:-ml-5 -ml-4 mr-1 sm:mr-2 inline-block align-middle text-sm transition-transform duration-75',
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
  a: Anchor,
  h1: (props: HeadingProps) => <HeadingWithLink level="h1" {...props} />,
  h2: (props: HeadingProps) => <HeadingWithLink level="h2" {...props} />,
  h3: (props: HeadingProps) => <HeadingWithLink level="h3" {...props} />,
  h4: (props: HeadingProps) => <HeadingWithLink level="h4" {...props} />,
  h5: (props: HeadingProps) => <HeadingWithLink level="h5" {...props} />,
  h6: (props: HeadingProps) => <HeadingWithLink level="h6" {...props} />,
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

export function getMdxPageComponent(code: string) {
  const Component = getMDXComponent(code)

  function MDXPageComponent({
    components,
    className,
    ...rest
  }: PropsOf<typeof Component> & { className?: string }) {
    return (
      <div className={clsx('journal-entry', className)}>
        <Component components={{ ...mdxComponents, ...components }} {...rest} />
      </div>
    )
  }
  return MDXPageComponent
}

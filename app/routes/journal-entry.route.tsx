import { motion } from 'framer-motion'
import { getJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { BlurrableImage } from '~/components/image'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { isEnoentError } from '~/utils/misc.server'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getJournalEntrySocialMetaTags } from '~/utils/seo'
import { getAbsolutePathname } from '~/utils/misc'

import type { Route } from './+types/journal-entry.route'
import { MdxRenderer } from '~/components/layout/mdx-renderer'

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const mdx = await getJournalEntryMDXFromSlug(params.entryId)

    return {
      entryId: params.entryId,
      mdxCode: mdx.code,
      matter: mdx.frontmatter,
    }
  } catch (error) {
    if (isEnoentError(error)) {
      throw new Response('Not Found', { status: 404 })
    }

    throw error
  }
}

export const meta: Route.MetaFunction = ({ data, params, location }) => {
  const entryId = params.entryId!
  const url = getAbsolutePathname(location.pathname)

  if (!data?.matter) {
    return [
      { title: `404 Not found` },
      {
        name: 'description',
        content: `The journal entry you are looking for does not exist.`,
      },
    ]
  }

  return getJournalEntrySocialMetaTags(url, entryId, data.matter)
}

export default function JournalEntryRoute({
  loaderData,
}: Route.ComponentProps) {
  const { mdxCode, matter } = loaderData

  return (
    <motion.main
      className="mx-auto lg:max-w-4xl py-10 text-cyber-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <header className="px-x sm:px-x-sm mb-16 space-y-6">
        <div className="w-16 h-px bg-cyber-cyan" />

        <ul className="flex flex-wrap gap-2">
          {matter.tags.map((tag) => (
            <li key={tag}>
              <span className="border border-cyber-cyan/30 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-cyber-cyan inline-block">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <p className="font-mono text-sm text-cyber-cyan/60">
            {matter.formattedDate}
          </p>

          <h1 className="text-4xl lg:text-5xl font-black whitespace-pre-line leading-snug neon-text-cyan">
            {matter.title}
          </h1>
        </div>
      </header>

      {matter.imageBlurUri && matter.imageSrc && matter.imageAlt && (
        <figure className="mb-20 space-y-4">
          <div className="border border-cyber-cyan/20 rounded-sm overflow-hidden transition-shadow duration-300 hover:glow-cyan">
            <BlurrableImage
              blurDataUrl={matter.imageBlurUri}
              src={matter.imageSrc}
              width={896}
              height={640}
              className="aspect-[7/5] object-cover w-full rounded-sm"
              alt={matter.imageAlt}
            />
          </div>

          <figcaption>
            <p className="px-x sm:px-x-sm font-mono text-xs text-cyber-text-dim">
              {matter.imageAlt}
              <br />
              <span className="text-cyber-cyan font-bold">Art by</span>{' '}
              {matter.imageCredit}.
            </p>
          </figcaption>
        </figure>
      )}

      <div className="border-t border-cyber-border mb-12" />

      <MdxRenderer className="lg:text-lg" code={mdxCode} />
    </motion.main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <AlignedBlock>
        <div className="flex-1">
          <motion.div
            className="mx-auto lg:max-w-4xl text-cyber-text py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-px bg-cyber-cyan mx-auto" />

              <p className="font-cyber text-6xl sm:text-7xl font-black text-cyber-cyan neon-text-cyan-strong">
                404
              </p>

              <h1 className="font-cyber text-xl sm:text-2xl uppercase tracking-widest text-cyber-text">
                SIGNAL_NOT_FOUND
              </h1>

              <p className="font-mono text-sm text-cyber-text-dim max-w-md mx-auto">
                // the requested transmission does not exist in this sector
              </p>

              <Link
                to="/journal"
                className="inline-block border border-cyber-cyan/40 px-6 py-2 font-mono text-sm text-cyber-cyan uppercase tracking-wider hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-300"
              >
                {'<'} return_to_journal
              </Link>
            </div>
          </motion.div>
        </div>
      </AlignedBlock>
    )
  }

  return (
    <AlignedBlock>
      <div className="flex-1">
        <motion.div
          className="mx-auto lg:max-w-4xl text-cyber-text py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-6">
            <div className="w-20 h-px bg-cyber-magenta mx-auto" />

            <p className="font-cyber text-5xl sm:text-6xl font-black text-cyber-magenta neon-text-magenta-strong">
              ERROR
            </p>

            <h1 className="font-cyber text-xl sm:text-2xl uppercase tracking-widest text-cyber-text">
              SYSTEM_MALFUNCTION
            </h1>

            <p className="font-mono text-sm text-cyber-text-dim max-w-md mx-auto">
              // an unexpected error occurred during transmission
            </p>

            <Link
              to="/journal"
              className="inline-block border border-cyber-cyan/40 px-6 py-2 font-mono text-sm text-cyber-cyan uppercase tracking-wider hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-300"
            >
              {'<'} return_to_journal
            </Link>
          </div>
        </motion.div>
      </div>
    </AlignedBlock>
  )
}

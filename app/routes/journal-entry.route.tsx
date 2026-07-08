import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { BlurrableImage } from '~/components/image'
import { formatJournalDate } from '~/components/journal'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { MdxRenderer } from '~/components/layout/mdx-renderer'
import { InkLink, Tag } from '~/components/ui'
import { getJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getAbsolutePathname } from '~/utils/misc'
import { isEnoentError } from '~/utils/misc.server'
import { getJournalEntrySocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/journal-entry.route'

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
    <main id="main" className="mx-auto py-12 text-ink lg:max-w-4xl">
      <header className="mb-12 space-y-6 px-x sm:px-x-sm">
        <InkLink href="/journal" className="inline-block">
          ← the journal
        </InkLink>

        <ul className="flex flex-wrap gap-2">
          {matter.tags.map((tag) => (
            <li key={tag}>
              <Tag variant="flag">{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <p className="font-mono text-meta uppercase tracking-[0.16em] text-ink-soft">
            {formatJournalDate(matter.formattedDate ?? matter.date)}
          </p>

          <h1 className="whitespace-pre-line font-display text-d2 font-black leading-tight tracking-[-0.02em] text-ink">
            {matter.title}
          </h1>

          <p className="max-w-[60ch] font-mono text-meta leading-relaxed text-ink-soft">
            {matter.description}
          </p>
        </div>
      </header>

      {matter.imageBlurUri && matter.imageSrc && matter.imageAlt && (
        <figure className="mb-16 space-y-4">
          <div className="overflow-hidden rounded-sm border border-rule bg-mount shadow-[3px_5px_0_rgba(43,42,40,0.07)]">
            <BlurrableImage
              blurDataUrl={matter.imageBlurUri}
              src={matter.imageSrc}
              width={896}
              height={640}
              className="aspect-[7/5] w-full object-cover"
              alt={matter.imageAlt}
            />
          </div>

          <figcaption className="px-x font-mono text-meta italic leading-relaxed text-ink-soft sm:px-x-sm">
            {matter.imageAlt}
            {matter.imageCredit && (
              <>
                {' '}
                <span className="font-semibold not-italic text-ink">
                  Art by
                </span>{' '}
                {matter.imageCredit}.
              </>
            )}
          </figcaption>
        </figure>
      )}

      <div className="mb-10 px-x sm:px-x-sm">
        <div className="border-t border-dashed border-rule" />
      </div>

      <MdxRenderer className="lg:text-lg" code={mdxCode} />
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <AlignedBlock>
      <div className="mx-auto py-20 text-center text-ink lg:max-w-4xl">
        <div className="space-y-6">
          <p className="font-display text-d1 font-black text-mark">
            {is404 ? '404' : 'Error'}
          </p>

          <h1 className="font-display text-lg font-extrabold uppercase tracking-[0.12em] text-ink">
            {is404 ? 'Entry not found' : 'Something went wrong'}
          </h1>

          <p className="mx-auto max-w-md font-mono text-meta text-ink-soft">
            {is404
              ? 'The journal entry you are looking for does not exist.'
              : 'An unexpected error occurred while loading this entry.'}
          </p>

          <Link
            to="/journal"
            className="inline-block border border-rule px-6 py-2 font-mono text-meta text-ink transition-colors hover:border-mark hover:text-mark"
          >
            ← Back to journal
          </Link>
        </div>
      </div>
    </AlignedBlock>
  )
}

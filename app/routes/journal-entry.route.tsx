import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { BlurrableImage } from '~/components/image'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { MdxRenderer } from '~/components/layout/mdx-renderer'
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
    <main className="mx-auto py-12 text-ink lg:max-w-4xl">
      <header className="mb-12 space-y-6 px-x sm:px-x-sm">
        <ul className="flex flex-wrap gap-2">
          {matter.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-block border border-rule px-2 py-0.5 font-mono text-label uppercase tracking-[0.08em] text-mark">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <p className="font-mono text-meta text-ink-soft">
            {matter.formattedDate}
          </p>

          <h1 className="whitespace-pre-line font-display text-d2 font-black leading-tight tracking-tight text-ink">
            {matter.title}
          </h1>
        </div>
      </header>

      {matter.imageBlurUri && matter.imageSrc && matter.imageAlt && (
        <figure className="mb-16 space-y-4">
          <div className="overflow-hidden rounded-sm border border-rule">
            <BlurrableImage
              blurDataUrl={matter.imageBlurUri}
              src={matter.imageSrc}
              width={896}
              height={640}
              className="aspect-[7/5] w-full rounded-sm object-cover"
              alt={matter.imageAlt}
            />
          </div>

          <figcaption>
            <p className="px-x font-mono text-meta text-ink-soft sm:px-x-sm">
              {matter.imageAlt}
              <br />
              <span className="font-semibold text-ink">Art by</span>{' '}
              {matter.imageCredit}.
            </p>
          </figcaption>
        </figure>
      )}

      <div className="mb-10 border-t border-rule" />

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

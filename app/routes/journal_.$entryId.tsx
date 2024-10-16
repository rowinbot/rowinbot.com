import { json, MetaFunction, type LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { getJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getMdxPageComponent } from '~/utils/mdx'
import { BlurrableImage } from '~/components/image'
import { isEnoentError } from '~/utils/misc.server'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getJournalEntrySocialMetaTags } from '~/utils/seo'
import { getAbsolutePathname, websiteUrl } from '~/utils/misc'

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(typeof params.entryId === 'string')

  try {
    const mdx = await getJournalEntryMDXFromSlug(params.entryId)

    return json({
      entryId: params.entryId,
      mdxCode: mdx.code,
      matter: mdx.frontmatter,
    })
  } catch (error) {
    if (isEnoentError(error)) {
      throw json({}, { status: 404 })
    }

    throw error
  }
}

export const meta: MetaFunction<typeof loader> = ({
  data,
  params,
  location,
}) => {
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

export default function JournalEntryRoute() {
  const { mdxCode, matter } = useLoaderData<typeof loader>()

  const JournalEntry = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])

  return (
    <main className="mx-auto lg:max-w-4xl py-10 app-text">
      <header className="px-x sm:px-x-sm mb-16 space-y-6">
        <ul className="space-x-2">
          {matter.tags.map((tag) => (
            <li key={tag} className="inline opacity-75">
              <span
                className="bg-blue-300 rounded-md w-2 h-2 inline-block mr-2 align-middle"
                aria-hidden
              />
              <span className="text-sm">{`${tag}`}</span>
            </li>
          ))}
        </ul>

        <div>
          <p className="text-lg text-gray-500">{matter.formattedDate}</p>

          <h1 className="text-4xl lg:text-5xl font-medium whitespace-pre-line leading-snug">
            {matter.title}
          </h1>
        </div>
      </header>

      {matter.imageBlurUri && matter.imageSrc && matter.imageAlt && (
        <figure className="mb-20 space-y-6">
          <BlurrableImage
            blurDataUrl={matter.imageBlurUri}
            src={matter.imageSrc}
            width={896}
            height={640}
            className="aspect-[7/5] object-cover lg:rounded-xl w-full"
            alt={matter.imageAlt}
          />

          <figcaption>
            <p className={`px-x sm:px-x-sm text-slate-500 dark:text-slate-400`}>
              {matter.imageAlt}
              <br />
              <span className="font-black">Art by</span> {matter.imageCredit}.
            </p>
          </figcaption>
        </figure>
      )}

      <JournalEntry className="lg:text-lg" />
    </main>
  )
}

export function CatchBoundary() {
  return (
    <AlignedBlock>
      <div className="flex-1">
        <div className="mx-auto lg:max-w-4xl app-text py-10 rounded-xl">
          <p className="text-6xl font-medium text-center">
            The journal entry you are looking for does not exist :(
          </p>
        </div>
      </div>
    </AlignedBlock>
  )
}

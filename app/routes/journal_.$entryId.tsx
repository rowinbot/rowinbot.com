import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node'
import { FullPageContainer } from '~/components/layout'
import invariant from 'tiny-invariant'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { getJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getMdxPageComponent } from '~/utils/mdx'
import { BlurrableImage } from '~/components/image'
import { isEnoentError } from '~/utils/misc.server'
import { getJournalEntrySocialMetas as getJournalEntrySocialMeta } from '~/utils/seo'
import { getStringOr, websiteUrl } from '~/utils/misc'

export async function loader({ params }: LoaderArgs) {
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
  parentsData,
}) => {
  const entryId = params.entryId!
  const url = getStringOr(parentsData?.root?.url, websiteUrl)

  if (!data?.matter) {
    return {
      title: `404 Not found`,
      description: `The journal entry you are looking for does not exist.`,
    }
  }

  return getJournalEntrySocialMeta(url, entryId, data.matter)
}

export default function JournalEntryRoute() {
  const { mdxCode, matter } = useLoaderData<typeof loader>()

  const JournalEntry = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])

  return (
    <FullPageContainer>
      <div className="flex-1">
        <div className="mx-auto lg:max-w-4xl text-slate-800 dark:text-slate-300 py-10">
          <header className="px-journal-entry-x mb-16 space-y-6">
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

            <p className="text-lg">{matter.formattedDate}</p>

            <h1 className="text-5xl font-medium whitespace-pre-line leading-snug">
              {matter.title}
            </h1>
          </header>

          <figure className="mb-28 space-y-6">
            <BlurrableImage
              blurDataUrl={matter.imageBlurData}
              src={matter.imageSrc}
              width={896}
              height={640}
              className="aspect-[7/5] object-cover lg:rounded-xl w-full"
              alt={matter.imageAlt}
            />

            <figcaption>
              <p
                className={`px-journal-entry-x text-slate-500 dark:text-slate-400`}
              >
                {matter.imageAlt}
                <br />
                <span className="font-black">Art by</span> {matter.imageCredit}.
              </p>
            </figcaption>
          </figure>

          <JournalEntry className="text-lg" />
        </div>
      </div>
    </FullPageContainer>
  )
}

export function CatchBoundary() {
  return (
    <FullPageContainer>
      <div className="flex-1">
        <div className="mx-auto lg:max-w-4xl app-text py-10 rounded-xl">
          <p className="text-6xl font-medium text-center">
            The journal entry you are looking for does not exist :(
          </p>
        </div>
      </div>
    </FullPageContainer>
  )
}

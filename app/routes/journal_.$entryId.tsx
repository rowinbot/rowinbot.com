import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { FullPageContainer } from '~/components/layout'
import invariant from 'tiny-invariant'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { bundleJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getMdxJournalEntryComponent } from '~/utils/mdx'
import { BlurrableImage } from '~/components/image'

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.entryId === 'string')

  const mdx = await bundleJournalEntryMDXFromSlug(params.entryId)

  return {
    entryId: params.entryId,
    mdxCode: mdx.code,
    matter: mdx.frontmatter,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data.matter.title + ' | Journal | Rowin Hernandez',
    description: data.matter.description,
  }
}

export default function JournalEntryRoute() {
  const { mdxCode, matter } = useLoaderData<typeof loader>()

  const JournalEntry = useMemo(
    () => getMdxJournalEntryComponent(mdxCode),
    [mdxCode]
  )

  return (
    <FullPageContainer>
      <div className="flex-1">
        <div className="mx-auto lg:max-w-4xl text-slate-800 dark:text-slate-300 py-10 rounded-xl">
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

          <JournalEntry />
        </div>
      </div>
    </FullPageContainer>
  )
}

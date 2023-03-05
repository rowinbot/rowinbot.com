import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Breadcrumbs } from '~/components/breadcrumbs'
import { FullPageContainer, PageContainerContent } from '~/components/layout'
import invariant from 'tiny-invariant'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { bundleJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getMdxJournalEntryComponent } from '~/utils/mdx'
import { formatStrDate } from '~/utils/misc'

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.entryId === 'string')

  const mdx = await bundleJournalEntryMDXFromSlug(params.entryId)

  return {
    entryId: params.entryId,
    mdxCode: mdx.code,
    matter: {
      ...mdx.frontmatter,
      formattedDate: formatStrDate(mdx.frontmatter.date),
    },
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
        <PageContainerContent>
          <div className="space-y-4 mt-16 mb-8">
            <Breadcrumbs />
          </div>
        </PageContainerContent>

        <div className="mx-auto lg:max-w-4xl text-slate-800 dark:text-slate-300">
          <header className="px-journal-entry-x mb-16 space-y-6 app-text">
            <p className="text-lg">{matter.formattedDate}</p>

            <h1 className="text-5xl font-medium whitespace-pre-line leading-snug">
              {matter.title}
            </h1>
          </header>

          <figure className="mb-28 space-y-6">
            <img
              src={matter.imageSrc}
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

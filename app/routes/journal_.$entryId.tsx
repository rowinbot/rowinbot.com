import type { LoaderArgs } from '@remix-run/node'
import { Breadcrumbs } from '~/components/breadcrumbs'
import { FullPageContainer, PageContainerContent } from '~/components/layout'
import invariant from 'tiny-invariant'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import { bundleJournalEntryMDXFromSlug } from '~/utils/mdx.server'
import { getMdxJournalEntryComponent } from '~/utils/mdx'

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.entryId === 'string')

  return {
    entryId: params.entryId,
    mdx: await bundleJournalEntryMDXFromSlug(params.entryId),
  }
}

export default function JournalEntryRoute() {
  const { mdx } = useLoaderData<typeof loader>()

  const JournalEntry = useMemo(
    () => getMdxJournalEntryComponent(mdx.code),
    [mdx.code]
  )

  return (
    <FullPageContainer>
      <PageContainerContent>
        <header className="space-y-4 mt-16 mb-8">
          <Breadcrumbs />
        </header>

        <div className="px-10 mx-auto max-w-5xl text-slate-800 dark:text-slate-400 space-y-10">
          <h1 className="text-3xl font-medium app-text">
            {mdx.frontmatter.title}
          </h1>

          <JournalEntry />
        </div>
      </PageContainerContent>
    </FullPageContainer>
  )
}

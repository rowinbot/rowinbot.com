import { JournalEntryButton } from '~/components/buttons/journal-entry-button'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { json, MetaFunction } from '@remix-run/node'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getSocialMetaTags } from '~/utils/seo'
import { getAbsolutePathname, websiteUrl } from '~/utils/misc'

export async function loader() {
  const entries = getAllJournalEntries()

  return json({
    entries: await entries,
  })
}

export const meta: MetaFunction<typeof loader> = ({ location }) => {
  websiteUrl
  location.pathname
  return getSocialMetaTags({
    title: 'Journal | Rowin Hernandez',
    url: getAbsolutePathname(location.pathname),
  })
}

export default function JournalRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <AlignedBlock className="relative z-10 pt-14 md:space-y-0 space-y-8">
        <header className="space-y-6 app-text">
          <h1 className="text-3xl font-medium app-text">
            {"Here's what I've been up to lately 🤓"}
          </h1>
        </header>
      </AlignedBlock>

      <AlignedBlock className="py-14">
        <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
          {data.entries.map((entry) => (
            <JournalEntryButton key={entry.id} id={entry.id} entry={entry} />
          ))}
        </div>
      </AlignedBlock>
    </main>
  )
}

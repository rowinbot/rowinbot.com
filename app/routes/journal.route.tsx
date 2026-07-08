import { JournalEntryButton } from '~/components/buttons/journal-entry-button'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { getAbsolutePathname } from '~/utils/misc'
import { getSocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/journal.route'

export async function loader() {
  const entries = getAllJournalEntries()

  return {
    entries: await entries,
  }
}

export const meta: Route.MetaFunction = ({ location }) => {
  return getSocialMetaTags({
    title: 'Journal | Rowin Hernandez',
    url: getAbsolutePathname(location.pathname),
  })
}

export default function JournalRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <AlignedBlock className="py-16 lg:py-20">
        <p className="font-mono text-label uppercase tracking-[0.2em] text-mark">
          The journal
        </p>
        <h1 className="mt-3 font-display text-d1 font-black tracking-tight text-ink">
          Journal
        </h1>
        <p className="mt-4 max-w-lg font-mono text-meta text-ink-soft">
          Notes that outgrew the margin and became entries.
        </p>
      </AlignedBlock>

      <AlignedBlock className="pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loaderData.entries.map((entry) => (
            <JournalEntryButton key={entry.id} id={entry.id} entry={entry} />
          ))}
        </div>
      </AlignedBlock>
    </main>
  )
}

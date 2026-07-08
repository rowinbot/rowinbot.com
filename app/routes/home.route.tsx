import * as mainImage from '~/../public/images/rowin-2024.jpg'

import { JournalEntryButton } from '~/components/buttons/journal-entry-button'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getAllJournalEntries } from '~/utils/mdx.server'

import type { Route } from './+types/home.route'

export async function loader({}: Route.LoaderArgs) {
  const entries = getAllJournalEntries()

  return {
    mainImage: mainImage,
    entries: await entries,
  }
}

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <AlignedBlock className="py-16 lg:py-24">
        <p className="font-mono text-label uppercase tracking-[0.2em] text-mark">
          Product engineer · tech lead
        </p>
        <h1 className="mt-3 font-display text-d1 font-black tracking-tight text-ink">
          Rowin Hernandez
        </h1>
        <p className="mt-5 max-w-2xl font-display text-lg font-bold leading-snug text-ink">
          Senior product engineer and tech lead with a strong bias toward
          shipping complex product surfaces end-to-end.
        </p>
      </AlignedBlock>

      <AlignedBlock className="pb-24">
        <div className="flex items-baseline gap-4 border-b-2 border-ink pb-3">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
            Journal
          </h2>
          <span className="ml-auto font-mono text-meta text-link">
            all entries →
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loaderData.entries.map((entry) => (
            <JournalEntryButton key={entry.id} id={entry.id} entry={entry} />
          ))}
        </div>
      </AlignedBlock>
    </main>
  )
}

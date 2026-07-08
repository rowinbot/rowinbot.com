import { KalebtecBridge } from '~/components/bridge'
import { HowItsBuilt, WorkedProblem } from '~/components/diagram'
import { Hero } from '~/components/hero'
import { JournalSection, journalDrafts } from '~/components/journal'
import { WorkIndex } from '~/components/work'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { websiteUrl } from '~/utils/misc'
import { getSocialMetaTags } from '~/utils/seo'

import type { Route } from './+types/home.route'

export function meta(_: Route.MetaArgs) {
  return getSocialMetaTags({
    title: 'Rowin Hernandez — Product engineer & tech lead',
    description:
      'Senior product engineer and tech lead with a strong bias toward shipping complex product surfaces end-to-end. Co-founder of Kalebtec.',
    url: websiteUrl,
  })
}

export async function loader(_: Route.LoaderArgs) {
  const entries = await getAllJournalEntries()

  return { entries }
}

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <Hero />
      <JournalSection entries={loaderData.entries} drafts={journalDrafts} />
      <WorkIndex />
      <WorkedProblem />
      <HowItsBuilt />
      <KalebtecBridge />
    </main>
  )
}

import { motion } from 'framer-motion'
import { JournalEntryButton } from '~/components/buttons/journal-entry-button'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { FloatingDots, DiagonalAccent, SignalBars, CyberDivider } from '~/components/cyber-decorations'
import { getSocialMetaTags } from '~/utils/seo'
import { getAbsolutePathname, websiteUrl } from '~/utils/misc'

import type { Route } from './+types/journal.route'

export async function loader() {
  const entries = getAllJournalEntries()

  return {
    entries: await entries,
  }
}

export const meta: Route.MetaFunction = ({ location }) => {
  websiteUrl
  location.pathname
  return getSocialMetaTags({
    title: 'Journal | Rowin Hernandez',
    url: getAbsolutePathname(location.pathname),
  })
}

function RevealOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function JournalRoute({ loaderData }: Route.ComponentProps) {
  return (
    <motion.main
      className="relative cyber-grid-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingDots />
      <DiagonalAccent side="right" className="top-32" />

      <AlignedBlock className="relative z-10 pt-20 pb-10 md:space-y-0 space-y-8">
        <RevealOnScroll>
          <header className="space-y-4 text-cyber-text">
            <div className="w-20 h-px bg-cyber-cyan" />

            <h1 className="font-cyber text-3xl sm:text-4xl lg:text-5xl uppercase tracking-widest text-cyber-text font-black">
              JOURNAL_
            </h1>

            <p className="font-mono text-sm text-cyber-text-dim max-w-lg">
              // transmissions from the digital frontier
            </p>
            <SignalBars className="mt-2" />
          </header>
        </RevealOnScroll>
      </AlignedBlock>

      <CyberDivider label="entries" className="mx-auto max-w-6xl px-6 sm:px-8" />

      <AlignedBlock className="py-14">
        <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
          {loaderData.entries.map((entry, i) => (
            <RevealOnScroll key={entry.id} delay={i * 0.1}>
              <JournalEntryButton id={entry.id} entry={entry} />
            </RevealOnScroll>
          ))}
        </div>
      </AlignedBlock>
    </motion.main>
  )
}

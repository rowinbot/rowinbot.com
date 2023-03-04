import { JournalEntryButton } from '~/components/buttons'
import {
  FullPageContainer,
  PageContainer,
  PageContainerContent,
} from '~/components/layout'
import { LayeredWavezz } from '~/components/wavezz'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries } from '~/utils/mdx.server'

export async function loader() {
  return {
    entries: await getAllJournalEntries(),
  }
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="app-pattern-bg">
      <FullPageContainer
        topElement={
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 right-0 h-full overflow-hidden">
              <LayeredWavezz
                direction="top-left"
                className="h-full -translate-y-3"
              />
            </div>

            <PageContainer id="page-header" className="relative z-10">
              <header className="py-80 max-w-5xl mx-auto">
                <h2 className="text-4xl 2xs:text-5xl app-text sm:text-6xl lg:text-7xl items-start !leading-relaxed text-shadow-small font-normal">
                  Crafting adaptive high-quality experiences for the Web.
                </h2>
              </header>
            </PageContainer>
          </div>
        }
      >
        <PageContainerContent>
          <main className="py-20 space-y-16">
            <h2 className="text-3xl font-medium app-text">
              {"Here's what I've been up to lately 🤓"}
            </h2>

            <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
              {data.entries.map((entry) => (
                <JournalEntryButton
                  key={entry.id}
                  id={entry.id}
                  title={entry.title}
                  imageSrc={entry.imageSrc}
                  imageAlt={entry.imageAlt}
                />
              ))}
            </div>
          </main>
        </PageContainerContent>
      </FullPageContainer>
    </div>
  )
}

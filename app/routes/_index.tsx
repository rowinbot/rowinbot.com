import { JournalEntryButton } from '~/components/buttons'
import {
  FullPageContainer,
  PageContainer,
  PageContainerContent,
} from '~/components/layout'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { Soundz } from '~/components/soundz'
import { cachifiedImage } from '~/utils/cache.server'
import { json } from '@remix-run/node'
import { BlurrableImage } from '~/components/image'

export async function loader() {
  const mainImage = cachifiedImage(
    'home:main-image',
    '/images/lucky-the-dog-coding.png'
  )
  const entries = getAllJournalEntries()

  return json({
    mainImage: await mainImage,
    entries: await entries,
  })
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <FullPageContainer
      topElement={
        <div className="relative">
          <PageContainer
            id="page-header"
            className="relative z-10 py-24 flex flex-col md:flex-row md:space-x-8 md:space-y-0 space-y-8"
          >
            <BlurrableImage
              blurDataUrl={data.mainImage.blurDataUrl}
              src={data.mainImage.src}
              width={700}
              height={600}
              alt="Lucky the Cocker Spaniel coding in his laptop"
              className="aspect-[6/7] object-cover h-[26rem] md:h-[28rem] xl:h-[40rem] rounded-2xl transition-all duration-200 ease-out"
            />

            <header className="self-center space-y-4 app-text md:max-w-xl">
              <h2 className="text-4xl items-start !leading-relaxed font-semibold text-shadow-short text-shadow-slate-100 dark:text-shadow-black">
                Hi, I'm Rowin!
              </h2>

              <p className="leading-loose text-lg">
                I love creating interactive and performant experiences for the
                web.
              </p>

              <p className="leading-loose text-lg">
                Oftentimes, I find myself using React and TypeScript, but I'm
                always trying to learn new things. You can find the latest on my
                journal.
              </p>

              <Soundz />
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
                blurDataUrl={entry.imageBlurData}
                imageSrc={entry.imageSrc}
                imageAlt={entry.imageAlt}
              />
            ))}
          </div>
        </main>
      </PageContainerContent>
    </FullPageContainer>
  )
}

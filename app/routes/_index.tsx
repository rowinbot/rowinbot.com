import { JournalEntryButton } from '~/components/buttons'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { json } from '@remix-run/node'
import { BlurrableImage } from '~/components/image'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import * as mainImage from '~/../public/images/rowin-2024.jpg'
import { Icon } from '@iconify-icon/react'

export async function loader() {
  const entries = getAllJournalEntries()

  return json({
    mainImage: mainImage,
    entries: await entries,
  })
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <AlignedBlock className="relative z-10 py-14 flex flex-col md:flex-row-reverse md:space-y-0 space-y-8 max-w-4xl gap-8">
        <BlurrableImage
          blurDataUrl={data.mainImage.blurDataUri}
          src={data.mainImage.imageUri}
          width={700}
          height={600}
          alt="Lucky the Cocker Spaniel coding in his laptop"
          className="aspect-[5/4] md:aspect-[3/4] object-cover h-[22rem] xs:max-md:h-auto xs:self-start w-auto md:h-[28rem] xl:h-[40rem] shrink-0 rounded-2xl transition-all duration-200 ease-out dark:brightness-90 dark:contrast-[0.85]"
        />

        <header className="self-center items-center space-y-6 app-text max-md:px-10">
          <p className="text-5xl items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            ¡Hola!
          </p>

          <h1 className="text-xl items-start leading-relaxed">
            I'm <span className="font-bold">Rowin</span>, and I love creating
            interactive and performant experiences for the web.
          </h1>

          <p className="text-base leading-loose max-w-3xl">
            I specialize in TypeScript and Node.js, but I'm always trying to
            learn new things.
            <br />
            You can find the latest on my journal below{' '}
            <Icon icon="radix-icons:arrow-down" className="align-middle" />
          </p>
        </header>
      </AlignedBlock>

      <AlignedBlock className="py-14 space-y-16">
        <h2 className="text-3xl font-medium app-text">
          Here's what I've been up to lately
          <Icon icon="radix-icons:caret-right" className="align-middle" />
        </h2>

        <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
          {data.entries.map((entry) => (
            <JournalEntryButton key={entry.id} id={entry.id} entry={entry} />
          ))}
        </div>
      </AlignedBlock>
    </main>
  )
}

import { JournalEntryButton } from '~/components/buttons'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { cachifiedImageWithBlur } from '~/utils/cache.server'
import { json } from '@remix-run/node'
import { BlurrableImage } from '~/components/image'
import { RoleTypewriter } from '~/components/typewriter'
import { CenteredBlock } from '~/components/layout/blocks/centered-block'

export async function loader() {
  const mainImage = cachifiedImageWithBlur('/images/lucky-the-dog-coding.png')
  const entries = getAllJournalEntries()

  return json({
    mainImage: await mainImage,
    entries: await entries,
  })
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <CenteredBlock className="relative z-10 py-14 flex flex-col md:flex-row-reverse md:space-y-0 space-y-8">
        <BlurrableImage
          blurDataUrl={data.mainImage.blurDataUrl}
          src={data.mainImage.src}
          width={700}
          height={600}
          alt="Lucky the Cocker Spaniel coding in his laptop"
          className="aspect-[6/7] object-cover h-[26rem] md:h-[28rem] xl:h-[40rem] rounded-2xl transition-all duration-200 ease-out md:ml-8"
        />

        <header className="self-center items-center space-y-6 app-text">
          <h1 className="text-xl items-start leading-tight">
            Hey there! I'm{' '}
            <span className="font-semibold skewed-mark">Rowin</span> 🧑🏻‍💻
          </h1>

          <p className="text-5xl items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            <RoleTypewriter
              roles={[
                'I craft high-quality software',
                'I build accessible experiences',
                'I build interactive interfaces',
                "I'm an expert on React.js",
                'I love mentoring and teaching',
                'I write about web development',
                "I'm a Front-End Developer",
              ]}
            />
          </p>

          <p className="text-xl leading-loose max-w-3xl">
            I love creating interactive and performant experiences for the web.
            <br />
            Oftentimes, I find myself using React and TypeScript, but I'm always
            trying to learn new things. You can find the latest on my journal
            below 👇
          </p>
        </header>
      </CenteredBlock>

      <CenteredBlock>
        <main className="py-14 space-y-16">
          <h2 className="text-3xl font-medium app-text">
            {"Here's what I've been up to lately 🤓"}
          </h2>

          <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
            {data.entries.map((entry) => (
              <JournalEntryButton key={entry.id} id={entry.id} entry={entry} />
            ))}
          </div>
        </main>
      </CenteredBlock>
    </main>
  )
}

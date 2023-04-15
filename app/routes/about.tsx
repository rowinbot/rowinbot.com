import { FullPageContainer, PageContainer } from '~/components/layout'
import { useLoaderData } from '@remix-run/react'
import { getAllJournalEntries, getPageMDXFromSlug } from '~/utils/mdx.server'
import { cachifiedImageWithBlur } from '~/utils/cache.server'
import { json } from '@remix-run/node'
import { BlurrableImage } from '~/components/image'
import { getMdxPageComponent } from '~/utils/mdx'
import { useMemo } from 'react'
import clsx from 'clsx'

interface AboutPictureBlockProps {
  imageBlurDataUrl: string
  imageSrc: string
  imageAlignment: 'start' | 'end'
  imageRatio: 'square' | 'wide' | '4/3' | '3/4' | '9/16'
  title: React.ReactElement
  subtitle?: React.ReactElement
}
function AboutPictureBlock(props: AboutPictureBlockProps) {
  let width: number
  let height: number

  switch (props.imageRatio) {
    case 'square': {
      width = 672
      height = 480
    }
    case 'wide':
    default: {
      width = height = 480
    }
  }

  return (
    <PageContainer
      className={clsx(
        'relative z-10 lg:py-14 py-8 flex flex-col md:space-y-0 space-y-8',
        props.imageAlignment === 'start' ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      <BlurrableImage
        blurDataUrl={props.imageBlurDataUrl}
        src={props.imageSrc}
        width={width}
        height={height}
        align="center"
        alt="Lucky the Cocker Spaniel coding in his laptop"
        className={clsx(
          'dark:brightness-90 saturate-[1.1] dark:saturate-[1] object-cover h-[26rem] md:h-[28rem] xl:h-[30rem] rounded-2xl transition-all duration-200 ease-out',
          props.imageAlignment === 'start' ? 'md:mr-8' : 'md:ml-8',
          props.imageRatio === 'square' && 'aspect-square',
          props.imageRatio === 'wide' && 'aspect-[7/6] lg:aspect-[7/5]',
          props.imageRatio === '4/3' && 'aspect-[4/3]',
          props.imageRatio === '3/4' && 'aspect-[3/4]',
          props.imageRatio === '9/16' && 'aspect-[9/16]'
        )}
      />

      <header className="md:self-center items-center app-text flex-1 flex flex-col ">
        <div
          className={clsx(
            'space-y-2',
            props.imageAlignment === 'start' && 'mr-auto',
            props.imageAlignment === 'end' && 'ml-auto'
          )}
        >
          {props.title}

          {props.subtitle}
        </div>
      </header>
    </PageContainer>
  )
}

function AboutMeFactBlock(props: { title: string; description: string }) {
  return (
    <li className="p-8 rounded-xl bg-blue-50 dark:bg-black border-[1px] border-blue-900 dark:border-slate-800 space-y-6">
      <h3 className="text items-start leading-tight font-bold uppercase">
        {props.title}
      </h3>

      <p className="text-lg font-medium leading-loose dark:text-slate-100 text-slate-700">
        {props.description}
      </p>
    </li>
  )
}

function PersonalRoles() {
  const personalRoles = [
    "Programmer '10 🧑🏻‍💻",
    "Husband '18 🤵🏻",
    'Father of a smart boy 👶',
    'Not really a cyclist 🚴‍♂️',
  ]

  return (
    // TODO: This Fragment is a hack for TypeScript, will have to check how to do this and still make it valid to use as a React component.
    <>
      {personalRoles.map((role, key) => (
        <span key={role}>
          <span className="2xs:whitespace-nowrap">
            {role}
            {key < personalRoles.length - 1 && ' |'}
          </span>
          {' ' /** This is a hack to make the paragraph wrap */}
        </span>
      ))}
    </>
  )
}

export async function loader() {
  const mainImage = cachifiedImageWithBlur('/images/biking.png')
  const programmingImage = cachifiedImageWithBlur('/images/programming.jpg')
  const eatingImage = cachifiedImageWithBlur('/images/burger.png')
  const familyImage = cachifiedImageWithBlur('/images/family.png')
  const entries = getAllJournalEntries()
  const mdx = getPageMDXFromSlug('about')

  return json({
    mainImage: await mainImage,
    programmingImage: await programmingImage,
    eatingImage: await eatingImage,
    familyImage: await familyImage,
    entries: await entries,
    mdx: await mdx,
  })
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()
  const mdxCode = data.mdx.code

  const Mdx = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])

  return (
    <FullPageContainer
      topElement={
        <AboutPictureBlock
          imageBlurDataUrl={data.mainImage.blurDataUrl}
          imageSrc={data.mainImage.src}
          imageRatio="wide"
          imageAlignment="end"
          title={
            <h1 className="text-5xl items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
              Hi, I'm Rowin!
            </h1>
          }
          subtitle={
            <p className="text-xl md:text-2xl leading-loose">
              <PersonalRoles />
            </p>
          }
        />
      }
    >
      <AboutPictureBlock
        imageBlurDataUrl={data.programmingImage.blurDataUrl}
        imageSrc={data.programmingImage.src}
        imageRatio="square"
        imageAlignment="start"
        title={
          <h2 className="text-4xl items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            I'm passionate about software 🧑🏻‍💻
          </h2>
        }
        subtitle={
          <p className="text-xl md:text-2xl leading-loose">
            I love finding practical solutions to complex problems through
            building great user experiences.
          </p>
        }
      />

      <PageContainer className="lg:py-14 py-8">
        <main className="py-14 app-text max-w-[799px] border-[1px] border-blue-900 dark:border-slate-800 dark:bg-black bg-gray-50 rounded-xl ml-auto space-y-2">
          <h2 className="text-4xl px-8 items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            Some sort of Bio
          </h2>

          <div className="space-y-6 text-xl dark:text-slate-100 text-slate-700">
            <Mdx />
          </div>
        </main>
      </PageContainer>

      <AboutPictureBlock
        imageBlurDataUrl={data.eatingImage.blurDataUrl}
        imageSrc={data.eatingImage.src}
        imageRatio="square"
        imageAlignment="end"
        title={
          <h2 className="text-4xl items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            When I'm not coding...
          </h2>
        }
        subtitle={
          <p className="text-xl md:text-2xl leading-loose">
            I'm probably eating 🍔🍔
          </p>
        }
      />

      <AboutPictureBlock
        imageBlurDataUrl={data.familyImage.blurDataUrl}
        imageSrc={data.familyImage.src}
        imageRatio="wide"
        imageAlignment="start"
        title={
          <p className="text-xl md:text-2xl leading-loose">
            Or hanging out with my family 👨‍👩‍👦
          </p>
        }
      />

      <PageContainer>
        <main className="lg:py-14 py-8 app-text space-y-6">
          <h2 className="text-4xl  items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            Facts about me
          </h2>

          <ul className="grid md:grid-cols-2 gap-4">
            <AboutMeFactBlock
              title="I'm dedicated"
              description="Whenever I put my mind on to something, I find it extremely difficult to let go, which can be a double-edge sword sometimes. 🙆🏻‍♂️"
            />

            <AboutMeFactBlock
              title="I love to learn"
              description="Wether I'm working on a project, or having  at 1am, I always try to learn something new, specially when it makes me more effective. 🧐"
            />

            <AboutMeFactBlock
              title="I'm not *only* a dog person"
              description="I love dogs 🐶, in fact I've had 4 over the years, the last one being Lucky, the Cocker Spaniel. But I also love cats! In fact we have 2 (🐈²), named Bella and Mila. I've loved them all a lot. 💕"
            />

            <AboutMeFactBlock
              title="I'm a team-player"
              description="I love working in teams, and I'm always looking for ways to improve the team dynamic. I'm a big believer in the power of collaboration. 🤝"
            />
          </ul>
        </main>
      </PageContainer>
    </FullPageContainer>
  )
}

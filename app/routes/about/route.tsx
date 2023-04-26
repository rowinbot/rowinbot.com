import { useLoaderData } from '@remix-run/react'
import { getPageMDXFromSlug } from '~/utils/mdx.server'
import { cachifiedImageWithBlur } from '~/utils/cache.server'
import { json } from '@remix-run/node'
import { getMdxPageComponent } from '~/utils/mdx'
import { useMemo } from 'react'
import { ImageBlock } from '~/components/layout/blocks/image-block'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { PersonalRoles } from './personal-roles'
import { FactAboutMe } from './fact-about-me'

export async function loader() {
  const mainImage = cachifiedImageWithBlur('/images/biking.png')
  const programmingImage = cachifiedImageWithBlur('/images/programming.jpg')
  const eatingImage = cachifiedImageWithBlur('/images/burger.png')
  const familyImage = cachifiedImageWithBlur('/images/family.png')
  const mdx = getPageMDXFromSlug('about')

  return json({
    mainImage: await mainImage,
    programmingImage: await programmingImage,
    eatingImage: await eatingImage,
    familyImage: await familyImage,
    mdx: await mdx,
  })
}

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>()
  const mdxCode = data.mdx.code

  const Mdx = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])

  return (
    <main>
      <ImageBlock
        imageBlurDataUrl={data.mainImage.blurDataUrl}
        imageSrc={data.mainImage.src}
        imageRatio="wide"
        imageAlignment="end"
        title={
          <h1 className="text-5xl leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            Hi, I'm Rowin!
          </h1>
        }
        subtitle={
          <p className="text-xl md:text-2xl leading-loose">
            <PersonalRoles />
          </p>
        }
      />

      <ImageBlock
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

      <AlignedBlock
        align="right"
        containerClassName="px-0 sm:px-0 md:px-x-sm my-7"
        className="py-14 app-text md:max-w-[735px] border-[1px] border-blue-900 dark:border-slate-800 dark:bg-black bg-gray-50 rounded-xl space-y-2"
      >
        <h2 className="text-4xl px-x sm:px-x-sm items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
          Some sort of Bio
        </h2>

        <div className="space-y-6 text-xl dark:text-slate-100 text-slate-700">
          <Mdx />
        </div>
      </AlignedBlock>

      <ImageBlock
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

      <ImageBlock
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

      <AlignedBlock className="lg:py-14 py-8 app-text space-y-6">
        <h2 className="text-4xl  items-start leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
          Facts about me
        </h2>

        <ul className="grid md:grid-cols-2 gap-4">
          <FactAboutMe
            title="I'm dedicated"
            description="Whenever I put my mind on to something, I find it extremely difficult to let go, which can be a double-edge sword sometimes. 🙆🏻‍♂️"
          />

          <FactAboutMe
            title="I love to learn"
            description="Wether I'm working on a project, or having  at 1am, I always try to learn something new, specially when it makes me more effective. 🧐"
          />

          <FactAboutMe
            title="I'm not *only* a dog person"
            description="I love dogs 🐶, in fact I've had 4 over the years, the last one being Lucky, the Cocker Spaniel. But I also love cats! In fact we have 2 (🐈²), named Bella and Mila. I've loved them all a lot. 💕"
          />

          <FactAboutMe
            title="I'm a team-player"
            description="I love working in teams, and I'm always looking for ways to improve the team dynamic. I'm a big believer in the power of collaboration. 🤝"
          />
        </ul>
      </AlignedBlock>
    </main>
  )
}

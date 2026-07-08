import { useMemo } from 'react'

import * as mainImage from '~/../public/images/biking.png'
import * as eatingImage from '~/../public/images/burger.png'
import * as familyImage from '~/../public/images/family.png'
import * as programmingImage from '~/../public/images/programming.jpg'

import { BlurrableImage } from '~/components/image'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { getMdxPageComponent } from '~/utils/mdx'
import { getPageMDXFromSlug } from '~/utils/mdx.server'

import { FactAboutMe } from './fact-about-me'
import { PersonalRoles } from './personal-roles'

import type { Route } from './+types/about.route'

export async function loader({}: Route.LoaderArgs) {
  const mdx = getPageMDXFromSlug('about')

  return {
    mainImage: mainImage,
    programmingImage: programmingImage,
    eatingImage: eatingImage,
    familyImage: familyImage,
    mdx: await mdx,
  }
}

const facts = [
  {
    title: "I'm dedicated",
    description:
      'Whenever I put my mind on to something, I find it extremely difficult to let go, which can be a double-edge sword sometimes.',
  },
  {
    title: 'I love to learn',
    description:
      "Whether I'm working on a project, or having fun at 1am, I always try to learn something new, specially when it makes me more effective.",
  },
  {
    title: "I'm not *only* a dog person",
    description:
      "I love dogs, in fact I've had 4 over the years, the last one being Lucky, the Cocker Spaniel. But I also love cats! In fact we have 2, named Bella and Mila. I've loved them all a lot.",
  },
  {
    title: "I'm a team-player",
    description:
      "I love working in teams, and I'm always looking for ways to improve the team dynamic. I'm a big believer in the power of collaboration.",
  },
]

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  const mdxCode = loaderData.mdx.code
  const Mdx = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])

  return (
    <main>
      <AlignedBlock className="py-16 lg:py-24">
        <p className="font-mono text-label uppercase tracking-[0.2em] text-mark">
          About
        </p>
        <h1 className="mt-3 font-display text-d1 font-black uppercase tracking-tight text-ink">
          About
        </h1>
        <p className="mt-5 max-w-2xl font-mono text-meta leading-relaxed text-ink-soft">
          Software developer, cyclist*, and proud dad — building interactive
          experiences for the web since 2010.
        </p>
        <div className="mt-8">
          <PersonalRoles />
        </div>
      </AlignedBlock>

      <AlignedBlock className="pb-16 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-sm border border-rule">
            <BlurrableImage
              blurDataUrl={loaderData.mainImage.blurDataUri}
              src={loaderData.mainImage.imageUri}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              alt="Rowin biking"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-d3 font-black uppercase tracking-tight text-ink">
              Bio
            </h2>
            <div className="space-y-4 border-l-2 border-accent pl-6 text-ink">
              <Mdx />
            </div>
          </div>
        </div>
      </AlignedBlock>

      <AlignedBlock className="pb-16 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="font-display text-d3 font-black uppercase tracking-tight text-ink">
              Passionate about software
            </h2>
            <p className="font-mono text-meta leading-relaxed text-ink-soft">
              I love finding practical solutions to complex problems through
              building great user experiences.
            </p>
          </div>
          <div className="overflow-hidden rounded-sm border border-rule">
            <BlurrableImage
              blurDataUrl={loaderData.programmingImage.blurDataUri}
              src={loaderData.programmingImage.imageUri}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              alt="Rowin programming"
            />
          </div>
        </div>
      </AlignedBlock>

      <AlignedBlock className="pb-16 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 overflow-hidden rounded-sm border border-rule lg:order-1">
            <BlurrableImage
              blurDataUrl={loaderData.eatingImage.blurDataUri}
              src={loaderData.eatingImage.imageUri}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              alt="Rowin eating a burger"
            />
          </div>
          <div className="order-1 space-y-4 lg:order-2">
            <h2 className="font-display text-d3 font-black uppercase tracking-tight text-ink">
              When I'm not coding...
            </h2>
            <p className="font-mono text-meta leading-relaxed text-ink-soft">
              I'm probably eating burgers, or hanging out with my family.
            </p>
          </div>
        </div>
      </AlignedBlock>

      <AlignedBlock className="pb-16 lg:pb-24">
        <div className="overflow-hidden rounded-sm border border-rule">
          <BlurrableImage
            blurDataUrl={loaderData.familyImage.blurDataUri}
            src={loaderData.familyImage.imageUri}
            width={1920}
            height={1080}
            className="aspect-[16/9] w-full object-cover"
            alt="Rowin with family"
          />
        </div>
      </AlignedBlock>

      <AlignedBlock className="pb-24">
        <h2 className="mb-8 font-display text-d3 font-black uppercase tracking-tight text-ink">
          Facts about me
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {facts.map((fact, i) => (
            <FactAboutMe
              key={fact.title}
              index={i}
              title={fact.title}
              description={fact.description}
            />
          ))}
        </ul>
      </AlignedBlock>
    </main>
  )
}

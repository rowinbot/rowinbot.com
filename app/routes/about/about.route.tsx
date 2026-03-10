import { getPageMDXFromSlug } from '~/utils/mdx.server'
import { getMdxPageComponent } from '~/utils/mdx'
import { useMemo } from 'react'
import { BlurrableImage } from '~/components/image'
import { PersonalRoles } from './personal-roles'
import { FactAboutMe } from './fact-about-me'
import { motion } from 'framer-motion'
import { FloatingDots, CyberDivider, DiagonalAccent, DataStream, HudCorners } from '~/components/cyber-decorations'

import * as mainImage from '~/../public/images/biking.png'
import * as programmingImage from '~/../public/images/programming.jpg'
import * as eatingImage from '~/../public/images/burger.png'
import * as familyImage from '~/../public/images/family.png'

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

export default function IndexRoute({ loaderData }: Route.ComponentProps) {
  const mdxCode = loaderData.mdx.code

  const Mdx = useMemo(() => getMdxPageComponent(mdxCode), [mdxCode])
  return (
    <main>
      {/* Hero — full viewport image */}
      <section className="relative h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <BlurrableImage
            blurDataUrl={loaderData.mainImage.blurDataUri}
            src={loaderData.mainImage.imageUri}
            width={1920}
            height={1080}
            alt="Rowin biking"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-x sm:px-x-sm text-center">
          <RevealOnScroll>
            <h1 className="font-cyber text-[clamp(4.5rem,3rem_+_8vw,10rem)] font-black uppercase tracking-tight text-white leading-[0.85] [text-shadow:_0_4px_40px_rgb(0_0_0_/_50%)]">
              Hi, I'm{' '}
              <span className="text-cyber-cyan [text-shadow:_0_0_40px_rgb(var(--cyber-cyan)_/_40%)]">
                Rowin
              </span>
              !
            </h1>
            <div className="mt-10">
              <PersonalRoles />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Passionate about software */}
      <section className="relative py-24 lg:py-40">
        <FloatingDots />
        <DiagonalAccent side="right" className="top-16" />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealOnScroll>
              <div className="group aspect-square overflow-hidden rounded-sm">
                <BlurrableImage
                  blurDataUrl={loaderData.programmingImage.blurDataUri}
                  src={loaderData.programmingImage.imageUri}
                  width={800}
                  height={800}
                  alt="Rowin programming"
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="space-y-6">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2.25rem,1.25rem_+_4.5vw,4rem)] font-black uppercase tracking-wide text-cyber-text leading-tight">
                  Passionate about{' '}
                  <span className="text-cyber-cyan">software</span>
                </h2>
                <p className="text-[clamp(1.25rem,1.1rem_+_0.5vw,1.5rem)] leading-relaxed text-cyber-text-dim font-mono">
                  I love finding practical solutions to complex problems through
                  building great user experiences.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="relative py-24 lg:py-40 border-t border-cyber-border">
        <DiagonalAccent side="left" className="top-24" />
        <div className="max-w-4xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2.25rem,1.25rem_+_4.5vw,4rem)] font-black uppercase tracking-wide text-cyber-text">
                  Bio_
                </h2>
              </div>
              <div className="border-l-2 border-cyber-cyan/30 pl-8 space-y-6 text-[clamp(1.25rem,1.1rem_+_0.5vw,1.5rem)] text-cyber-text leading-relaxed">
                <Mdx />
              </div>
            </div>
          </RevealOnScroll>
          <CyberDivider className="mt-16" />
        </div>
      </section>

      {/* When I'm not coding */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealOnScroll>
              <div className="space-y-6">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2.25rem,1.25rem_+_4.5vw,4rem)] font-black uppercase tracking-wide text-cyber-text leading-tight">
                  When I'm not{' '}
                  <span className="text-cyber-cyan">coding</span>...
                </h2>
                <p className="text-[clamp(1.25rem,1.1rem_+_0.5vw,1.5rem)] leading-relaxed text-cyber-text-dim font-mono">
                  I'm probably eating burgers.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="group aspect-square overflow-hidden rounded-sm">
                <BlurrableImage
                  blurDataUrl={loaderData.eatingImage.blurDataUri}
                  src={loaderData.eatingImage.imageUri}
                  width={800}
                  height={800}
                  alt="Rowin eating a burger"
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Family — full-width image banner */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <BlurrableImage
            blurDataUrl={loaderData.familyImage.blurDataUri}
            src={loaderData.familyImage.imageUri}
            width={1920}
            height={1080}
            alt="Rowin with family"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <p className="font-cyber text-[clamp(1.875rem,1rem_+_3.5vw,3rem)] font-black uppercase tracking-wide text-white leading-tight [text-shadow:_0_2px_20px_rgb(0_0_0_/_40%)]">
              Or hanging out with my{' '}
              <span className="text-cyber-cyan [text-shadow:_0_0_30px_rgb(var(--cyber-cyan)_/_30%)]">
                family
              </span>
              .
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Facts about me */}
      <section className="relative py-24 lg:py-40 border-t border-cyber-border">
        <FloatingDots />
        <HudCorners className="hidden md:block m-8" />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <div className="space-y-4 mb-14 lg:mb-20">
              <div className="w-16 h-px bg-cyber-cyan" />
              <h2 className="font-cyber text-[clamp(2.25rem,1.25rem_+_4.5vw,4rem)] font-black uppercase tracking-wide text-cyber-text">
                Facts about me
              </h2>
              <DataStream className="mt-2" />
            </div>
          </RevealOnScroll>

          <ul className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <RevealOnScroll delay={0}>
              <FactAboutMe
                index={0}
                title="I'm dedicated"
                description="Whenever I put my mind on to something, I find it extremely difficult to let go, which can be a double-edge sword sometimes."
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <FactAboutMe
                index={1}
                title="I love to learn"
                description="Whether I'm working on a project, or having fun at 1am, I always try to learn something new, specially when it makes me more effective."
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <FactAboutMe
                index={2}
                title="I'm not *only* a dog person"
                description="I love dogs, in fact I've had 4 over the years, the last one being Lucky, the Cocker Spaniel. But I also love cats! In fact we have 2, named Bella and Mila. I've loved them all a lot."
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <FactAboutMe
                index={3}
                title="I'm a team-player"
                description="I love working in teams, and I'm always looking for ways to improve the team dynamic. I'm a big believer in the power of collaboration."
              />
            </RevealOnScroll>
          </ul>
        </div>
      </section>
    </main>
  )
}

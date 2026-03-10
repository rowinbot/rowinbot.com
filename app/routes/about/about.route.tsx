import { getPageMDXFromSlug } from '~/utils/mdx.server'
import { getMdxPageComponent } from '~/utils/mdx'
import { useMemo } from 'react'
import { BlurrableImage } from '~/components/image'
import { CyberImage } from '~/components/cyber-image'
import { PersonalRoles } from './personal-roles'
import { FactAboutMe } from './fact-about-me'
import { GlitchText } from '~/components/glitch-text'
import { motion } from 'framer-motion'
import {
  FloatingDots,
  CyberDivider,
  DiagonalAccent,
  DataStream,
  HudCorners,
  SignalBars,
} from '~/components/cyber-decorations'

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
      {/* ============ HERO ============ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden cyber-grid-bg">
        <FloatingDots />
        <DiagonalAccent side="right" className="top-16" />
        <DiagonalAccent side="left" className="bottom-10" />

        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <DataStream />
            <h1 className="font-cyber text-[clamp(4rem,2rem_+_8vw,10rem)] font-black uppercase tracking-tight text-cyber-text neon-text-subtle leading-[0.85] mt-4">
              <GlitchText text="ABOUT_" />
            </h1>
            <p className="font-mono text-cyber-text-dim text-[clamp(1rem,0.9rem_+_0.5vw,1.25rem)] leading-relaxed mt-6 max-w-2xl">
              Software developer, cyclist*, and proud dad — building
              interactive experiences for the web since 2010.
            </p>
            <div className="mt-8">
              <PersonalRoles />
            </div>
            <SignalBars className="mt-8" />
          </RevealOnScroll>
        </div>

        <HudCorners className="hidden lg:block m-8" />
      </section>

      {/* ============ BIO ============ */}
      <section className="relative py-20 lg:py-32">
        <DiagonalAccent side="right" className="top-16" />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealOnScroll>
              <CyberImage
                blurDataUrl={loaderData.mainImage.blurDataUri}
                src={loaderData.mainImage.imageUri}
                width={800}
                height={600}
                alt="Rowin biking"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <div className="space-y-6">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2rem,1.25rem_+_3.5vw,3.5rem)] font-black uppercase tracking-wide text-cyber-text leading-tight">
                  Bio<span className="text-cyber-cyan">_</span>
                </h2>
                <div className="border-l-2 border-cyber-cyan/30 pl-6 space-y-4 text-[clamp(1rem,0.9rem_+_0.4vw,1.25rem)] text-cyber-text leading-relaxed">
                  <Mdx />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
        <CyberDivider />
      </div>

      {/* ============ PASSIONATE ABOUT SOFTWARE ============ */}
      <section className="relative py-20 lg:py-32">
        <FloatingDots />
        <DiagonalAccent side="left" className="top-24" />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealOnScroll>
              <div className="space-y-6">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2rem,1.25rem_+_3.5vw,3.5rem)] font-black uppercase tracking-wide text-cyber-text leading-tight">
                  Passionate about{' '}
                  <span className="text-cyber-cyan neon-text-cyan">
                    software
                  </span>
                </h2>
                <p className="text-[clamp(1rem,0.9rem_+_0.4vw,1.25rem)] leading-relaxed text-cyber-text-dim font-mono">
                  I love finding practical solutions to complex problems through
                  building great user experiences.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <CyberImage
                blurDataUrl={loaderData.programmingImage.blurDataUri}
                src={loaderData.programmingImage.imageUri}
                width={800}
                height={600}
                alt="Rowin programming"
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
        <CyberDivider />
      </div>

      {/* ============ WHEN I'M NOT CODING ============ */}
      <section className="relative py-20 lg:py-32">
        <DiagonalAccent side="right" className="top-20" />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealOnScroll className="order-2 lg:order-1">
              <CyberImage
                blurDataUrl={loaderData.eatingImage.blurDataUri}
                src={loaderData.eatingImage.imageUri}
                width={800}
                height={600}
                alt="Rowin eating a burger"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.15} className="order-1 lg:order-2">
              <div className="space-y-6">
                <div className="w-16 h-px bg-cyber-cyan" />
                <h2 className="font-cyber text-[clamp(2rem,1.25rem_+_3.5vw,3.5rem)] font-black uppercase tracking-wide text-cyber-text leading-tight">
                  When I'm not{' '}
                  <span className="text-cyber-cyan neon-text-cyan">
                    coding
                  </span>
                  ...
                </h2>
                <p className="text-[clamp(1rem,0.9rem_+_0.4vw,1.25rem)] leading-relaxed text-cyber-text-dim font-mono">
                  I'm probably eating burgers.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ FAMILY ============ */}
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgb(var(--cyber-cyan) / 0.02) 3px, rgb(var(--cyber-cyan) / 0.02) 4px)',
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <p className="font-cyber text-[clamp(1.875rem,1rem_+_3.5vw,3rem)] font-black uppercase tracking-wide text-white leading-tight">
              Or hanging out with my{' '}
              <span className="text-cyber-cyan neon-text-cyan-strong">
                family
              </span>
              .
            </p>
          </RevealOnScroll>
        </div>
        <HudCorners className="hidden lg:block m-6" />
      </section>

      {/* ============ FACTS ============ */}
      <section className="relative py-20 lg:py-32">
        <FloatingDots />
        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <div className="space-y-4 mb-12 lg:mb-16">
              <div className="w-16 h-px bg-cyber-cyan" />
              <h2 className="font-cyber text-[clamp(2rem,1.25rem_+_3.5vw,3.5rem)] font-black uppercase tracking-wide text-cyber-text">
                Facts about me<span className="text-cyber-cyan">_</span>
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
        <HudCorners className="hidden lg:block m-8" />
      </section>
    </main>
  )
}

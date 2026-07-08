import { Icon } from '@iconify-icon/react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

import * as mainImage from '~/../public/images/rowin-2024.jpg'

import { JournalEntryButton } from '~/components/buttons/journal-entry-button'
import { HudCorners, FloatingDots, CyberDivider, DiagonalAccent, SignalBars } from '~/components/cyber-decorations'
import { GlitchText } from '~/components/glitch-text'
import { HolographicCard } from '~/components/holographic-card'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { CyberScene } from '~/components/three/cyber-scene'
import { getAllJournalEntries } from '~/utils/mdx.server'


import type { Route } from './+types/home.route'

export async function loader({}: Route.LoaderArgs) {
  const entries = getAllJournalEntries()

  return {
    mainImage: mainImage,
    entries: await entries,
  }
}

// Fade-in + slide-up on scroll into view
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
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: image moves slower, text faster
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main>
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* 3D Background */}
        <CyberScene className="absolute inset-0 z-0" />

        {/* Content layer */}
        <motion.div
          className="relative z-10 w-full"
          style={{ opacity: heroOpacity }}
        >
          <AlignedBlock className="py-20 flex flex-col md:flex-row md:items-center gap-10 lg:gap-16">
            {/* Hero Copy — bold and impactful */}
            <motion.header
              className="self-center space-y-8 text-cyber-text flex-1 max-md:px-6"
              style={{ y: textY }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-cyber text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-cyber-text neon-text-subtle">
                <GlitchText text="HOLA_" />
              </p>

              <h1 className="text-cyber-text text-xl sm:text-2xl leading-relaxed max-w-lg">
                I'm <span className="text-cyber-cyan font-bold">Rowin</span>,
                and I love creating interactive and performant experiences for
                the web.
              </h1>

              <p className="text-cyber-text-dim text-base font-mono leading-loose max-w-xl">
                I specialize in TypeScript and Node.js, but I'm always trying
                to learn new things.
              </p>
            </motion.header>

            {/* Profile Card — holographic, parallax, below text on mobile */}
            <motion.div
              className="relative shrink-0 w-[60%] max-w-[16rem] self-center md:self-auto md:w-[35%] md:max-w-none lg:w-[38%]"
              style={{ y: imageY }}
            >
              <HolographicCard
                imageSrc={loaderData.mainImage.imageUri}
                imageBlurDataUrl={loaderData.mainImage.blurDataUri}
                imageAlt="Rowin Hernandez"
              />
            </motion.div>
          </AlignedBlock>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ opacity: heroOpacity }}
        >
          <span className="text-cyber-cyan font-cyber text-xs uppercase tracking-widest">
            scroll
          </span>
          <motion.div
            className="w-px h-8 bg-cyber-cyan/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ============ JOURNAL ENTRIES ============ */}
      <section className="relative border-t border-cyber-border">
        <FloatingDots />
        <DiagonalAccent side="left" className="top-20" />
        <DiagonalAccent side="right" className="bottom-32" />

        <AlignedBlock className="py-20 space-y-16">
          <RevealOnScroll>
            <div className="space-y-4">
              <div className="w-20 h-px bg-cyber-cyan" />
              <h2 className="font-cyber text-3xl sm:text-4xl lg:text-5xl uppercase tracking-widest text-cyber-text font-black">
                RECENT_
                <br className="sm:hidden" />
                TRANSMISSIONS
              </h2>
              <SignalBars className="mt-3" />
            </div>
          </RevealOnScroll>

          <CyberDivider label="feed" />

          <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
            {loaderData.entries.map((entry, i) => (
              <RevealOnScroll key={entry.id} delay={i * 0.1}>
                <JournalEntryButton id={entry.id} entry={entry} />
              </RevealOnScroll>
            ))}
          </div>
        </AlignedBlock>

        <HudCorners className="hidden md:block m-6" />
      </section>
    </main>
  )
}

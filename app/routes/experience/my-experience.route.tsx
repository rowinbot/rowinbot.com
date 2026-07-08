import { motion } from 'framer-motion'

import * as fanfestImage from '~/../public/experience/fanfest.png'
import * as meetingPointImage from '~/../public/experience/meeting-point.png'
import * as messyngerImage from '~/../public/experience/messynger.png'
import * as voxelImage from '~/../public/experience/voxel.png'

import {
  FloatingDots,
  CyberDivider,
  DiagonalAccent,
  SignalBars,
  DataStream,
  HudCorners,
} from '~/components/cyber-decorations'
import { GlitchText } from '~/components/glitch-text'

import { JobBlock } from './job-block'


import type { Route } from './+types/my-experience.route'

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

export async function loader({}: Route.LoaderArgs) {
  return {
    voxelImage: voxelImage,
    messyngerImage: messyngerImage,
    fanfestImage: fanfestImage,
    meetingPointImage: meetingPointImage,
  }
}

export default function ExperienceRoute({
  loaderData,
}: Route.ComponentProps) {
  const jobs = [
    {
      clientOrProjectName: 'Kalebtec',
      name: 'Product Engineering Studio',
      description:
        'Co-founded a two-person senior software studio — I lead the engineering, my co-founder Mari runs operations. Current focus: AI agent infrastructure, including browxai, an MCP-native, model-agnostic browser-control server for AI agents, and a Rust toolchain for structured, machine-addressable agent context.',
      skills: [
        'TypeScript',
        'Rust',
        'Node.js',
        'React',
        'MCP',
        'Playwright',
        'Zod',
        'PostgreSQL',
        'Serverless',
        'Fly.io',
      ],
    },
    {
      image: {
        blurDataUrl: loaderData.fanfestImage.blurDataUri,
        src: loaderData.fanfestImage.imageUri,
        alignment: 'start' as const,
      },
      clientOrProjectName: 'Fanfest',
      name: 'Live Fan-Engagement Platform',
      description:
        'Planned and architected v3 of a live fan-engagement platform for clubs and rights holders like PSG, Manchester City, the 49ers and AC Milan — and led a team of six, including designing the technical hiring process. Built the live-broadcast pipeline (AWS Elemental MediaLive with HLS/LL-HLS ladders, MediaPackage + CloudFront delivery, and an Amazon Chime interactive layer) serving tens of thousands of fans per live event.',
      skills: [
        'Vue',
        'TypeScript',
        'Node.js',
        'GraphQL',
        'Prisma',
        'WebRTC',
        'Socket.IO',
        'MongoDB',
        'Redis',
        'AWS MediaLive',
        'AWS MediaPackage',
        'AWS CloudFront',
        'AWS Chime',
        'Storybook',
        'Playwright',
        'TailwindCSS',
      ],
    },
    {
      clientOrProjectName: 'WSC Sports',
      name: 'AI Sports-Video Platform',
      description:
        "Owned the AI Voiceover domain of Clipro — WSC Sports' AI video platform, trusted by 550+ rights holders including the NBA, NHL, LaLiga and DAZN — re-architecting it around an async, job-based model with real-time completion notifications and recovery for in-flight jobs. Also built the article-to-video editor UX and led its frontend tech review across scoping, estimates and FE/BE contracts.",
      skills: [
        'React',
        'TypeScript',
        'Redux',
        'Jest',
        'Playwright',
        'Storybook',
        'CSS',
      ],
    },
    {
      image: {
        blurDataUrl: loaderData.voxelImage.blurDataUri,
        src: loaderData.voxelImage.imageUri,
        alignment: 'end' as const,
      },
      clientOrProjectName: 'Voxel',
      name: '3D Dental Imaging',
      description:
        'Worked on the 3D frontend of a browser-based dental-imaging platform — interaction and rendering for medical volumes, sliced meshes, nerve-canal geometry and implants with Vue, Three.js and WebGL2, backed by a custom Rust/WASM geometry pipeline. Also built the automated visual-regression infrastructure that keeps the 3D output correct: AVA and Puppeteer with pixelmatch image diffing against cloud baselines.',
      skills: [
        'Vue',
        'Three.js',
        'WebGL2',
        'Rust',
        'WASM',
        'AVA.js',
        'Puppeteer',
        'Docker',
        'AWS',
      ],
    },
    {
      clientOrProjectName: 'Sabanto',
      name: 'Autonomous-Agriculture Mission Control',
      description:
        'Built the geospatial frontend of Mission Control, the web app operators use to plan and monitor autonomous tractor missions in real time — a reusable deck.gl/Mapbox map-layer system rendering tractors, field boundaries, coverage plans and route passes as composable layers, with Turf.js/GeoJSON workflows for boundary handling and geometry simplification, plus mobile prototypes in React Native and Flutter.',
      skills: [
        'React',
        'TypeScript',
        'deck.gl',
        'Mapbox',
        'Turf.js',
        'React Native',
        'Flutter',
        'Storybook',
      ],
    },
    {
      clientOrProjectName: 'Limbic',
      name: 'Mental-Health Access Platform',
      description:
        'Senior full-stack engineer on an AI chatbot platform that shortens the path to mental-health care. Designed "time-travel" editing that lets patients revise earlier answers and safely rolls back downstream side-effects, and hardened safety-critical flows with a queued, retrying notification system so urgent cases always reach care.',
      skills: [
        'Node.js',
        'React',
        'TypeScript',
        'GraphQL',
        'MongoDB',
        'Redis',
        'Jest',
        'Playwright',
      ],
    },
    {
      image: {
        blurDataUrl: loaderData.meetingPointImage.blurDataUri,
        src: loaderData.meetingPointImage.imageUri,
        alignment: 'start' as const,
      },
      clientOrProjectName: 'Meeting Point Canarias',
      name: 'Tourism E-Commerce',
      description:
        'Lead the development of a web app to book holidays tours focused on the Canary Islands market for european customers with a custom CMS.',
      skills: [
        'React',
        'Remix.run',
        'Node.js',
        'TailwindCSS',
        'I18next',
        'LogRocket',
        'MSW',
      ],
    },
    {
      image: {
        blurDataUrl: loaderData.messyngerImage.blurDataUri,
        src: loaderData.messyngerImage.imageUri,
        alignment: 'end' as const,
      },
      clientOrProjectName: 'Messynger',
      name: 'Customer Support Platform',
      description:
        'Develop integrations with social media platforms (WhatsApp, Messenger, Slack, MS Teams) to enhance reaching out to customers for support teams using message queues and platform adapters to delegate message passing between platforms.',
      skills: [
        'Vue',
        'Docker',
        'Kubernetes',
        'IBM Cloud',
        'WhatsApp Web',
        'Figma',
        'Strapi',
        'Nuxt.js',
        'Slack',
        'Trello',
        'AWS',
      ],
    },
  ]

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden cyber-grid-bg">
        <FloatingDots />
        <DiagonalAccent side="left" className="top-16" />
        <DiagonalAccent side="right" className="bottom-10" />

        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <DataStream />
            <h1 className="font-cyber text-[clamp(2rem,0.5rem_+_8vw,10rem)] font-black uppercase tracking-tight text-cyber-text neon-text-subtle leading-[0.85] mt-4">
              <GlitchText text="EXPERIENCE_" />
            </h1>
            <p className="font-mono text-cyber-text-dim text-[clamp(1rem,0.9rem_+_0.5vw,1.25rem)] leading-relaxed mt-6 max-w-2xl">
              Check out my recent work and the skills I've picked up along the
              way.
            </p>
            <SignalBars className="mt-8" />
          </RevealOnScroll>
        </div>

        <HudCorners className="hidden lg:block m-8" />
      </section>

      {/* ============ JOB ENTRIES ============ */}
      <section className="relative py-20 lg:py-32">
        <FloatingDots />
        <DiagonalAccent side="right" className="top-10" />
        <DiagonalAccent side="left" className="bottom-20" />

        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          {jobs.map((job, i) => (
            <RevealOnScroll key={job.clientOrProjectName}>
              <JobBlock
                index={i}
                image={job.image}
                clientOrProjectName={job.clientOrProjectName}
                name={job.name}
                description={job.description}
                skills={job.skills}
              />
              {i < jobs.length - 1 && (
                <CyberDivider className="my-12 lg:my-20" />
              )}
            </RevealOnScroll>
          ))}
        </div>

        <HudCorners className="hidden lg:block m-8" />
      </section>

      {/* ============ KALEBTEC BRIDGE ============ */}
      <section className="relative py-20 lg:py-28 overflow-hidden cyber-grid-bg">
        <DiagonalAccent side="left" className="top-10" />

        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <RevealOnScroll>
            <p className="font-cyber text-sm uppercase tracking-widest text-cyber-cyan font-bold">
              Want this built for real?
            </p>
            <p className="font-mono text-[clamp(1rem,0.925rem_+_0.25vw,1.125rem)] leading-relaxed text-cyber-text-dim mt-4 max-w-2xl">
              I take engagements through my studio,{' '}
              <a
                href="https://kalebtec.com?ref=rowinbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan underline underline-offset-4 transition-all duration-300 hover:neon-text-cyan"
              >
                Kalebtec
              </a>{' '}
              — my engineering, plus a studio's operations and continuity.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  )
}

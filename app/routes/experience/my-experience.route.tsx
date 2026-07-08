import * as fanfestImage from '~/../public/experience/fanfest.png'
import * as meetingPointImage from '~/../public/experience/meeting-point.png'
import * as messyngerImage from '~/../public/experience/messynger.png'
import * as voxelImage from '~/../public/experience/voxel.png'

import { KalebtecBridge } from '~/components/bridge'
import { SectionHeader } from '~/components/ui'

import { JobBlock } from './job-block'

import type { Route } from './+types/my-experience.route'

export async function loader(_: Route.LoaderArgs) {
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
        'Co-founded a two-person senior software studio — I lead the engineering, my partner in crime Mari runs operations. Current focus: AI agent infrastructure, including browxai, an MCP-native, model-agnostic browser-control server for AI agents, and a Rust toolchain for structured, machine-addressable agent context.',
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
    <main id="main" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <section
        aria-labelledby="experience-title"
        className="pt-[clamp(2.125rem,5vw,4rem)]"
      >
        <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
          Experience
        </p>
        <h1
          id="experience-title"
          className="m-0 font-display text-d1 font-black tracking-[-0.02em] text-ink"
        >
          Experience
        </h1>
        <p className="mt-5 max-w-[46ch] font-display text-[clamp(1.0625rem,2vw,1.375rem)] font-bold leading-snug text-ink">
          The work, strongest first — live media, AI agent infrastructure, and
          the complex product frontends in between.
        </p>
      </section>

      <section
        aria-labelledby="work-heading"
        className="pt-[clamp(2.5rem,6vw,4.5rem)]"
      >
        <SectionHeader title="Selected work" id="work-heading" />

        {jobs.map((job, i) => (
          <div key={job.clientOrProjectName}>
            <JobBlock
              index={i}
              image={job.image}
              clientOrProjectName={job.clientOrProjectName}
              name={job.name}
              description={job.description}
              skills={job.skills}
            />
            {i < jobs.length - 1 && (
              <hr className="my-8 border-t border-dashed border-rule lg:my-12" />
            )}
          </div>
        ))}
      </section>

      <KalebtecBridge />
    </main>
  )
}

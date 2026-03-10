import { motion } from 'framer-motion'
import { BlurrableImage } from '~/components/image'
import { JobBlock } from './job-block'
import { FloatingDots, CyberDivider, DiagonalAccent, SignalBars } from '~/components/cyber-decorations'

import * as mainImage from '~/../public/images/professional.jpg'
import * as voxelImage from '~/../public/experience/voxel.png'
import * as messyngerImage from '~/../public/experience/messynger.png'
import * as fanfestImage from '~/../public/experience/fanfest.png'
import * as meetingPointImage from '~/../public/experience/meeting-point.png'

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
    mainImage: mainImage,
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
      imageBlurDataUrl: loaderData.fanfestImage.blurDataUri,
      imageSrc: loaderData.fanfestImage.imageUri,
      imageAlignment: 'start' as const,
      clientOrProjectName: 'Fanfest',
      name: 'Streaming Platform',
      description:
        'Lead the development of a real-time streaming platform for fan clubs to engage with the fans on stream with gated shows.',
      skills: [
        'Vue',
        'Node.js',
        'WebRTC',
        'GraphQL',
        'Apollo',
        'TypeScript',
        'Socket.IO',
        'MongoDB',
        'Redis',
        'Storybook',
        'Playwright',
        'Parse Platform',
        'PhenixRTS',
        'GCP App Engine',
        'AWS S3',
        'AWS MediaConvert',
        'AWS SNS',
        'AWS Chime',
        'Vuetify',
        'TailwindCSS',
        'SASS',
        'LogRocket',
        'Amplify',
        'Vue-i18n',
      ],
    },
    {
      imageBlurDataUrl: loaderData.meetingPointImage.blurDataUri,
      imageSrc: loaderData.meetingPointImage.imageUri,
      imageAlignment: 'end' as const,
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
      imageBlurDataUrl: loaderData.voxelImage.blurDataUri,
      imageSrc: loaderData.voxelImage.imageUri,
      imageAlignment: 'start' as const,
      clientOrProjectName: 'Voxel',
      name: 'Render Tests System',
      description:
        'Research and architect a visual regression tests system for a complex 3D dental imaging Vue.js app with failure detection by quadrant grouping and reporting via team communication channels.',
      skills: [
        'AVA.js',
        'Vue',
        'Puppeteer',
        'Docker',
        'Slack',
        'Trello',
        'AWS',
        'MS Teams Extensions',
        'React',
      ],
    },
    {
      imageBlurDataUrl: loaderData.messyngerImage.blurDataUri,
      imageSrc: loaderData.messyngerImage.imageUri,
      imageAlignment: 'end' as const,
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
      {/* Hero — full viewport image */}
      <section className="relative h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <BlurrableImage
            blurDataUrl={loaderData.mainImage.blurDataUri}
            src={loaderData.mainImage.imageUri}
            width={1920}
            height={1080}
            alt="Professional workspace"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-x sm:px-x-sm text-center">
          <RevealOnScroll>
            <h1 className="font-cyber text-[clamp(3.75rem,2rem_+_7vw,8rem)] font-black uppercase tracking-tight text-white leading-[0.85] [text-shadow:_0_4px_40px_rgb(0_0_0_/_50%)]">
              Experience
              <br />
              <span className="text-cyber-cyan [text-shadow:_0_0_40px_rgb(var(--cyber-cyan)_/_40%)]">
                &
              </span>{' '}
              Skills
            </h1>
            <p className="font-mono text-white/70 text-[clamp(1.125rem,1rem_+_0.4vw,1.25rem)] leading-relaxed mt-8 max-w-xl mx-auto [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
              Check my skills & my recent work
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Job entries */}
      <section className="relative py-20 lg:py-32">
        <FloatingDots />
        <DiagonalAccent side="right" className="top-10" />
        <DiagonalAccent side="left" className="bottom-20" />

        <div className="max-w-7xl mx-auto px-x sm:px-x-sm">
          <SignalBars className="mb-10 justify-center" />

          {jobs.map((job, i) => (
            <RevealOnScroll key={job.clientOrProjectName}>
              <JobBlock
                index={i}
                imageBlurDataUrl={job.imageBlurDataUrl}
                imageSrc={job.imageSrc}
                imageAlignment={job.imageAlignment}
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
      </section>
    </main>
  )
}

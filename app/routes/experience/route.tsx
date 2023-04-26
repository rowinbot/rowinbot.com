import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ImageBlock } from '~/components/layout/blocks/image-block'
import { cachifiedImageWithBlur } from '~/utils/cache.server'
import { JobBlock } from './job-block'

export async function loader() {
  const mainImage = cachifiedImageWithBlur('/images/professional.jpg')
  const voxelImage = cachifiedImageWithBlur('/experience/voxel.png')
  const messyngerImage = cachifiedImageWithBlur('/experience/messynger.png')
  const fanfestImage = cachifiedImageWithBlur('/experience/fanfest.png')
  const meetingPointImage = cachifiedImageWithBlur(
    '/experience/meeting-point.png'
  )

  return json({
    mainImage: await mainImage,
    voxelImage: await voxelImage,
    messyngerImage: await messyngerImage,
    fanfestImage: await fanfestImage,
    meetingPointImage: await meetingPointImage,
  })
}

export default function ExperienceRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <ImageBlock
        imageBlurDataUrl={data.mainImage.blurDataUrl}
        imageSrc={data.mainImage.src}
        imageRatio="square"
        imageAlignment="end"
        title={
          <h1 className="text-5xl leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
            Experience and skills 💪
          </h1>
        }
        subtitle={
          <p className="text-xl md:text-2xl leading-loose">
            Check my skills & my recent work
          </p>
        }
      />

      <JobBlock
        imageBlurDataUrl={data.fanfestImage.blurDataUrl}
        imageSrc={data.fanfestImage.src}
        imageAlignment="start"
        clientOrProjectName="Fanfest"
        name="Streaming Platform"
        description={
          'Lead the development of a real-time streaming platform for fan clubs to engage with the fans on stream with gated shows.'
        }
        skills={[
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
        ]}
      />

      <JobBlock
        imageBlurDataUrl={data.meetingPointImage.blurDataUrl}
        imageSrc={data.meetingPointImage.src}
        imageAlignment="end"
        clientOrProjectName="Meeting Point Canarias"
        name="Tourism E-Commerce"
        description="Lead the development of a web app to book holidays tours focused on the Canary Islands market for european customers with a custom CMS."
        skills={[
          'React',
          'Remix.run',
          'Node.js',
          'TailwindCSS',
          'I18next',
          'LogRocket',
          'MSW',
        ]}
      />

      <JobBlock
        imageBlurDataUrl={data.voxelImage.blurDataUrl}
        imageSrc={data.voxelImage.src}
        imageAlignment="start"
        clientOrProjectName="Voxel"
        name="Render Tests System"
        description="Research and architect a visual regression tests system for a complex 3D dental imaging Vue.js app with failure detection by quadrant grouping and reporting via team communication channels."
        skills={[
          'AVA.js',
          'Vue',
          'Puppeteer',
          'Docker',
          'Slack',
          'Trello',
          'AWS',
          'MS Teams Extensions',
          'React',
        ]}
      />

      <JobBlock
        imageBlurDataUrl={data.messyngerImage.blurDataUrl}
        imageSrc={data.messyngerImage.src}
        imageAlignment="end"
        clientOrProjectName="Messynger"
        name="Customer Support Platform"
        description="Develop integrations with social media platforms (WhatsApp, Messenger, Slack, MS Teams) to enhance reaching out to customers for support teams using message queues and platform adapters to delegate message passing between platforms."
        skills={[
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
        ]}
      />
    </main>
  )
}

import { ImageBlock } from '~/components/layout/blocks/image-block'
import { JobSkills } from './job-skills'

interface JobBlockProps {
  imageBlurDataUrl: string
  imageSrc: string
  imageAlignment: PropsOf<typeof ImageBlock>['imageAlignment']
  clientOrProjectName: string
  name: string
  description: string
  skills: PropsOf<typeof JobSkills>['skills']
}
export function JobBlock(props: JobBlockProps) {
  return (
    <ImageBlock
      imageBlurDataUrl={props.imageBlurDataUrl}
      imageSrc={props.imageSrc}
      imageRatio="square"
      imageAlignment={props.imageAlignment}
      caption={
        <p className="text-xl md:text-xl text-blue-500 font-medium dark:text-blue-400">
          {props.clientOrProjectName}
        </p>
      }
      title={
        <h2 className="text-4xl leading-tight font-semibold text-shadow-short text-shadow-transparent dark:text-shadow-black">
          {props.name}
        </h2>
      }
      subtitle={
        <div>
          <p className="text-xl leading-relaxed opacity-80 whitespace-pre-line">
            {props.description}
          </p>

          <JobSkills skills={props.skills} />
        </div>
      }
    />
  )
}

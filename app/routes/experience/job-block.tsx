import clsx from '~/utils/clsx'
import { BlurrableImage } from '~/components/image'
import { JobSkills } from './job-skills'

interface JobBlockProps {
  index: number
  imageBlurDataUrl: string
  imageSrc: string
  imageAlignment: 'start' | 'end'
  clientOrProjectName: string
  name: string
  description: string
  skills: string[]
}
export function JobBlock(props: JobBlockProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-24 border-b border-cyber-border last:border-b-0">
      <div
        className={clsx(
          'group aspect-[4/3] overflow-hidden rounded-sm',
          props.imageAlignment === 'end' && 'lg:order-2'
        )}
      >
        <BlurrableImage
          blurDataUrl={props.imageBlurDataUrl}
          src={props.imageSrc}
          width={800}
          height={600}
          alt={props.name}
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div
        className={clsx(
          'space-y-5',
          props.imageAlignment === 'end' && 'lg:order-1'
        )}
      >
        <div className="flex items-center gap-4">
          <span className="font-cyber text-[clamp(3rem,2.5rem_+_2vw,4rem)] font-black text-cyber-cyan/15 leading-none select-none">
            /{String(props.index + 1).padStart(2, '0')}
          </span>
          <p className="font-cyber text-sm uppercase tracking-widest text-cyber-cyan font-bold">
            {props.clientOrProjectName}
          </p>
        </div>
        <h2 className="font-cyber text-[clamp(2.25rem,1.25rem_+_4.5vw,4rem)] uppercase tracking-wide leading-[0.95] font-black text-cyber-text">
          {props.name}
        </h2>
        <p className="font-mono text-[clamp(1rem,0.925rem_+_0.25vw,1.125rem)] leading-relaxed text-cyber-text-dim max-w-lg">
          {props.description}
        </p>
        <JobSkills skills={props.skills} />
      </div>
    </div>
  )
}

import clsx from '~/utils/clsx'
import { CyberImage } from '~/components/cyber-image'
import { JobSkills } from './job-skills'

interface JobBlockImage {
  blurDataUrl: string
  src: string
  alignment: 'start' | 'end'
}

interface JobBlockProps {
  index: number
  image?: JobBlockImage
  clientOrProjectName: string
  name: string
  description: string
  skills: string[]
}

export function JobBlock(props: JobBlockProps) {
  return (
    <div
      className={clsx(
        'grid gap-10 lg:gap-20 items-center py-8 lg:py-12',
        props.image && 'lg:grid-cols-2'
      )}
    >
      {props.image && (
        <div className={clsx(props.image.alignment === 'end' && 'lg:order-2')}>
          <CyberImage
            blurDataUrl={props.image.blurDataUrl}
            src={props.image.src}
            width={800}
            height={600}
            alt={props.name}
          />
        </div>
      )}
      <div
        className={clsx(
          'space-y-5',
          props.image?.alignment === 'end' && 'lg:order-1'
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
        <h2 className="font-cyber text-[clamp(2rem,1.25rem_+_3.5vw,3.5rem)] uppercase tracking-wide leading-[0.95] font-black text-cyber-text">
          {props.name}
        </h2>
        <p
          className={clsx(
            'font-mono text-[clamp(1rem,0.925rem_+_0.25vw,1.125rem)] leading-relaxed text-cyber-text-dim',
            props.image ? 'max-w-lg' : 'max-w-3xl'
          )}
        >
          {props.description}
        </p>
        <JobSkills skills={props.skills} />
      </div>
    </div>
  )
}

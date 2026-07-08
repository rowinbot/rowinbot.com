import { BlurrableImage } from '~/components/image'
import clsx from '~/utils/clsx'

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
        'grid items-center gap-10 py-8 lg:gap-16 lg:py-12',
        props.image && 'lg:grid-cols-2'
      )}
    >
      {props.image && (
        <div
          className={clsx(
            'overflow-hidden rounded-sm border border-rule',
            props.image.alignment === 'end' && 'lg:order-2'
          )}
        >
          <BlurrableImage
            blurDataUrl={props.image.blurDataUrl}
            src={props.image.src}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
            alt={props.name}
          />
        </div>
      )}
      <div
        className={clsx(
          'space-y-4',
          props.image?.alignment === 'end' && 'lg:order-1'
        )}
      >
        <div className="flex items-center gap-4">
          <span className="select-none font-display text-4xl font-black leading-none text-ink-soft/40">
            /{String(props.index + 1).padStart(2, '0')}
          </span>
          <p className="font-mono text-meta font-semibold uppercase tracking-[0.08em] text-mark">
            {props.clientOrProjectName}
          </p>
        </div>
        <h2 className="font-display text-d3 font-black uppercase leading-tight tracking-tight text-ink">
          {props.name}
        </h2>
        <p
          className={clsx(
            'font-mono text-meta leading-relaxed text-ink-soft',
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

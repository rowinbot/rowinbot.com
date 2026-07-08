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
  const number = String(props.index + 1).padStart(2, '0')

  return (
    <article className="reveal py-2">
      <div
        className={clsx(
          'grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-6',
          props.image && 'md:grid-cols-2 md:items-start'
        )}
      >
        <div
          className={clsx(props.image?.alignment === 'end' && 'md:order-2')}
        >
          <div className="flex items-baseline gap-3">
            <span className="select-none font-mono text-lg font-semibold leading-none text-ink-soft/50">
              /{number}
            </span>
            <p className="font-mono text-label uppercase tracking-[0.16em] text-mark">
              {props.clientOrProjectName}
            </p>
          </div>

          <h3 className="mt-2.5 font-display text-[clamp(1.375rem,3vw,2rem)] font-black leading-tight tracking-[-0.02em] text-ink">
            {props.name}
          </h3>

          <p
            className={clsx(
              'mt-3.5 font-mono text-meta leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink',
              props.image ? 'max-w-[52ch]' : 'max-w-[68ch]'
            )}
          >
            {props.description}
          </p>

          <JobSkills skills={props.skills} />
        </div>

        {props.image && (
          <figure
            className={clsx(
              'm-0 overflow-hidden rounded-sm border border-rule bg-mount shadow-[3px_5px_0_rgba(43,42,40,0.07)]',
              props.image.alignment === 'end' && 'md:order-1'
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
          </figure>
        )}
      </div>
    </article>
  )
}

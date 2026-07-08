import { BlurrableImage } from '~/components/image'
import clsx from '~/utils/clsx'

import { AlignedBlock } from './aligned-block'

interface ImageBlockProps {
  imageBlurDataUrl: string
  imageSrc: string
  imageAlignment: 'start' | 'end'
  imageRatio: 'square' | 'wide' | '4/3' | '3/4' | '9/16'
  caption?: React.ReactElement
  title: React.ReactElement
  subtitle?: React.ReactElement
  alt?: string
}
export function ImageBlock(props: ImageBlockProps) {
  let width: number
  let height: number

  switch (props.imageRatio) {
    case 'square': {
      width = 672
      height = 480
    }
    case 'wide':
    default: {
      width = height = 480
    }
  }

  return (
    <AlignedBlock
      className={clsx(
        'relative z-10 py-14 flex flex-col md:space-y-0 space-y-8',
        props.imageAlignment === 'start' ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      <div className="relative border border-cyber-cyan/20 rounded-sm overflow-hidden transition-all duration-300 hover:glow-cyan hover:border-cyber-cyan/40">
        <BlurrableImage
          blurDataUrl={props.imageBlurDataUrl}
          src={props.imageSrc}
          width={width}
          height={height}
          align="center"
          alt={props.alt ?? ''}
          className={clsx(
            'dark:brightness-90 saturate-[1.1] dark:saturate-[1] object-cover h-[26rem] md:h-[28rem] xl:h-[30rem] rounded-sm transition-all duration-200 ease-out',
            props.imageRatio === 'square' && 'aspect-square',
            props.imageRatio === 'wide' && 'aspect-[7/6] lg:aspect-[7/5]',
            props.imageRatio === '4/3' && 'aspect-[4/3]',
            props.imageRatio === '3/4' && 'aspect-[3/4]',
            props.imageRatio === '9/16' && 'aspect-[9/16]'
          )}
        />
      </div>

      <header
        className={clsx(
          'md:self-center app-text flex-1 flex'
          // props.imageAlignment === 'end' && 'justify-end' - // This might not be a good idea, visually.
        )}
      >
        <div
          className={clsx(
            'space-y-2',
            props.imageAlignment === 'start' ? 'md:ml-8' : 'md:mr-8'
          )}
        >
          {props.caption}

          {props.title}

          {props.subtitle}
        </div>
      </header>
    </AlignedBlock>
  )
}

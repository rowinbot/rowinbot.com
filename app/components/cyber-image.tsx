import { BlurrableImage } from '~/components/image'

interface CyberImageProps {
  blurDataUrl: string
  src: string
  width: number
  height: number
  alt: string
  className?: string
}

export function CyberImage({
  blurDataUrl,
  src,
  width,
  height,
  alt,
  className = 'aspect-[4/3]',
}: CyberImageProps) {
  return (
    <div
      className={`relative ${className} overflow-hidden border border-cyber-cyan/20 glow-cyan`}
      style={{
        clipPath:
          'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
      }}
    >
      <BlurrableImage
        blurDataUrl={blurDataUrl}
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="w-full h-full"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgb(var(--cyber-cyan) / 0.03) 3px, rgb(var(--cyber-cyan) / 0.03) 4px)',
        }}
      />
    </div>
  )
}

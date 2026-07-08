import { TapeStrip } from './tape-strip'

interface TapedPhotoProps {
  src: string
  alt: string
  caption: string
  captionHover?: string
  width: number
  height: number
}

export function TapedPhoto({
  src,
  alt,
  caption,
  captionHover,
  width,
  height,
}: TapedPhotoProps) {
  return (
    <figure className="group relative mx-auto mt-2 w-full max-w-[300px] rotate-[-1.9deg] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-safe:hover:rotate-0 motion-safe:hover:scale-[1.012] motion-safe:focus-within:rotate-0">
      <TapeStrip className="left-[-16px] top-[-13px] rotate-[-41deg] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:rotate-[-34deg]" />
      <TapeStrip className="bottom-[-11px] right-[-15px] rotate-[-41deg] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:rotate-[-48deg]" />

      <div className="relative border border-ink/[0.12] bg-mount px-[9px] pb-3 pt-[9px] shadow-[3px_6px_0_rgba(43,42,40,0.09),0_14px_26px_rgba(43,42,40,0.10)] transition-shadow duration-300 group-hover:shadow-[4px_9px_0_rgba(43,42,40,0.10),0_18px_34px_rgba(43,42,40,0.14)]">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full [filter:saturate(0.92)_contrast(1.02)_sepia(0.05)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[9px] bottom-3 top-[9px] shadow-[inset_0_0_0_1px_rgba(43,42,40,0.10)] mix-blend-multiply"
        />
      </div>

      <figcaption className="absolute bottom-[-46px] right-[-6px] z-[4] w-[190px] rotate-[1.4deg]">
        <svg
          viewBox="0 0 70 56"
          aria-hidden="true"
          className="absolute left-[-46px] top-[-30px] h-14 w-[70px] overflow-visible"
        >
          <g filter="url(#rough)">
            <path
              className="stroke red-stroke"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              d="M62,48 C40,44 20,32 10,14"
              markerEnd="url(#ah)"
            />
          </g>
        </svg>
        <span className="block text-right font-mono text-meta italic leading-relaxed text-mark transition-opacity duration-300 group-hover:opacity-0">
          {caption}
        </span>
        {captionHover && (
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 text-right font-mono text-meta italic leading-relaxed text-mark opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
          >
            {captionHover}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

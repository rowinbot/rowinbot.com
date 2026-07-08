import clsx from '~/utils/clsx'

interface TapeStripProps {
  className?: string
}

export function TapeStrip({ className }: TapeStripProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'absolute z-[3] h-[27px] w-[82px] border-x border-[rgba(200,170,90,0.28)] shadow-[0_1px_2px_rgba(43,42,40,0.10)]',
        'bg-[linear-gradient(120deg,rgba(232,207,132,0.42),rgba(224,193,110,0.30))]',
        'after:absolute after:inset-0 after:bg-[repeating-linear-gradient(90deg,transparent_0_6px,rgba(255,255,255,0.10)_6px_7px)] after:content-[""]',
        className
      )}
    />
  )
}

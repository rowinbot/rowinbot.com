import { AdaptiveFullSignature } from '~/components/logo'
import { Wavezz } from '~/components/wavezz'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'

export function Footer() {
  return (
    <>
      <Wavezz
        variant="secondary"
        className="h-[10rem] sm:h-[10rem] lg:h-[16rem] fill-slate-100 dark:fill-black"
      />

      <AlignedBlock containerClassName="bg-slate-100 dark:bg-black pb-20">
        <footer className="grid md:grid-cols-4 items-center w-full space-y-8 lg:space-y-0 lg:space-x-8 app-text">
          <div className="flex flex-col space-y-8">
            <AdaptiveFullSignature />

            <p className="text-lg leading-relaxed font-medium">
              Crafting adaptive high-quality experiences for the Web.
            </p>
          </div>
        </footer>
      </AlignedBlock>
    </>
  )
}

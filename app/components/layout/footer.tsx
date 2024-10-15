import { AdaptiveFullSignature } from '~/components/logo'
import { Wavezz } from '~/components/wavezz'
import { Block } from './blocks/block'
import { AnchorLink } from '../buttons/anchor-link'

export function Footer() {
  return (
    <>
      <Wavezz
        variant="secondary"
        className="h-[10rem] sm:h-[10rem] lg:h-[16rem] fill-slate-100 dark:fill-black"
      />

      <footer className="bg-slate-100 dark:bg-black pb-20">
        <Block className="mx-auto flex flex-col md:flex-row md:items-center w-full space-y-8 lg:space-y-0 lg:space-x-8 app-text justify-between">
          <div className="flex flex-col space-y-8 max-w-xs">
            <AdaptiveFullSignature />

            <p className="text-lg leading-relaxed font-medium">
              Crafting adaptive high-quality experiences for the Web.
            </p>
          </div>
          <div className="space-x-2">
            <AnchorLink href="https://github.com/rowinbot">GitHub</AnchorLink>
            <AnchorLink href="https://twitter.com/rowinbot">Twiter</AnchorLink>
            <AnchorLink href="https://www.linkedin.com/in/rowinbot/">
              LinkedIn
            </AnchorLink>
          </div>
        </Block>
      </footer>
    </>
  )
}

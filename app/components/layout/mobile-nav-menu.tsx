import { useEffect } from 'react'

import { MobileNavLink } from '~/components/buttons/mobile-nav-link'
import { SoundToggleLabeled } from '~/components/sound'
import { ThemeToggleLabeled } from '~/components/theme'
import { Routes } from '~/routes'
import clsx from '~/utils/clsx'

interface MobileNavMenuProps {
  isOpen: boolean
  className?: string
  close: () => void
}

export function MobileNavMenu(props: MobileNavMenuProps) {
  useEffect(() => {
    if (!props.isOpen) return

    document.body.classList.add('overflow-hidden')
    document.scrollingElement?.scrollTo(0, 0)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [props.isOpen])

  return (
    <div
      data-open={props.isOpen}
      className={clsx(
        'absolute inset-x-0 top-full z-10 hidden h-[calc(100vh-100%)] bg-paper/95 backdrop-blur-md max-md:data-[open=true]:block',
        props.className
      )}
    >
      <div className="mx-0 flex h-full flex-col overflow-y-auto border-t-2 border-ink">
        <MobileNavLink to={Routes.journal} onClick={props.close}>
          Journal
        </MobileNavLink>
        <MobileNavLink to={Routes.about} onClick={props.close}>
          About
        </MobileNavLink>
        <MobileNavLink to={Routes.myExperience} onClick={props.close}>
          Experience
        </MobileNavLink>

        <div className="mt-6 space-y-3 self-center text-ink-soft">
          <ThemeToggleLabeled />
          <SoundToggleLabeled />
        </div>
      </div>
    </div>
  )
}

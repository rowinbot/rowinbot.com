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
        'hidden max-md:data-[open=true]:block inset-x-0 absolute h-[calc(100vh-100%)] top-full z-10 bg-cyber-bg/95 backdrop-blur-lg',
        props.className
      )}
    >
      <div className="h-full overflow-y-auto flex flex-col border-t border-cyber-cyan/30 mx-0">
        <MobileNavLink to={Routes.journal} onClick={props.close}>
          Journal
        </MobileNavLink>
        <MobileNavLink to={Routes.about} onClick={props.close}>
          About
        </MobileNavLink>
        <MobileNavLink to={Routes.myExperience} onClick={props.close}>
          Experience
        </MobileNavLink>
        <MobileNavLink to={Routes.home} onClick={props.close}>
          Contact
        </MobileNavLink>

        <div className="mt-6 space-y-3 self-center text-cyber-text-dim">
          <ThemeToggleLabeled />
          <SoundToggleLabeled />
        </div>
      </div>
    </div>
  )
}

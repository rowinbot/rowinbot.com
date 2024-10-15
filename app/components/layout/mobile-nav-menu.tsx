import clsx from '~/utils/clsx'
import { MobileNavLink } from '~/components/buttons/mobile-nav-link'
import { ThemeToggleButton } from '~/components/theme'
import { SoundEffectsStatusToggle } from '~/components/soundEffects'
import { useEffect } from 'react'

interface MobileNavMenuProps {
  isOpen: boolean
  className?: string
  close: () => void
}

export function MobileNavMenu(props: MobileNavMenuProps) {
  useEffect(() => {
    if (!props.isOpen) return

    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [props.isOpen])

  return (
    <div
      data-open={props.isOpen}
      className={clsx(
        'hidden data-[open=true]:block inset-x-0 app-bg absolute h-[calc(100vh-100%)] top-full z-10',
        props.className
      )}
    >
      <div className="h-full overflow-y-auto flex flex-col border-t border-slate-600 mx-2">
        <MobileNavLink to="/journal" onClick={props.close}>
          Journal
        </MobileNavLink>
        <MobileNavLink to="/about" onClick={props.close}>
          About
        </MobileNavLink>
        <MobileNavLink to="/experience" onClick={props.close}>
          Experience
        </MobileNavLink>
        <MobileNavLink to="/" onClick={props.close}>
          Contact
        </MobileNavLink>

        <div className="mt-6 space-y-3 self-center">
          <ThemeToggleButton />
          <SoundEffectsStatusToggle />
        </div>
      </div>
    </div>
  )
}

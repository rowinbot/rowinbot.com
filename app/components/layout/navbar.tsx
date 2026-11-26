import { useCallback, useEffect, useRef, useState } from 'react'

import { NavLink } from '~/components/buttons/nav-link'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { Brand } from '~/components/logo'
import { SoundToggle } from '~/components/sound'
import { ThemeToggle } from '~/components/theme'
import { useFocusTrap } from '~/hooks/use-focus-trap'
import { Routes } from '~/routes'

import { MainProgressBar } from './main-progress-bar'
import { MobileNavMenu } from './mobile-nav-menu'
import { MobileNavMenuToggle } from './mobile-nav-menu-toggle'

const mobileMenuId = 'mobile-nav-menu'
const focusTrapSelectors = ['#nav-menu']

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useFocusTrap({
    selectors: focusTrapSelectors,
    enabled: isMobileMenuOpen,
  })

  useEffect(() => {
    if (!isMobileMenuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      setIsMobileMenuOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <AlignedBlock className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Brand />

          <div id="nav-menu" className="flex items-center gap-4">
            <MobileNavMenuToggle
              ref={toggleRef}
              enabled={isMobileMenuOpen}
              controlsId={mobileMenuId}
              toggle={() => setIsMobileMenuOpen((v) => !v)}
            />

            <MobileNavMenu
              id={mobileMenuId}
              isOpen={isMobileMenuOpen}
              close={closeMobileMenu}
            />

            <ul className="hidden items-center gap-6 md:flex lg:gap-8">
              <li>
                <NavLink to={{ originalPath: Routes.journal }}>Journal</NavLink>
              </li>
              <li>
                <NavLink to={{ originalPath: Routes.about }}>About</NavLink>
              </li>
              <li>
                <NavLink to={{ originalPath: Routes.myExperience }}>
                  Experience
                </NavLink>
              </li>
            </ul>

            <div className="ml-2 hidden items-center gap-1 border-l border-rule pl-4 text-ink-soft md:flex">
              <ThemeToggle />

              <SoundToggle />
            </div>
          </div>
        </div>
      </AlignedBlock>

      <MainProgressBar />
    </nav>
  )
}

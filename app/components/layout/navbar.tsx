import { useState } from 'react'

import { NavLink } from '~/components/buttons/nav-link'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { Brand } from '~/components/logo'
import { SoundToggle } from '~/components/sound'
import { ThemeToggle } from '~/components/theme'
import { useFocusTrap } from '~/hooks/use-focus-trap'
import { Routes } from '~/routes'

import { MobileNavMenu } from './mobile-nav-menu'
import { MobileNavMenuToggle } from './mobile-nav-menu-toggle'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useFocusTrap({
    selectors: ['#nav-menu'],
    enabled: isMobileMenuOpen,
  })

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <AlignedBlock className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Brand />

          <div id="nav-menu" className="flex items-center gap-4">
            <MobileNavMenuToggle
              enabled={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen((v) => !v)}
            />

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              close={() => setIsMobileMenuOpen(false)}
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
    </nav>
  )
}

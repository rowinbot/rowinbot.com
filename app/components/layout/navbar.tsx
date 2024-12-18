import { AdaptiveFullLogo } from '~/components/logo'
import { NavLink } from '~/components/buttons/nav-link'
import { ThemeToggleCircularButton } from '~/components/theme'
import { SoundEffectsStatusCircularToggle } from '~/components/soundEffects'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'
import { MobileNavMenu } from './mobile-nav-menu'
import { useState } from 'react'
import { MobileNavMenuToggle } from './mobile-nav-menu-toggle'
import { useFocusTrap } from '~/hooks/use-focus-trap'
import { MainLogo } from '~/components/graphics/main-logo'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Trap focus inside the mobile nav menu when it's open
  useFocusTrap({
    selectors: ['#nav-menu'],
    enabled: isMobileMenuOpen,
  })

  return (
    <nav className="relative z-50 border-b-2 border-b-slate-100 dark:border-b-gray-800 py-5">
      <AlignedBlock className="py-4">
        <div className="flex items-center justify-between py-2 min-h-[3rem]">
          <p className="flex flex-row items-center gap-x-2 line-clamp-1">
            <MainLogo className="inline-block size-12" />

            <AdaptiveFullLogo />
          </p>

          <div id="nav-menu" className="items-center flex gap-2">
            <MobileNavMenuToggle
              enabled={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen((v) => !v)}
            />

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              close={() => setIsMobileMenuOpen(false)}
            />

            <ul className="justify-between hidden md:flex">
              <li>
                <NavLink to="/journal">Journal</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/experience">Experience</NavLink>
              </li>
              <li>
                <NavLink to="/">Contact</NavLink>
              </li>
            </ul>

            <div className="text-slate-700 hidden md:flex flex-row">
              <ThemeToggleCircularButton />

              <div className="ml-2" />

              <SoundEffectsStatusCircularToggle />
            </div>
          </div>
        </div>
      </AlignedBlock>
    </nav>
  )
}

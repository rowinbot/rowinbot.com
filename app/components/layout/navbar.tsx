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
import { Routes } from '~/routes'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Trap focus inside the mobile nav menu when it's open
  useFocusTrap({
    selectors: ['#nav-menu'],
    enabled: isMobileMenuOpen,
  })

  return (
    <nav className="sticky top-0 z-50 bg-cyber-bg/90 backdrop-blur-xl border-b border-cyber-cyan/30 py-3">
      {/* Bold cyan glow at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-magenta/40 via-cyber-cyan to-cyber-magenta/40" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent blur-sm" />

      <AlignedBlock className="py-2">
        <div className="flex items-center justify-between py-1 min-h-[3rem]">
          <div className="flex flex-row items-center gap-x-3 line-clamp-1">
            <MainLogo className="inline-block size-10 [filter:drop-shadow(0_0_8px_rgba(0,240,255,0.3))]" />

            <AdaptiveFullLogo />
          </div>

          <div id="nav-menu" className="items-center flex gap-2">
            <MobileNavMenuToggle
              enabled={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen((v) => !v)}
            />

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              close={() => setIsMobileMenuOpen(false)}
            />

            <ul className="justify-between hidden md:flex items-center">
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
              <li>
                <NavLink to={{ originalPath: Routes.home }}>Contact</NavLink>
              </li>
            </ul>

            <div className="hidden md:flex flex-row items-center gap-2 ml-2 text-cyber-text-dim">
              <ThemeToggleCircularButton />

              <SoundEffectsStatusCircularToggle />
            </div>
          </div>
        </div>
      </AlignedBlock>
    </nav>
  )
}

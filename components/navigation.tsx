import type { ReactNode } from 'react'
import { ThemeToggle } from '../components/theme'
import { Logo } from '../components/logo'
import SoundEffectsToggle from '../components/soundEffects'

interface NavLinkProps {
  children: ReactNode
}

export function NavLink({ children }: NavLinkProps) {
  return (
    <a
      href="#"
      className="px-4 py-2 text-sm text-slate-700 dark:text-white cursor-pointer"
    >
      {children}
    </a>
  )
}

export function NavBar() {
  return (
    <nav className="backdrop-filter-fallback-opacity sticky transition duration-500 top-0 bg-white border-b-2 dark:bg-slate-900 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-95 z-10 border-b-slate-100 dark:border-b-slate-900 mx-[calc((100vw_-_100%)_/_2_*_-1)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-2 px-6 min-h-[3rem]">
        <h1 className="text-slate-900 dark:text-white flex-shrink-0">
          <span className="align-middle inline-flex -translate-y-[2px] mr-2">
            <Logo />
          </span>
          Rowin Hernandez
        </h1>

        <div className="items-center hidden md:flex">
          <ul className="justify-between hidden md:flex">
            <li>
              <NavLink>Blog</NavLink>
            </li>
            <li>
              <NavLink>About</NavLink>
            </li>
            <li>
              <NavLink>Experience</NavLink>
            </li>
            <li>
              <NavLink>Projects</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li>
          </ul>

          <div className="text-slate-700 flex flex-row">
            <ThemeToggle />

            <div className="ml-2" />

            <SoundEffectsToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

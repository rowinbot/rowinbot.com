import clsx from '~/utils/clsx'
import { AdaptiveFullLogo } from '~/components/logo'
import { NavLink } from '~/components/buttons'
import { ThemeToggle } from '~/components/theme'
import SoundEffectsStatusToggle from '~/components/soundEffects'
import { AlignedBlock } from '~/components/layout/blocks/aligned-block'

export function Navbar() {
  return (
    <AlignedBlock
      containerClassName={clsx(
        'relative z-10',
        'border-b-2 border-b-slate-100 dark:border-b-gray-800 py-5'
      )}
    >
      <nav className="py-4">
        <div className="flex items-center justify-between py-2 min-h-[3rem]">
          <p>
            <AdaptiveFullLogo />
          </p>

          <div className="items-center hidden md:flex">
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

            <div className="text-slate-700 flex flex-row">
              <ThemeToggle />

              <div className="ml-2" />

              <SoundEffectsStatusToggle />
            </div>
          </div>
        </div>
      </nav>
    </AlignedBlock>
  )
}

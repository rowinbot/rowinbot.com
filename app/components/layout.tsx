import clsx from 'clsx'
import { VercelLogo } from './icons'
import { AdaptiveFullLogo, AdaptiveFullSignature } from './logo'
import { NavLink } from './buttons'
import { ThemeToggle } from './theme'
import SoundEffectsStatusToggle from './soundEffects'
import { Wavezz } from './wavezz'

export function PageReset(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {props.children}
    </div>
  )
}

export function PageContainer(props: {
  id?: string
  containerClassName?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx('w-full px-8', props.containerClassName)}>
      <div
        id={props.id}
        className={clsx('max-w-7xl w-full mx-auto', props.className)}
      >
        {props.children}
      </div>
    </div>
  )
}

export function VercelSponsorshipBanner() {
  return (
    <a
      className="app-text center"
      href="https://vercel.com?utm_source=rowinbot&utm_campaign=oss"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <VercelLogo
        aria-label="Vercel Logo"
        className="h-4 w-auto app-fill inline"
      />
    </a>
  )
}

export function NavBar() {
  return (
    <PageContainer
      containerClassName={clsx(
        'relative z-10',
        'border-b-2 border-b-slate-100 dark:border-b-gray-800 py-5'
      )}
    >
      <nav className="py-4">
        <div className="flex items-center justify-between py-2 min-h-[3rem]">
          <h1>
            <AdaptiveFullLogo />
          </h1>

          <div className="items-center hidden md:flex">
            <ul className="justify-between hidden md:flex">
              <li>
                <NavLink to="/journal">Journal</NavLink>
              </li>
              <li>
                <NavLink to="/">About</NavLink>
              </li>
              <li>
                <NavLink to="/">Experience</NavLink>
              </li>
              <li>
                <NavLink to="/">Projects</NavLink>
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
    </PageContainer>
  )
}

export function Footer() {
  return (
    <>
      <Wavezz
        variant="secondary"
        className="h-[10rem] sm:h-[10rem] lg:h-[16rem] fill-slate-100 dark:fill-black"
      />

      <PageContainer containerClassName="bg-slate-100 dark:bg-black pb-20">
        <footer className="grid md:grid-cols-4 items-center w-full space-y-8 lg:space-y-0 lg:space-x-8 app-text">
          <div className="flex flex-col space-y-8">
            <AdaptiveFullSignature />

            <p className="text-lg leading-relaxed font-medium">
              Crafting adaptive high-quality experiences for the Web.
            </p>
          </div>

          <div>
            <p>© 2020 - {new Date().getFullYear()} | All rights reserved.</p>

            <VercelSponsorshipBanner />
          </div>
        </footer>
      </PageContainer>
    </>
  )
}

export function FullPageContainer(props: {
  topElement?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative">
        <NavBar />

        {/** This id is to enable portal'ing to this element  */}
        {props.topElement}
      </div>

      {props.children}

      <Footer />
    </div>
  )
}

export function PageContainerContent(props: { children: React.ReactNode }) {
  return (
    <PageContainer containerClassName="flex-1 px-16">
      {props.children}
    </PageContainer>
  )
}
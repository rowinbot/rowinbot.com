import type { NextPage } from 'next'
import Head from 'next/head'
import { NavLink } from '../components/navigation'
import lightGrayLogo from '../assets/light-gray-logo.png'
import Image from 'next/image'
import { ThemeToggle } from '../components/theme'
import { Logo } from '../components/logo'
import SoundEffectsToggle from '../components/soundEffects'

import { PageTitle } from '../components/other'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rowin Hernandez</title>
        <meta name="description" content="Rowin Hernandez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-5xl w-full mx-auto mt-4 px-2">
        <nav className="backdrop-filter-fallback-opacity flex items-center justify-between sticky transition duration-500 top-0 py-2 px-4 bg-white dark:bg-slate-900 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-95 z-10 border-b-2 border-b-slate-500">
          <h1 className="text-slate-700 dark:text-white flex-shrink-0">
            <span className="align-middle inline-flex mb-1">
              <Logo />
            </span>
            Rowin Hernandez
          </h1>

          <ul className="w-[500px] justify-between hidden md:flex">
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
        </nav>

        <main className="relative px-4">
          <header className="my-10">
            <PageTitle />
          </header>

          <div className="min-h-screen" />
        </main>
      </div>
    </>
  )
}

export default Home

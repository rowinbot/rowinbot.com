import type { NextPage } from 'next'
import Head from 'next/head'
import { NavBar } from '../components/navigation'

import { PageTitle } from '../components/other'
import clsx from 'clsx'
import { Wavezz } from '../components/wavezz'

function PageContainer(props: {
  containerClassName?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx('w-full px-8', props.containerClassName)}>
      <div className={clsx('max-w-5xl w-full mx-auto', props.className)}>
        {props.children}
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rowin Hernandez</title>
        <meta name="description" content="Rowin Hernandez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <NavBar />

        <header className="mt-5 py-24 mb-40">
          <PageTitle />
        </header>
      </PageContainer>

      <div className="relative">
        <div className="absolute z-10 -translate-y-[50%] -left-20 -right-20 lg:left-0 lg:right-0 fill-slate-200 dark:fill-slate-800">
          <Wavezz className="h-[8rem] sm:h-[10rem] lg:h-[12rem]" />
          <Wavezz className="h-[8rem] sm:h-[10rem] lg:h-[12rem] -scale-y-100" />
        </div>
      </div>

      <PageContainer containerClassName="bg-slate-100 dark:bg-slate-900 flex-1 pt-[10rem]">
        <main className="relative pb-40">
          <p className="text-3xl leading-loose app-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            aliquam sapien eu orci lobortis, eu porttitor justo varius. Maecenas
            sit amet massa eget nibh posuere suscipit. Sed vitae nulla eu augue
            aliquam posuere. Sed vel metus a ex vestibulum placerat. Sed vitae
            quam risus. Nulla facilisi. Nullam non diam in ex luctus maximus.
            Proin euismod ipsum vel enim bibendum sagittis. Aliquam erat
            volutpat. Sed in tellus sapien. Suspendisse hendrerit sapien ac
            dolor placerat, quis fringilla ex bibendum. Vivamus quis blandit
            nisi. Nulla quis ipsum vel est molestie laoreet. Donec imperdiet,
            lacus auctor luctus commodo, nulla magna tristique arcu, nec aliquam
            est enim vel arcu. Ut id justo id mi blandit rhoncus. Duis bibendum
            libero nec ex malesuada, ac rutrum ipsum commodo. Pellentesque
            tempor congue mi, id viverra eros lacinia ac. Vestibulum lacinia
            vestibulum tortor, in iaculis est suscipit at. Maecenas lobortis
            nunc vel ante lacinia iaculis. Etiam commodo eros in diam malesuada,
            vel bibendum lorem lacinia. Fusce ac commodo metus. Suspendisse
            potenti.
          </p>
        </main>
      </PageContainer>
    </>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import { NavBar } from '../components/navigation'

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
        <NavBar />

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

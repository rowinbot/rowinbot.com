import type { NextPage } from 'next'
import Head from 'next/head'

import { FullPageContainer, PageContainerContent } from '../components/layout'
import { BlogpostButton } from '../components/buttons'
import { Wavezz } from '../components/wavezz'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rowin Hernandez</title>
        <meta name="description" content="Rowin Hernandez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullPageContainer>
        <div className="relative">
          <div className="absolute z-10 -translate-y-[50%] -left-20 -right-20 lg:left-0 lg:right-0 fill-[#0099FF] dark:fill-[#144fff]">
            <Wavezz className="h-[8rem] sm:h-[10rem] lg:h-[12rem]" />
            <Wavezz className="h-[8rem] sm:h-[10rem] lg:h-[12rem] -scale-y-100" />
          </div>
        </div>

        <PageContainerContent>
          <div className="mt-[10rem]" />
          <main className="py-20 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
            <BlogpostButton id="my-post" />
            <BlogpostButton id="my-post" />
            <BlogpostButton id="my-post" />
            <BlogpostButton id="my-post" />
          </main>
        </PageContainerContent>
      </FullPageContainer>
    </>
  )
}

export default Home

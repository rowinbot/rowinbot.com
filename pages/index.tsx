import type { NextPage } from 'next'
import Head from 'next/head'

import {
  FullPageContainer,
  PageContainer,
  PageContainerContent,
} from '../components/layout'
import { BlogpostButton } from '../components/buttons'
import { LayeredWavezz, Wavezz } from '../components/wavezz'
import { PageMeta } from '../components/meta'

const Home: NextPage = () => {
  return (
    <>
      <PageMeta title="Home" description="A " />

      <FullPageContainer
        topElement={
          <div className="pt-40 pb-60 mb-10 relative">
            <LayeredWavezz
              direction="top-left"
              className="absolute top-0 bottom-0 left-0 h-full"
            />

            <PageContainer id="page-header" className="relative z-10">
              <header className="py-36">
                <h2 className="text-4xl 2xs:text-5xl app-text sm:text-6xl lg:text-7xl items-start !leading-relaxed text-shadow-long dark:text-shadow-slate-700 text-shadow-gray-100 font-semibold mix-blend-color-burn">
                  Crafting adaptive high-quality experiences for the{' '}
                  <b className="font-black">Web.</b>
                </h2>
              </header>
            </PageContainer>
          </div>
        }
      >
        <div className="absolute inset-x-0 z-30 overflow-hidden home-wave-on-top fill-[#0099FF] dark:fill-[#144fff]">
          <Wavezz className="h-[12rem] sm:h-[16rem] lg:h-[18rem] object-cover" />
          <Wavezz
            variant="tertiary"
            className="h-[12rem] sm:h-[16rem] lg:h-[18rem] object-cover -scale-y-100"
          />
        </div>

        <PageContainerContent>
          <main className="py-20 mt-60 space-y-16">
            <h2 className="text-3xl font-medium">
              Here's what I've been up to lately 🤓
            </h2>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
              <BlogpostButton id="my-post" />
              <BlogpostButton id="my-post" />
              <BlogpostButton id="my-post" />
              <BlogpostButton id="my-post" />
            </div>
          </main>
        </PageContainerContent>
      </FullPageContainer>
    </>
  )
}

export default Home

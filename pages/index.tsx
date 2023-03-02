import type { NextPage } from 'next'
import Head from 'next/head'

import {
  FullPageContainer,
  PageContainer,
  PageContainerContent,
} from '../components/layout'
import { BlogpostButton } from '../components/buttons'
import { LayeredWavezz } from '../components/wavezz'
import { PageMeta } from '../components/meta'

const posts = [
  {
    id: 'my-post',
    title: 'My title',
  },
]

const Home: NextPage = () => {
  return (
    <div className="app-pattern-bg">
      <PageMeta title="Home" description="A " />

      <FullPageContainer
        topElement={
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 right-0 h-full overflow-hidden">
              <LayeredWavezz
                direction="top-left"
                className="h-full -translate-y-3"
              />
            </div>

            <PageContainer id="page-header" className="relative z-10">
              <header className="py-80 max-w-5xl mx-auto">
                <h2 className="text-4xl 2xs:text-5xl app-text sm:text-6xl lg:text-7xl items-start !leading-relaxed text-shadow-small font-normal">
                  Crafting adaptive high-quality experiences for the Web.
                </h2>
              </header>
            </PageContainer>
          </div>
        }
      >
        <PageContainerContent>
          <main className="py-20 space-y-16">
            <h2 className="text-3xl font-medium">
              {"Here's what I've been up to lately 🤓"}
            </h2>

            <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(0,_350px))] justify-start gap-x-10 gap-y-20">
              {posts.map((post) => (
                <BlogpostButton key={post.id} id={post.id} title={post.title} />
              ))}
            </div>
          </main>
        </PageContainerContent>
      </FullPageContainer>
    </div>
  )
}

export default Home

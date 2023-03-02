import Head from 'next/head'
import {
  FullPageContainer,
  PageContainerContent,
} from '../../components/layout'
import { Breadcrumbs } from '../../components/breadcrumbs'

export default function BlogPostRoute() {
  return (
    <>
      <Head>
        <title>Rowin Hernandez</title>
        <meta name="description" content="Rowin Hernandez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullPageContainer>
        <PageContainerContent>
          <header className="space-y-4 mt-16 mb-8">
            <Breadcrumbs />

            <h1 className="text-5xl font-medium">
              {"This is my post's title"}
            </h1>
          </header>

          <p>Hello</p>
        </PageContainerContent>
      </FullPageContainer>
    </>
  )
}

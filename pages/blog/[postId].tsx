import Head from 'next/head'
import {
  FullPageContainer,
  PageContainerContent,
} from '../../components/layout'

export default function BlogPostRoute() {
  return (
    <>
      <Head>
        <title>Rowin Hernandez</title>
        <meta name="description" content="Rowin Hernandez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullPageContainer>
        <PageContainerContent>Hello</PageContainerContent>
      </FullPageContainer>
    </>
  )
}

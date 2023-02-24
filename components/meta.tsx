import Head from 'next/head'

interface PageMetaProps {
  title: string
  description: string
}
export function PageMeta(props: PageMetaProps) {
  return (
    <Head>
      <title>{`${props.title} | Rowin Hernandez`}</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { ThemeSynchronizer } from '../components/theme'
import PageReset from '../components/other'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageReset>
      <RecoilRoot>
        <ThemeSynchronizer />
        <Component {...pageProps} />
      </RecoilRoot>
    </PageReset>
  )
}

export default MyApp

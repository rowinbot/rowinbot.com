import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { ThemeSynchronizer } from '../components/theme'
import { PageReset } from '../components/other'

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-app' })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <PageReset>
        <RecoilRoot>
          <ThemeSynchronizer />

          <Component {...pageProps} />
        </RecoilRoot>
      </PageReset>
    </main>
  )
}

export default MyApp

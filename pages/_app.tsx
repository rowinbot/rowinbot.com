import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeSynchronizer } from '../components/theme'
import { PageReset } from '../components/layout'
import { Provider } from 'jotai'
import { Poppins } from '@next/font/google'
import clsx from 'clsx'

const appFont = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-app',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={clsx(appFont.className, 'app-text')}>
      <Provider>
        <PageReset>
          <ThemeSynchronizer />

          <Component {...pageProps} />
        </PageReset>
      </Provider>
    </main>
  )
}

export default MyApp

import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import styles from './styles/global.css'
import { Provider } from 'jotai'
import { PageReset } from './components/layout'
import { ThemeSynchronizer, getConciseTheme } from './components/theme'
import clsx from 'clsx'
import { getThemeSession } from './utils/theme.server'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Inter-Variable.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/JetBrainsMono-Variable.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Rowin Hernandez',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ request }: LoaderArgs) {
  const sessionTheme = await getThemeSession(request)
  const theme = sessionTheme.getTheme()

  return {
    theme,
    env: {
      NODE_ENV: process.env.NODE_ENV,
    },
  }
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <html
      lang="en"
      className={clsx(getConciseTheme(data.theme) === 'dark' && 'dark')}
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
window.__env = ${JSON.stringify(data.env)};`,
          }}
        />

        <main>
          <Provider>
            <PageReset>
              <ThemeSynchronizer themeFromServer={data.theme} />

              <Outlet />
            </PageReset>
          </Provider>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

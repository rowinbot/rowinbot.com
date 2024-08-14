import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import styles from './styles/global.css?url'
import { Provider } from 'jotai'
import { ThemeSynchronizer, getConciseTheme } from './components/theme'
import clsx from '~/utils/clsx'
import { getThemeSession } from './utils/theme.server'
import { restrictedRouteRedirect } from './utils/misc.server'
import MainLayout from './components/layout/main-layout'
import { getSocialMetas } from './utils/seo'
import { websiteUrl } from './utils/misc'

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

export const meta: MetaFunction = () => {
  return getSocialMetas({
    title: 'Rowin Hernandez',
    url: websiteUrl,
  })
}

export function action() {
  throw restrictedRouteRedirect()
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionTheme = await getThemeSession(request)
  const theme = sessionTheme.getTheme()

  return {
    theme,
    url: request.url,
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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

        <Provider>
          <ThemeSynchronizer themeFromServer={data.theme} />

          <MainLayout>
            <Outlet />
          </MainLayout>
        </Provider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

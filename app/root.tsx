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
  useLocation,
} from '@remix-run/react'

import styles from './styles/global.css?url'
import { Provider } from 'jotai'
import { ThemeSynchronizer, getConciseTheme } from './components/theme'
import clsx from '~/utils/clsx'
import { getThemeSession } from './utils/theme.server'
import { restrictedRouteRedirect } from './utils/misc.server'
import MainLayout from './components/layout/main-layout'
import { getSocialMetaTags } from './utils/seo'
import { websiteUrl } from './utils/misc'
import { useEffect } from 'react'

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
  return getSocialMetaTags({
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

  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Scroll to the element with the hash with a safe timeout
      const timeout = window.setTimeout(() => {
        const element = document.querySelector(location.hash)
        console.log('element', element, location.hash)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          })
        }
      }, 50)

      return () => window.clearTimeout(timeout)
    }
  }, [location.hash])

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

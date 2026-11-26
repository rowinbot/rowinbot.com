import { Provider } from 'jotai'
import { useEffect } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteLoaderData,
} from 'react-router'

import plexMono400 from './assets/fonts/ibm-plex-mono-latin-400.woff2?url'
import plexMono500 from './assets/fonts/ibm-plex-mono-latin-500.woff2?url'
import { ErrorView } from './components/layout/error-view'
import MainLayout from './components/layout/main-layout'
import { ThemeSynchronizer, getConciseTheme } from './components/theme'
import styles from './styles/global.css?url'
import { websiteUrl } from './utils/misc'
import {
  removeTrailingSlashes,
  restrictedRouteRedirect,
} from './utils/misc.server'
import { getSocialMetaTags } from './utils/seo'
import { getThemeSession } from './utils/theme.server'

import type { Route } from './+types/root'

const cabinetGroteskCss =
  'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900'

const cabinetGroteskPreloads = [
  'XMXWOHABYLQDJ42L65EFRYNVRY37HQCB/B2O4O6V3JMFM2WDCYQI3A47L5U4THDUL/WN5274VQ3AUBDFP74GB4EC4XYJ3EKVNE',
  'ZX6AQLSFYVDPN2URWO2MQFGTYYOHIS64/TPYPKOYWFQVNJHLLRXD4KFYX4LUOUW4Z/6QH2ALVTTK7IRVO5MYOQQ3OZNXW5SSS3',
  '54BYDK52GK4J6SPDN2E656FIZHUETKL3/ACYE4XDNEUAHIOQEOGPYPDVAVDI5P67Q/TZVUWRP4UW5PEJWBLXHG5VVGPODI2WLC',
]

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://api.fontshare.com' },
  {
    rel: 'preconnect',
    href: 'https://cdn.fontshare.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href: plexMono400,
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href: plexMono500,
    crossOrigin: 'anonymous',
  },
  ...cabinetGroteskPreloads.map((path) => ({
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href: `https://cdn.fontshare.com/wf/${path}.woff2`,
    crossOrigin: 'anonymous' as const,
  })),
  { rel: 'stylesheet', href: cabinetGroteskCss },
  { rel: 'stylesheet', href: styles },
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
]

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rowin Hernandez',
  url: websiteUrl,
  image: `${websiteUrl}/apple-touch-icon.png`,
  jobTitle: 'Senior Product Engineer & Tech Lead',
  worksFor: {
    '@type': 'Organization',
    name: 'Kalebtec',
    url: 'https://kalebtec.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vigo',
    addressRegion: 'Galicia',
    addressCountry: 'ES',
  },
  knowsAbout: [
    'Product Engineering',
    'TypeScript',
    'React',
    'Node.js',
    'AI agent infrastructure',
    'Real-time media',
  ],
  sameAs: [
    'https://github.com/rowinbot',
    'https://twitter.com/rowinbot',
    'https://www.linkedin.com/in/rowinbot/',
  ],
}

export const meta: Route.MetaFunction = ({ error }) => {
  if (error) {
    const notFound = isRouteErrorResponse(error) && error.status === 404

    return [
      {
        title: notFound
          ? 'Page not found | Rowin Hernandez'
          : 'Something went wrong | Rowin Hernandez',
      },
      { name: 'robots', content: 'noindex' },
    ]
  }

  return getSocialMetaTags({
    title: 'Rowin Hernandez',
    url: websiteUrl,
  })
}

export function action(_: Route.ActionArgs) {
  throw restrictedRouteRedirect()
}

export async function loader({ request }: Route.LoaderArgs) {
  removeTrailingSlashes(request)

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

export function Layout({ children }: { children: React.ReactNode }) {
  const rootData = useRouteLoaderData<typeof loader>('root')

  return (
    <html
      lang="en"
      className={getConciseTheme(rootData?.theme ?? 'system-unknown')}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#F3EFE6"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#16202B"
          media="(prefers-color-scheme: dark)"
        />

        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className="bg-paper text-ink font-sans antialiased">
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
window.__env = ${JSON.stringify(rootData?.env ?? {})};`,
          }}
        />

        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Scroll to the element with the hash with a safe timeout
      const timeout = window.setTimeout(() => {
        const element = document.querySelector(location.hash)

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
    <Provider>
      <ThemeSynchronizer themeFromServer={loaderData.theme} />

      <MainLayout>
        <Outlet />
      </MainLayout>
    </Provider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const rootData = useRouteLoaderData<typeof loader>('root')
  const notFound = isRouteErrorResponse(error) && error.status === 404
  const status = isRouteErrorResponse(error) ? error.status : 500

  return (
    <Provider>
      <ThemeSynchronizer
        themeFromServer={rootData?.theme ?? 'system-unknown'}
      />

      <MainLayout>
        <ErrorView
          status={status}
          heading={notFound ? 'Page not found' : 'Something went wrong'}
          message={
            notFound
              ? 'That page does not exist, or it moved. The homepage and the journal are the quickest ways back.'
              : 'The page failed to load. Try again in a moment, or head back to the homepage.'
          }
        />
      </MainLayout>
    </Provider>
  )
}

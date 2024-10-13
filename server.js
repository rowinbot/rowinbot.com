import { createRequestHandler } from '@remix-run/express'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      )

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : await import('./build/server/index.js'),
})

const app = express()

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares)
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    '/assets',
    express.static('build/client/assets', { immutable: true, maxAge: '1y' })
  )
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('build/client', { maxAge: '1h' }))

app.use('/journal', express.static('content/journal', { maxAge: '1h' }))
app.use('/og', express.static('content/build/og', { maxAge: '1h' }))

app.use(morgan('tiny'))

// Remove trailing slashes, see: https://github.com/epicweb-dev/epic-stack/blob/main/docs/redirects.md#remove-trailing-slashes
app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length)
    const safePath = req.path.slice(0, -1).replace(/\/+/g, '/')
    res.redirect(301, safePath + query)
  } else {
    next()
  }
})

// handle SSR requests
app.all('*', remixHandler)

const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
)

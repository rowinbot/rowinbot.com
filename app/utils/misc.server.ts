import { redirect } from '@remix-run/node'

const defaultRedirect = 'https://www.youtube.com/watch?v=k4V3Mo61fJM'

export function restrictedRouteRedirect() {
  return redirect(defaultRedirect)
}

export function isEnoentError(
  error: unknown
): error is Error & { code: 'ENOENT' } {
  if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
    return true
  }

  return false
}

export function removeTrailingSlashes(request: Request) {
  let url = new URL(request.url)
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = url.pathname.slice(0, -1)
    throw redirect(url.toString())
  }
}

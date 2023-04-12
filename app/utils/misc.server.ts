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

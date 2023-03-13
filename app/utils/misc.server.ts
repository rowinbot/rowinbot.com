import { redirect } from '@remix-run/node'

const defaultRedirect = 'https://www.youtube.com/watch?v=k4V3Mo61fJM'

export function restrictedRouteRedirect() {
  return redirect(defaultRedirect)
}

import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { isTheme } from '~/components/theme'
import { restrictedRouteRedirect } from '~/utils/misc.server'
import { getThemeSession } from '~/utils/theme.server'

export const themeActionPath = '/resources/theme'

export async function action({ request }: DataFunctionArgs) {
  const success = false

  if (request.method === 'POST') {
    const theme = (await request.formData()).get('theme')

    if (isTheme(theme)) {
      const themeSession = await getThemeSession(request)
      themeSession.setTheme(theme)

      return json(
        { success: true },
        { headers: { 'Set-Cookie': await themeSession.commit() } }
      )
    }
  } else {
    throw restrictedRouteRedirect()
  }

  return json({ success })
}

/**
 * Coldplay - Fix You
 */
export async function loader() {
  throw restrictedRouteRedirect()
}

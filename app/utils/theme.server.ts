import { createCookieSessionStorage } from 'react-router';

import type { AppTheme } from '~/components/theme'
import { isTheme } from '~/components/theme'
import { getRequiredServerEnv } from '~/utils/env.server'

interface ThemeSession {
  theme: AppTheme
}

const themeStorage = createCookieSessionStorage<ThemeSession>({
  cookie: {
    name: 'app-theme',
    secure: true,
    secrets: [getRequiredServerEnv('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : 'system-unknown'
    },
    setTheme: (theme: AppTheme) => session.set('theme', theme),
    commit: () =>
      themeStorage.commitSession(session, { expires: new Date('2088-10-18') }),
  }
}

import { useHydrateAtoms } from 'jotai/utils'
import { useEffect } from 'react'

import { getConciseTheme, type AppTheme } from './app-theme'
import { appThemeAtom, useAppTheme, useSetAppTheme } from './use-app-theme'

export interface ThemeSynchronizerProps {
  themeFromServer: AppTheme
}

export function ThemeSynchronizer({ themeFromServer }: ThemeSynchronizerProps) {
  useHydrateAtoms([[appThemeAtom, themeFromServer]])
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(getConciseTheme(theme))

    if (!theme.includes('system')) {
      return
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)')

    function syncSystemTheme(event: MediaQueryListEvent | MediaQueryList) {
      setTheme(event.matches ? 'system-dark' : 'system-light')
    }

    query.addEventListener('change', syncSystemTheme)
    syncSystemTheme(query)

    return () => query.removeEventListener('change', syncSystemTheme)
  }, [theme, setTheme])

  return null
}

import { useSetAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffect } from 'react'

import { getConciseTheme, type AppTheme } from './app-theme'
import { appThemeAtom, useAppTheme } from './use-app-theme'

export interface ThemeSynchronizerProps {
  themeFromServer: AppTheme
}

function applyConciseTheme(concise: 'light' | 'dark') {
  const root = document.documentElement

  if (root.classList.contains(concise) && root.classList.length === 1) return

  root.classList.remove('light', 'dark')
  root.classList.add(concise)
}

export function ThemeSynchronizer({ themeFromServer }: ThemeSynchronizerProps) {
  useHydrateAtoms([[appThemeAtom, themeFromServer]])
  const theme = useAppTheme()
  const setThemeAtom = useSetAtom(appThemeAtom)

  useEffect(() => {
    if (!theme.includes('system')) {
      applyConciseTheme(getConciseTheme(theme))
      return
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)')

    function syncSystemTheme(event: MediaQueryListEvent | MediaQueryList) {
      applyConciseTheme(event.matches ? 'dark' : 'light')
      setThemeAtom(event.matches ? 'system-dark' : 'system-light')
    }

    query.addEventListener('change', syncSystemTheme)
    syncSystemTheme(query)

    return () => query.removeEventListener('change', syncSystemTheme)
  }, [theme, setThemeAtom])

  return null
}

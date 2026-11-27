import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { useFetcher } from 'react-router'

import { themeActionPath } from '~/routes/theme.route'

import type { AppTheme } from './app-theme'

export const appThemeAtom = atom<AppTheme>('system-unknown')

export const useAppTheme = () => useAtomValue(appThemeAtom)

export function useSetAppTheme() {
  const [current, setTheme] = useAtom(appThemeAtom)
  const { submit } = useFetcher()

  return useCallback(
    (theme: StateSetFunctionArg<AppTheme>) => {
      const next = typeof theme === 'function' ? theme(current) : theme

      if (next === current) return

      setTheme(next)
      submit({ theme: next }, { method: 'post', action: themeActionPath })
    },
    [current, submit, setTheme]
  )
}

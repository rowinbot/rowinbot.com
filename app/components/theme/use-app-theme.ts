import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useFetcher } from 'react-router'

import { themeActionPath } from '~/routes/theme.route'

import type { AppTheme } from './app-theme'

export const appThemeAtom = atom<AppTheme>('system-unknown')

export const useAppTheme = () => useAtomValue(appThemeAtom)

export function useSetAppTheme() {
  const setTheme = useSetAtom(appThemeAtom)
  const { submit } = useFetcher()

  return useCallback(
    (theme: StateSetFunctionArg<AppTheme>) => {
      setTheme((current) => {
        const next = typeof theme === 'function' ? theme(current) : theme

        submit({ theme: next }, { method: 'post', action: themeActionPath })

        return next
      })
    },
    [submit, setTheme]
  )
}

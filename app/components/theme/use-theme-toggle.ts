import { useCallback } from 'react'

import { useAppSound } from '~/components/sound'

import { getConciseTheme, getOppositeTheme } from './app-theme'
import { useAppTheme, useSetAppTheme } from './use-app-theme'
import themeModeSfx from '../../assets/sfx/theme-mode-sfx.mp3'

export interface ThemeToggleState {
  isDark: boolean
  a11yLabel: string
  toggle: () => void
}

export function useThemeToggle(): ThemeToggleState {
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()

  const [playDark] = useAppSound(themeModeSfx, { playbackRate: 1.2 })
  const [playLight] = useAppSound(themeModeSfx)

  const isDark = getConciseTheme(theme) === 'dark'
  const a11yLabel = `Switch to ${getOppositeTheme(theme)} mode`

  const toggle = useCallback(() => {
    if (isDark) {
      playDark()
    } else {
      playLight()
    }

    setTheme(getOppositeTheme)
  }, [isDark, playDark, playLight, setTheme])

  return { isDark, a11yLabel, toggle }
}

import { useCallback, useEffect, useId } from 'react'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useSpring, animated, easings } from '@react-spring/web'
import themeModeSfx from '../assets/sfx/theme-mode-sfx.mp3'
import { useAppSound } from './soundEffects'
import { useHydrateAtoms } from 'jotai/utils'
import { useFetcher } from 'react-router'
import { themeActionPath } from '~/routes/theme.route'

const appThemes = [
  'light',
  'dark',
  'system-light',
  'system-dark',
  'system-unknown',
] as const
export type AppTheme = (typeof appThemes)[number]

export type AppConciseTheme = 'light' | 'dark'

export function isTheme(theme: unknown): theme is AppTheme {
  if (typeof theme !== 'string') {
    return false
  }

  return appThemes.includes(theme as AppTheme)
}

/**
 * Handles the selected theme, tho the theme is *mostly* used from CSS.
 */
const appThemeAtom = atom<AppTheme>('system-unknown')

export const useAppTheme = () => useAtomValue(appThemeAtom)
export const useSetAppTheme = () => {
  const setAtom = useSetAtom(appThemeAtom)
  const { submit: fetcherSubmit } = useFetcher()

  return useCallback(
    (theme: StateSetFunctionArg<AppTheme>) => {
      setAtom((currentTheme) => {
        const nextTheme =
          typeof theme === 'function' ? theme(currentTheme) : theme

        fetcherSubmit(
          { theme: nextTheme },
          { method: 'post', action: themeActionPath }
        )

        return nextTheme
      })
    },
    [fetcherSubmit, setAtom]
  )
}

export function getConciseTheme(theme: AppTheme): AppConciseTheme {
  switch (theme) {
    case 'system-dark':
    case 'dark':
      return 'dark'

    case 'system-light':
    case 'light':
      return 'light'

    // As of 2023 dark mode is the default.
    case 'system-unknown':
    default:
      return 'light'
  }
}

function getOppositeTheme(theme: AppTheme): AppConciseTheme {
  const isCurrentlyDark = getConciseTheme(theme) === 'dark'

  return isCurrentlyDark ? 'light' : 'dark'
}

interface ThemeSynchronizerProps {
  themeFromServer: AppTheme
}

/**
 * Synchronizes the theme state with the document classes
 */
export function ThemeSynchronizer(props: ThemeSynchronizerProps) {
  useHydrateAtoms([[appThemeAtom, props.themeFromServer]])
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()

  useEffect(() => {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add(getConciseTheme(theme))

    // Check if user wants a custom theme for the page.
    if (!theme.includes('system')) {
      return
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)')

    function systemThemeChangeListener(
      event: MediaQueryListEvent | MediaQueryList
    ) {
      let nextTheme: AppTheme

      if (event.matches) {
        nextTheme = 'system-dark'
      } else {
        nextTheme = 'system-light'
      }

      setTheme(nextTheme)
    }

    query.addEventListener('change', systemThemeChangeListener)
    systemThemeChangeListener(query)

    return () => query.removeEventListener('change', systemThemeChangeListener)
  }, [theme, setTheme])

  return null
}

function ThemeToggleIcon() {
  const theme = useAppTheme()
  const maskId = useId()

  const isCurrentlyDark = getConciseTheme(theme) === 'dark'

  const svgTransform = useSpring({
    transform: isCurrentlyDark ? 'rotate(0)' : 'rotate(180)',
    config: { easing: easings.easeOutQuad },
  })

  const { r: planetR } = useSpring({
    r: isCurrentlyDark ? 10 : 7,
    config: { easing: easings.easeOutQuad },
  })

  const mask = useSpring({
    cy: isCurrentlyDark ? 10 : 30,
    cx: isCurrentlyDark ? 20 : 30,
    r: isCurrentlyDark ? 9 : 0,
    config: { easing: easings.easeOutQuad },
  })

  return (
    <animated.span style={svgTransform}>
      <svg
        aria-hidden
        className="fill-black dark:fill-white"
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id={maskId}>
          <rect x={0} y={0} width={30} height={30} fill="white"></rect>
          <animated.circle
            cx={mask.cx}
            cy={mask.cy}
            r={mask.r}
            fill="black"
          ></animated.circle>
        </mask>

        <animated.circle
          mask={`url(#${maskId})`}
          cx={15}
          cy={15}
          r={planetR}
        ></animated.circle>

        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={7}
          y1={10}
          x2={5}
          y2={9}
          strokeWidth={3}
          stroke="black"
        ></line>
        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={15}
          y1={6}
          x2={15}
          y2={4}
          strokeWidth={3}
          stroke="black"
        ></line>
        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={23}
          y1={10}
          x2={25}
          y2={9}
          strokeWidth={3}
          stroke="black"
        ></line>

        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={7}
          y1={20}
          x2={5}
          y2={21}
          strokeWidth={3}
          stroke="black"
        ></line>
        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={15}
          y1={24}
          x2={15}
          y2={26}
          strokeWidth={3}
          stroke="black"
        ></line>
        <line
          strokeLinecap="round"
          className="dark:scale-0"
          x1={23}
          y1={20}
          x2={25}
          y2={21}
          strokeWidth={3}
          stroke="black"
        ></line>
      </svg>
    </animated.span>
  )
}

export function ThemeToggleCircularButton() {
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()

  const [playSoundDark] = useAppSound(themeModeSfx, { playbackRate: 1.2 })
  const [playSoundLight] = useAppSound(themeModeSfx)

  const isCurrentlyDark = getConciseTheme(theme) === 'dark'
  const a11yLabel = `Switch to ${getOppositeTheme(theme)} mode`

  const playSound = useCallback(() => {
    if (isCurrentlyDark) {
      playSoundDark()
    } else {
      playSoundLight()
    }
  }, [isCurrentlyDark, playSoundDark, playSoundLight])

  const handleClick = useCallback(() => {
    playSound()
    setTheme(getOppositeTheme)
  }, [playSound, setTheme])

  return (
    <button
      className="align-middle inline-flex"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={handleClick}
    >
      <ThemeToggleIcon />
    </button>
  )
}

export function ThemeToggleButton() {
  const theme = useAppTheme()
  const setTheme = useSetAppTheme()

  const [playSoundDark] = useAppSound(themeModeSfx, { playbackRate: 1.2 })
  const [playSoundLight] = useAppSound(themeModeSfx)

  const isCurrentlyDark = getConciseTheme(theme) === 'dark'
  const a11yLabel = `Switch to ${getOppositeTheme(theme)} mode`

  const playSound = useCallback(() => {
    if (isCurrentlyDark) {
      playSoundDark()
    } else {
      playSoundLight()
    }
  }, [isCurrentlyDark, playSoundDark, playSoundLight])

  const handleClick = useCallback(() => {
    playSound()
    setTheme(getOppositeTheme)
  }, [playSound, setTheme])

  return (
    <button
      className="flex items-center justify-center gap-1 border border-slate-950 dark:border-slate-600 rounded-full py-2 px-4 app-text"
      title={a11yLabel}
      onClick={handleClick}
    >
      <ThemeToggleIcon />

      {a11yLabel}
    </button>
  )
}

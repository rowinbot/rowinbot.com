export const appThemes = [
  'light',
  'dark',
  'system-light',
  'system-dark',
  'system-unknown',
] as const

export type AppTheme = (typeof appThemes)[number]

export type AppConciseTheme = 'light' | 'dark'

export function isTheme(theme: unknown): theme is AppTheme {
  return typeof theme === 'string' && appThemes.includes(theme as AppTheme)
}

export function getConciseTheme(theme: AppTheme): AppConciseTheme {
  switch (theme) {
    case 'system-dark':
    case 'dark':
      return 'dark'

    case 'system-light':
    case 'light':
      return 'light'

    case 'system-unknown':
    default:
      return 'light'
  }
}

export function getOppositeTheme(theme: AppTheme): AppConciseTheme {
  return getConciseTheme(theme) === 'dark' ? 'light' : 'dark'
}

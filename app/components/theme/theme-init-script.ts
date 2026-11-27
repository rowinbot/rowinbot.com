import type { AppTheme } from './app-theme'

export function getThemeInitScript(theme: AppTheme) {
  return `(function(){var t=${JSON.stringify(theme)};if(t.indexOf('system')!==0)return;var r=document.documentElement;var d=window.matchMedia('(prefers-color-scheme: dark)').matches;r.classList.remove('light','dark');r.classList.add(d?'dark':'light')})()`
}

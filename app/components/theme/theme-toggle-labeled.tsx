import { SunMoonIcon } from './sun-moon-icon'
import { useThemeToggle } from './use-theme-toggle'

export function ThemeToggleLabeled() {
  const { isDark, a11yLabel, toggle } = useThemeToggle()

  return (
    <button
      className="flex items-center justify-center gap-2 border border-rule px-4 py-2 font-mono text-meta text-ink transition-colors hover:border-mark hover:text-mark"
      title={a11yLabel}
      onClick={toggle}
    >
      <SunMoonIcon isDark={isDark} />
      {a11yLabel}
    </button>
  )
}

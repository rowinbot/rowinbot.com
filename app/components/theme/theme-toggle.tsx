import { SunMoonIcon } from './sun-moon-icon'
import { useThemeToggle } from './use-theme-toggle'

export function ThemeToggle() {
  const { isDark, a11yLabel, toggle } = useThemeToggle()

  return (
    <button
      className="align-middle inline-flex"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={toggle}
    >
      <SunMoonIcon isDark={isDark} />
    </button>
  )
}

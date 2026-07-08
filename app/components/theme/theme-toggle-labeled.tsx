import { SunMoonIcon } from './sun-moon-icon'
import { useThemeToggle } from './use-theme-toggle'

export function ThemeToggleLabeled() {
  const { isDark, a11yLabel, toggle } = useThemeToggle()

  return (
    <button
      className="flex items-center justify-center gap-1 border border-cyber-border py-2 px-4 text-cyber-text transition-all duration-300 hover:border-cyber-cyan/50 hover:text-cyber-cyan"
      title={a11yLabel}
      onClick={toggle}
    >
      <SunMoonIcon isDark={isDark} />
      {a11yLabel}
    </button>
  )
}

import { SoundIcon } from './sound-icon'
import { useSoundToggle } from './use-sound-toggle'

export function SoundToggleLabeled() {
  const { isActive, a11yLabel, toggle } = useSoundToggle()

  return (
    <button
      className="flex items-center justify-center gap-1 border border-cyber-border py-2 px-4 text-cyber-text transition-all duration-300 hover:border-cyber-cyan/50 hover:text-cyber-cyan"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={toggle}
    >
      <SoundIcon isActive={isActive} />
      {a11yLabel}
    </button>
  )
}

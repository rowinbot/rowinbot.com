import { SoundIcon } from './sound-icon'
import { useSoundToggle } from './use-sound-toggle'

export function SoundToggleLabeled() {
  const { isActive, a11yLabel, toggle } = useSoundToggle()

  return (
    <button
      className="flex items-center justify-center gap-2 border border-rule px-4 py-2 font-mono text-meta text-ink transition-colors hover:border-mark hover:text-mark"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={toggle}
    >
      <SoundIcon isActive={isActive} />
      {a11yLabel}
    </button>
  )
}

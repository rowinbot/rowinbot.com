import { SoundIcon } from './sound-icon'
import { useSoundToggle } from './use-sound-toggle'

export function SoundToggle() {
  const { isActive, a11yLabel, toggle } = useSoundToggle()

  return (
    <button
      className="align-middle inline-flex"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={toggle}
    >
      <SoundIcon isActive={isActive} />
    </button>
  )
}

export type SoundEffectsStatus =
  'active' | 'inactive' | 'system-inactive' | 'system-unknown'

export type SoundEffectsConciseStatus = 'active' | 'inactive'

export function getConciseSoundEffectsStatus(
  status: SoundEffectsStatus
): SoundEffectsConciseStatus {
  switch (status) {
    case 'inactive':
      return 'inactive'

    // Absent an explicit choice, sound stays on — most visitors never toggle it.
    case 'active':
    case 'system-unknown':
    default:
      return 'active'
  }
}

export function getToggledSoundEffectsStatus(
  status: SoundEffectsStatus
): SoundEffectsConciseStatus {
  return getConciseSoundEffectsStatus(status) === 'active'
    ? 'inactive'
    : 'active'
}

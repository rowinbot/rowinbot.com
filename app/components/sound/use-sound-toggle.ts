import { useAtom } from 'jotai'
import { useCallback } from 'react'
import useSound from 'use-sound'

import {
  getConciseSoundEffectsStatus,
  getToggledSoundEffectsStatus,
} from './sound-effects-status'
import { baseAudioConfig, soundEffectsAtom } from './use-app-sound'
import volumeOffSfx from '../../assets/sfx/volume-off-sfx-v2.mp3'
import volumeOnSfx from '../../assets/sfx/volume-on-sfx-v2.mp3'

export interface SoundToggleState {
  isActive: boolean
  a11yLabel: string
  toggle: () => void
}

export function useSoundToggle(): SoundToggleState {
  const [status, setStatus] = useAtom(soundEffectsAtom)

  const [playOn] = useSound(volumeOnSfx, baseAudioConfig)
  const [playOff] = useSound(volumeOffSfx, baseAudioConfig)

  const isActive = getConciseSoundEffectsStatus(status) === 'active'
  const a11yLabel = `${isActive ? 'Disable' : 'Enable'} sound effects`

  const toggle = useCallback(() => {
    if (isActive) {
      playOff()
    } else {
      playOn()
    }

    setStatus(getToggledSoundEffectsStatus)
  }, [isActive, playOff, playOn, setStatus])

  return { isActive, a11yLabel, toggle }
}

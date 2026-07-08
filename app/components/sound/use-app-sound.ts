import { atom, useAtomValue } from 'jotai'
import useSound from 'use-sound'

import {
  getConciseSoundEffectsStatus,
  type SoundEffectsStatus,
} from './sound-effects-status'

export const soundEffectsAtom = atom<SoundEffectsStatus>('system-unknown')

export const baseAudioConfig = { volume: 0.3 }

export const useAppSound: typeof useSound = (src, config) => {
  const status = useAtomValue(soundEffectsAtom)

  return useSound(src, {
    soundEnabled: getConciseSoundEffectsStatus(status) === 'active',
    ...baseAudioConfig,
    ...config,
  })
}

import { atom, useAtomValue } from 'jotai'
import { useCallback } from 'react'

import { playSound, type PlaySoundOptions } from './play-sound'
import {
  getConciseSoundEffectsStatus,
  type SoundEffectsStatus,
} from './sound-effects-status'

export const soundEffectsAtom = atom<SoundEffectsStatus>('system-unknown')

export const baseAudioConfig = { volume: 0.3 }

export function useAppSound(src: string, options?: PlaySoundOptions) {
  const status = useAtomValue(soundEffectsAtom)
  const enabled = getConciseSoundEffectsStatus(status) === 'active'
  const playbackRate = options?.playbackRate

  return useCallback(() => {
    if (!enabled) return

    playSound(src, { ...baseAudioConfig, playbackRate })
  }, [enabled, src, playbackRate])
}

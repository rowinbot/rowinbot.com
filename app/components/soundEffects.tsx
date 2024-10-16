import { useCallback, useId } from 'react'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useSpring, animated, easings } from '@react-spring/web'

// @ts-ignore
import volumeOnSfx from '../assets/sfx/volume-on-sfx-v2.mp3'
// @ts-ignore
import volumeOffSfx from '../assets/sfx/volume-off-sfx-v2.mp3'
import useSound from 'use-sound'

type SoundEffectsStatus =
  | 'active'
  | 'inactive'
  | 'system-inactive'
  | 'system-unknown'

type SoundEffectsConciseStatus = 'active' | 'inactive'

/**
 * Handles the status of sound effects
 */
const soundEffectsAtom = atom<SoundEffectsStatus>('system-unknown')

const regularAudioConfig = { volume: 0.3 }

export const useAppSound: typeof useSound = (src, config) => {
  const status = useAtomValue(soundEffectsAtom)
  return useSound(src, {
    soundEnabled: getConciseSoundEffectsStatus(status) === 'active',
    ...regularAudioConfig,
    ...config,
  })
}

function getConciseSoundEffectsStatus(
  state: SoundEffectsStatus
): SoundEffectsConciseStatus {
  switch (state) {
    case 'inactive':
      return 'inactive'

    case 'active':
    // Most users don't care about noise
    case 'system-unknown':
    default:
      return 'active'
  }
}

function getToggleSoundEffectsStatus(
  state: SoundEffectsStatus
): SoundEffectsConciseStatus {
  const isCurrentlyActive = getConciseSoundEffectsStatus(state) === 'active'

  return isCurrentlyActive ? 'inactive' : 'active'
}

function SoundEffectsStatusIcon() {
  const [status] = useAtom(soundEffectsAtom)
  const isCurrentlyActive = getConciseSoundEffectsStatus(status) === 'active'

  const maskId = useId()
  const svgTransform = useSpring({
    to: [
      {
        transform: !isCurrentlyActive
          ? 'rotate(0deg) scale(1)'
          : 'rotate(-15deg) scale(1.1)',
      },
      {
        transform: !isCurrentlyActive
          ? 'rotate(0deg) scale(1)'
          : 'rotate(15deg) scale(1)',
      },
      { transform: 'rotate(0deg) scale(1)' },
    ],
    config: {
      easing: easings.easeOutQuad,
      duration: 100,
    },
  })

  const { opacity: barsOpacity } = useSpring({
    opacity: isCurrentlyActive ? 1 : 0,
    config: {
      easing: easings.easeOutQuad,
      duration: 250,
    },
  })

  return (
    <animated.span style={svgTransform}>
      <svg
        aria-hidden
        className="fill-black stroke-black dark:fill-white dark:stroke-white"
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id={maskId}>
          <rect x={0} y={0} width={30} height={30} fill="white"></rect>
          <circle
            cx={15}
            cy={10}
            r={1}
            className="fill-black stroke-black"
          ></circle>
          <circle
            cx={15}
            cy={18}
            r={3}
            className="fill-black stroke-black"
          ></circle>
          <circle
            cx={15}
            cy={18}
            r={1}
            className="fill-white stroke-white"
          ></circle>
        </mask>

        <rect
          mask={`url(#${maskId})`}
          x={10}
          y={4}
          width={10}
          height={22}
          strokeWidth={2}
          strokeLinejoin="round"
        ></rect>

        <line
          x1={11}
          y1={2}
          x2={19}
          y2={2}
          strokeWidth={2}
          strokeLinejoin="round"
        ></line>

        <line
          x1={12}
          y1={24}
          x2={12}
          y2={29}
          strokeWidth={2}
          strokeLinejoin="round"
        ></line>

        <line
          x1={18}
          y1={24}
          x2={18}
          y2={29}
          strokeWidth={2}
          strokeLinejoin="round"
        ></line>

        <animated.path
          d="M5 8 A2 4 0 0 0 5 22"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={barsOpacity}
        />
        <animated.path
          d="M25 8 A2 4 0 0 1 25 22"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={barsOpacity}
        />

        <animated.path
          d="M6 12 A2 4 0 0 0 6 18"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={barsOpacity}
        />
        <animated.path
          d="M24 12 A2 4 0 0 1 24 18"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={barsOpacity}
        />
      </svg>
    </animated.span>
  )
}

export function SoundEffectsStatusCircularToggle() {
  const [status, setTheme] = useAtom(soundEffectsAtom)

  const [playOn] = useSound(volumeOnSfx, regularAudioConfig)
  const [playOff] = useSound(volumeOffSfx, regularAudioConfig)

  const isCurrentlyActive = getConciseSoundEffectsStatus(status) === 'active'
  const a11yLabel = `${isCurrentlyActive ? 'Disable' : 'Enable'} sound effects`

  const playSound = useCallback(() => {
    if (isCurrentlyActive) {
      playOff()
    } else {
      playOn()
    }
  }, [isCurrentlyActive, playOff, playOn])

  const handleClick = useCallback(() => {
    playSound()

    setTheme(getToggleSoundEffectsStatus)
  }, [playSound, setTheme])

  return (
    <button
      className="align-middle inline-flex"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={handleClick}
    >
      <SoundEffectsStatusIcon />
    </button>
  )
}

export function SoundEffectsStatusToggle() {
  const [status, setTheme] = useAtom(soundEffectsAtom)

  const [playOn] = useSound(volumeOnSfx, regularAudioConfig)
  const [playOff] = useSound(volumeOffSfx, regularAudioConfig)

  const isCurrentlyActive = getConciseSoundEffectsStatus(status) === 'active'
  const a11yLabel = `${isCurrentlyActive ? 'Disable' : 'Enable'} sound effects`

  const playSound = useCallback(() => {
    if (isCurrentlyActive) {
      playOff()
    } else {
      playOn()
    }
  }, [isCurrentlyActive, playOff, playOn])

  const handleClick = useCallback(() => {
    playSound()

    setTheme(getToggleSoundEffectsStatus)
  }, [playSound, setTheme])

  return (
    <button
      className="flex items-center justify-center gap-1 border border-slate-950 dark:border-slate-600 rounded-full py-2 px-4 app-text"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={handleClick}
    >
      <SoundEffectsStatusIcon />

      {a11yLabel}
    </button>
  )
}

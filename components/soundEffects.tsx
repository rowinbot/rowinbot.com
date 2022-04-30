import { useCallback } from 'react'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { useSpring, animated, easings } from 'react-spring'

// @ts-ignore
import volumeOnSfx from '../assets/sfx/volume-on-sfx.mp3'
// @ts-ignore
import volumeOffSfx from '../assets/sfx/volume-off-sfx.mp3'
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
const soundEffectsAtom = atom<SoundEffectsStatus>({
  key: 'sound-effects',
  default: 'system-unknown',
})

export const useAppSound: typeof useSound = (src, config) => {
  const status = useRecoilValue(soundEffectsAtom)
  return useSound(src, {
    soundEnabled: getConciseSoundEffectsStatus(status) === 'active',
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

export default function SoundEffectsStatusToggle() {
  const [status, setTheme] = useRecoilState(soundEffectsAtom)

  const [playOn] = useSound(volumeOnSfx)
  const [playOff] = useSound(volumeOffSfx)

  const isCurrentlyActive = getConciseSoundEffectsStatus(status) === 'active'
  const a11yLabel = `${
    isCurrentlyActive ? 'Deactivate' : 'Activate'
  } sound effects`

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

  const svgTransform = useSpring({
    to: [
      {
        transform: !isCurrentlyActive
          ? 'rotate(-15deg) scale(1.1)'
          : 'rotate(0deg) scale(1)',
      },
      {
        transform: !isCurrentlyActive
          ? 'rotate(15deg) scale(1)'
          : 'rotate(0deg) scale(1)',
      },
      { transform: 'rotate(0deg) scale(1)' },
    ],
    from: { transform: 'rotate(0deg) scale(1)' },
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
    <button
      className="align-middle inline-flex"
      aria-label={a11yLabel}
      title={a11yLabel}
      onClick={handleClick}
    >
      <animated.span style={svgTransform}>
        <svg
          aria-hidden
          className="fill-black stroke-black dark:fill-white dark:stroke-white mb-1"
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="very-special-mask">
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
            mask="url(#very-special-mask)"
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
    </button>
  )
}

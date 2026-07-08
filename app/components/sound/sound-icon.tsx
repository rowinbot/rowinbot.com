import { animated, easings, useSpring } from '@react-spring/web'
import { useId } from 'react'

export interface SoundIconProps {
  isActive: boolean
}

export function SoundIcon({ isActive }: SoundIconProps) {
  const maskId = useId()

  const wobble = useSpring({
    to: [
      {
        transform: isActive
          ? 'rotate(-15deg) scale(1.1)'
          : 'rotate(0deg) scale(1)',
      },
      {
        transform: isActive
          ? 'rotate(15deg) scale(1)'
          : 'rotate(0deg) scale(1)',
      },
      { transform: 'rotate(0deg) scale(1)' },
    ],
    config: { easing: easings.easeOutQuad, duration: 100 },
  })

  const { opacity: wavesOpacity } = useSpring({
    opacity: isActive ? 1 : 0,
    config: { easing: easings.easeOutQuad, duration: 250 },
  })

  return (
    <animated.span style={wobble}>
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
          <rect x={0} y={0} width={30} height={30} fill="white" />
          <circle cx={15} cy={10} r={1} className="fill-black stroke-black" />
          <circle cx={15} cy={18} r={3} className="fill-black stroke-black" />
          <circle cx={15} cy={18} r={1} className="fill-white stroke-white" />
        </mask>

        <rect
          mask={`url(#${maskId})`}
          x={10}
          y={4}
          width={10}
          height={22}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        <line
          x1={11}
          y1={2}
          x2={19}
          y2={2}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <line
          x1={12}
          y1={24}
          x2={12}
          y2={29}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <line
          x1={18}
          y1={24}
          x2={18}
          y2={29}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        <animated.path
          d="M5 8 A2 4 0 0 0 5 22"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={wavesOpacity}
        />
        <animated.path
          d="M25 8 A2 4 0 0 1 25 22"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={wavesOpacity}
        />
        <animated.path
          d="M6 12 A2 4 0 0 0 6 18"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={wavesOpacity}
        />
        <animated.path
          d="M24 12 A2 4 0 0 1 24 18"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={wavesOpacity}
        />
      </svg>
    </animated.span>
  )
}

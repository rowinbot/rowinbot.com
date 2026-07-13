import { animated, easings, useSpring } from '@react-spring/web'

export interface SoundIconProps {
  isActive: boolean
}

export function SoundIcon({ isActive }: SoundIconProps) {
  const nudge = useSpring({
    to: [
      { transform: isActive ? 'translateX(-1px)' : 'translateX(0px)' },
      { transform: 'translateX(0px)' },
    ],
    config: { easing: easings.easeOutQuad, duration: 120 },
  })

  const waves = useSpring({
    opacity: isActive ? 1 : 0,
    config: { easing: easings.easeOutQuad, duration: 220 },
  })

  return (
    <animated.span style={nudge} className="inline-flex">
      <svg
        aria-hidden
        className="fill-ink"
        width={28}
        height={28}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* pixel speaker: a small back block joined to a taller cone face */}
        <rect x={6} y={13} width={4.5} height={6} rx={1.5} />
        <rect x={10} y={8.5} width={6} height={15} rx={2} />

        <animated.g opacity={waves.opacity}>
          <rect x={19} y={13} width={3.2} height={6} rx={1.2} />
          <rect x={24} y={9} width={3.2} height={14} rx={1.5} />
        </animated.g>
      </svg>
    </animated.span>
  )
}

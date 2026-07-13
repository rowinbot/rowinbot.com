import { animated, easings, useSpring } from '@react-spring/web'
import { useId } from 'react'

export interface SunMoonIconProps {
  isDark: boolean
}

// Pixel rays around the sun body, positioned on the 32-unit grid.
const RAYS = [
  { x: 14, y: 1 },
  { x: 14, y: 27 },
  { x: 1, y: 14 },
  { x: 27, y: 14 },
  { x: 4.5, y: 4.5 },
  { x: 23.5, y: 4.5 },
  { x: 4.5, y: 23.5 },
  { x: 23.5, y: 23.5 },
]

export function SunMoonIcon({ isDark }: SunMoonIconProps) {
  const maskId = useId()

  const rotation = useSpring({
    transform: isDark ? 'rotate(-18deg)' : 'rotate(0deg)',
    config: { easing: easings.easeOutQuad },
  })

  // The crescent bite: a rounded pixel offset into the body, present only in dark.
  const bite = useSpring({
    x: isDark ? 15 : 34,
    config: { easing: easings.easeOutQuad },
  })

  const rayClassName =
    '[transform-box:fill-box] origin-center transition-transform duration-300 dark:scale-0'

  return (
    <animated.span style={rotation} className="inline-flex">
      <svg
        aria-hidden
        className="fill-ink"
        width={28}
        height={28}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id={maskId}>
          <rect x={0} y={0} width={32} height={32} fill="white" />
          <animated.rect
            x={bite.x}
            y={2}
            width={16}
            height={16}
            rx={5}
            fill="black"
          />
        </mask>

        <rect
          mask={`url(#${maskId})`}
          x={9}
          y={9}
          width={14}
          height={14}
          rx={4}
        />

        {RAYS.map((ray) => (
          <rect
            key={`${ray.x}-${ray.y}`}
            className={rayClassName}
            x={ray.x}
            y={ray.y}
            width={4}
            height={4}
            rx={1.4}
          />
        ))}
      </svg>
    </animated.span>
  )
}

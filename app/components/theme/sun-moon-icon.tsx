import { animated, easings, useSpring } from '@react-spring/web'
import { useId } from 'react'

export interface SunMoonIconProps {
  isDark: boolean
}

export function SunMoonIcon({ isDark }: SunMoonIconProps) {
  const maskId = useId()

  const rotation = useSpring({
    transform: isDark ? 'rotate(0)' : 'rotate(180)',
    config: { easing: easings.easeOutQuad },
  })

  const { r: planetR } = useSpring({
    r: isDark ? 10 : 7,
    config: { easing: easings.easeOutQuad },
  })

  const mask = useSpring({
    cy: isDark ? 10 : 30,
    cx: isDark ? 20 : 30,
    r: isDark ? 9 : 0,
    config: { easing: easings.easeOutQuad },
  })

  const rayClassName = 'dark:scale-0 stroke-cyber-text'

  return (
    <animated.span style={rotation}>
      <svg
        aria-hidden
        className="fill-cyber-text"
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id={maskId}>
          <rect x={0} y={0} width={30} height={30} fill="white" />
          <animated.circle cx={mask.cx} cy={mask.cy} r={mask.r} fill="black" />
        </mask>

        <animated.circle mask={`url(#${maskId})`} cx={15} cy={15} r={planetR} />

        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={7}
          y1={10}
          x2={5}
          y2={9}
          strokeWidth={3}
        />
        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={15}
          y1={6}
          x2={15}
          y2={4}
          strokeWidth={3}
        />
        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={23}
          y1={10}
          x2={25}
          y2={9}
          strokeWidth={3}
        />
        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={7}
          y1={20}
          x2={5}
          y2={21}
          strokeWidth={3}
        />
        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={15}
          y1={24}
          x2={15}
          y2={26}
          strokeWidth={3}
        />
        <line
          strokeLinecap="round"
          className={rayClassName}
          x1={23}
          y1={20}
          x2={25}
          y2={21}
          strokeWidth={3}
        />
      </svg>
    </animated.span>
  )
}

import { useSpring, animated, easings } from '@react-spring/web'

interface MobileNavMenuToggleProps {
  enabled: boolean
  toggle: () => void
}
export function MobileNavMenuToggle({
  enabled,
  toggle,
}: MobileNavMenuToggleProps) {
  const ariaLabel = enabled ? 'Close menu' : 'Open menu'

  const first = useSpring({
    transform: enabled ? 'rotate(45)' : 'rotate(0)',
    x: enabled ? 0 : 0,
    y: enabled ? 90 : 40.5,
    config: { easing: easings.easeOutQuad, duration: 250 },
  })

  const second = useSpring({
    transform: enabled ? 'rotate(45)' : 'rotate(0)',
    x: enabled ? 0 : 0,
    y: enabled ? 90 : 90.5,
    width: enabled ? 0 : 200,
    config: { easing: easings.easeOutQuad, duration: 250 },
  })

  const third = useSpring({
    transform: enabled ? 'rotate(-45)' : 'rotate(0)',
    x: enabled ? 0 : 0,
    y: enabled ? 90 : 140.5,
    config: { easing: easings.easeOutQuad, duration: 250 },
  })

  return (
    <button onClick={toggle} aria-label={ariaLabel}>
      <animated.span>
        <svg
          aria-hidden
          className="fill-black dark:fill-white"
          width={30}
          height={30}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <animated.rect
            width="200"
            height="20"
            rx="14.5"
            {...first}
            transform-origin={'50% 50%'}
          />

          <animated.rect
            height="20"
            rx="14.5"
            {...second}
            transform-origin={'50% 50%'}
          />

          <animated.rect
            width="200"
            height="20"
            rx="14.5"
            {...third}
            transform-origin={'50% 50%'}
          />
        </svg>
      </animated.span>
    </button>
  )
}

import { useNavigation } from 'react-router'
import { useSpinDelay } from 'spin-delay'

export function MainProgressBar() {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== 'idle'

  const showLoader = useSpinDelay(isNavigating, {
    delay: 400,
    minDuration: 1000,
  })

  if (!showLoader) return null

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="pointer-events-none absolute inset-x-0 top-full h-0.5 overflow-hidden bg-rule"
    >
      <div className="progress-bar-indicator h-full w-1/3 bg-mark" />
    </div>
  )
}

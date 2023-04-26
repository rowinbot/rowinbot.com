import { useNavigation } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useId } from 'react'
import { useSpinDelay } from 'spin-delay'

export function MainProgressBar() {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== 'idle'
  const gradientId = useId()

  const showLoader = useSpinDelay(isNavigating, {
    delay: 400,
    minDuration: 1000,
  })

  if (!showLoader) return null

  return (
    <svg className="fixed inset-x-0 top-0 w-full h-2 z-30">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="svg-stop-purple-500" />
          <stop offset="100%" className="svg-stop-fuchsia-500" />
        </linearGradient>
      </defs>
      <rect height="100%" width="100%" className="fill-white dark:fill-black" />
      <motion.rect
        height="100%"
        width="100%"
        animate={{
          translateX: ['-100%', '100%'],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          times: [0, 1],
          repeat: Infinity,
        }}
        style={{
          fill: `url(#${gradientId})`,
        }}
      />
    </svg>
  )
}

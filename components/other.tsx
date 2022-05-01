import React from 'react'
import type { ReactNode } from 'react'
import { animated, useSpring, config } from '@react-spring/web'

interface PageResetProps {
  children: ReactNode
}
export function PageReset({ children }: PageResetProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition duration-500 flex flex-col">
      {children}
    </div>
  )
}

export function PageTitle() {
  const [styles] = useSpring(
    () => ({
      from: {
        backgroundImage: 'linear-gradient(to bottom, #10B981 0%, #0D9488 100%)',
      },
      to: [
        {
          backgroundImage:
            'linear-gradient(to bottom, #3B82F6 0%, #4F46E5 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #8B5CF6 0%, #9333EA 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #D946EF 0%, #DB2777 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #F43F5E 0%, #DC2626 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #D946EF 0%, #DB2777 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #8B5CF6 0%, #9333EA 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #3B82F6 0%, #4F46E5 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #06B6D4 0%, #0284C7 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #10B981 0%, #0D9488 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #84CC16 0%, #16A34A 100%)',
        },
        {
          backgroundImage:
            'linear-gradient(to bottom, #10B981 0%, #0D9488 100%)',
        },
      ],
      config: { ...config.molasses, duration: 2000 },
      immediate: true,
      delay: 1500,
      loop: {
        reverse: true,
      },
    }),
    []
  )

  return (
    <h2 className="flex flex-col text-3xl sm:text-4xl md:text-5xl text-slate-800 dark:text-white items-start">
      Crafting things for...
      <span className="text-7xl sm:text-8xl md:text-9xl font-bold mt-4">
        Web<span className="text-5xl sm:text-6xl md:text-7xl">,</span>
      </span>
      <span className="text-7xl sm:text-8xl md:text-9xl font-bold">
        Mobile <span className="text-5xl sm:text-6xl md:text-7xl">&</span>
      </span>
      <animated.span
        style={styles}
        className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent bg-clip-text"
      >
        DevOps.
      </animated.span>
    </h2>
  )
}

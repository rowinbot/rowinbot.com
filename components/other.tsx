import React from 'react'
import type { ReactNode } from 'react'

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
  return (
    <h2
      className="text-4xl 2xs:text-5xl app-text sm:text-6xl lg:text-7xl items-start !leading-normal"
      dangerouslySetInnerHTML={{
        __html:
          'Crafting adaptive high-quality experiences for the <b>Web.</b>',
      }}
    />
  )
}

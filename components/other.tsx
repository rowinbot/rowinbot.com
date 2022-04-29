import type { ReactNode } from 'react'

interface PageResetProps {
  children: ReactNode
}
export default function PageReset({ children }: PageResetProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition duration-500 flex flex-col">
      {children}
    </div>
  )
}

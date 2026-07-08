import { type ReactNode } from 'react'

interface DiagramFrameProps {
  caption: string
  note: string
  children: ReactNode
}

export function DiagramFrame({ caption, note, children }: DiagramFrameProps) {
  return (
    <div className="reveal relative rounded-sm border-[1.5px] border-rule bg-surface bg-[radial-gradient(var(--dot)_1px,transparent_1.3px)] px-[clamp(0.625rem,1.6vw,1.125rem)] pb-2 pt-3.5 [background-size:20px_20px] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,2px_3px_0_rgba(43,42,40,0.06)]">
      <div className="mb-1 flex justify-between gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
        <span>{caption}</span>
        <span className="font-semibold text-link">{note}</span>
      </div>
      {children}
    </div>
  )
}

interface SkipLinkProps {
  targetId: string
  children: React.ReactNode
}

export function SkipLink({ targetId, children }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed left-2.5 top-2.5 z-[60] -translate-y-[160%] rounded-sm bg-ink px-3.5 py-2 font-mono text-meta tracking-[0.04em] text-paper transition-transform duration-150 focus:translate-y-0"
    >
      {children}
    </a>
  )
}

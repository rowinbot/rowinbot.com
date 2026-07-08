interface SourcePanelProps {
  caption: string
  source: string
}

/** Shows the exact text a human authors for a diagram, next to its render. */
export function SourcePanel({ caption, source }: SourcePanelProps) {
  return (
    <div className="mt-3">
      <p className="mb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
        {caption}
      </p>
      <pre className="m-0 overflow-x-auto rounded-sm border border-rule bg-surface/70 p-3 font-mono text-[0.75rem] leading-[1.55] text-ink">
        <code>{source}</code>
      </pre>
    </div>
  )
}

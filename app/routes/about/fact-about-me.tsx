interface FactAboutMeProps {
  index: number
  title: string
  description: string
}

export function FactAboutMe(props: FactAboutMeProps) {
  return (
    <li className="group space-y-4 border border-rule bg-surface p-8 transition-colors hover:border-mark">
      <div className="flex items-center gap-4">
        <span className="select-none font-display text-3xl font-black leading-none text-ink-soft/40">
          /{String(props.index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-mono text-meta font-semibold uppercase tracking-[0.08em] text-mark">
          {props.title}
        </h3>
      </div>

      <p className="font-mono text-meta leading-relaxed text-ink-soft">
        {props.description}
      </p>
    </li>
  )
}

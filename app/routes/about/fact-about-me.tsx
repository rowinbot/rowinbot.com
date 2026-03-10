export function FactAboutMe(props: {
  index: number
  title: string
  description: string
}) {
  return (
    <li className="group p-8 lg:p-10 bg-cyber-surface border border-cyber-border space-y-5 transition-all duration-300 hover:border-cyber-cyan/40 hover:bg-cyber-surface-light/50">
      <div className="flex items-center gap-4">
        <span className="font-cyber text-[clamp(2.5rem,2rem_+_1.5vw,3rem)] font-black text-cyber-cyan/15 leading-none select-none transition-colors duration-300 group-hover:text-cyber-cyan/25">
          /{String(props.index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-cyber text-base leading-tight font-bold uppercase tracking-widest text-cyber-cyan">
          {props.title}
        </h3>
      </div>

      <p className="text-lg font-mono leading-relaxed text-cyber-text-dim">
        {props.description}
      </p>
    </li>
  )
}

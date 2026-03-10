export function FactAboutMe(props: {
  index: number
  title: string
  description: string
}) {
  return (
    <li
      className="group relative p-8 lg:p-10 bg-cyber-surface border border-cyber-border space-y-5 transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-[0_0_20px_rgb(var(--cyber-cyan)_/_0.06)]"
      style={{
        clipPath:
          'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-cyber text-[clamp(2.5rem,2rem_+_1.5vw,3rem)] font-black text-cyber-cyan/15 leading-none select-none transition-colors duration-300 group-hover:text-cyber-cyan/30">
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

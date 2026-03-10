/**
 * Cyberpunk decorative elements to sprinkle across the app.
 * All are purely visual (aria-hidden, pointer-events-none).
 */

/** HUD corner brackets — placed in each corner of a relative container */
export function HudCorners({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-10 h-10 sm:w-14 sm:h-14">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-cyber-cyan/50 to-transparent" />
      </div>
      {/* Top-right */}
      <div className="absolute top-0 right-0 w-10 h-10 sm:w-14 sm:h-14">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyber-cyan/50 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cyber-cyan/50 to-transparent" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-14 sm:h-14">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyber-magenta/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-cyber-magenta/40 to-transparent" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-14 sm:h-14">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-cyber-magenta/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-cyber-magenta/40 to-transparent" />
      </div>
    </div>
  )
}

/** Scattered floating dots — position with absolute on a relative parent */
export function FloatingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute top-[12%] left-[18%] h-1 w-1 rounded-full bg-cyber-cyan/25" />
      <div className="absolute top-[8%] right-[25%] h-1.5 w-1.5 rounded-full bg-cyber-magenta/20" />
      <div className="absolute top-[35%] left-[8%] h-1 w-1 rounded-full bg-cyber-cyan/15" />
      <div className="absolute top-[55%] right-[12%] h-1 w-1 rounded-full bg-cyber-cyan/20" />
      <div className="absolute top-[70%] left-[30%] h-1.5 w-1.5 rounded-full bg-cyber-magenta/15" />
      <div className="absolute top-[85%] right-[35%] h-1 w-1 rounded-full bg-cyber-cyan/20" />
      <div className="absolute top-[45%] right-[45%] h-px w-px rounded-full bg-cyber-cyan/30" />
    </div>
  )
}

/** A thin labeled divider line — good between sections */
export function CyberDivider({
  label,
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-cyber-cyan/25 to-transparent" />
      {label && (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rotate-45 border border-cyber-cyan/40" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-cyber-cyan/30 uppercase select-none">
            {label}
          </span>
          <div className="h-1.5 w-1.5 rotate-45 border border-cyber-cyan/40" />
        </div>
      )}
      <div className="h-px flex-1 bg-gradient-to-l from-cyber-cyan/25 to-transparent" />
    </div>
  )
}

/** Vertical edge accent lines — renders two faint lines on left+right viewport edges */
export function EdgeAccents() {
  return (
    <div className="fixed inset-y-0 inset-x-0 pointer-events-none z-[5] hidden lg:block" aria-hidden="true">
      <div className="absolute top-0 left-3 w-px h-full bg-gradient-to-b from-transparent via-cyber-cyan/[0.07] to-transparent" />
      <div className="absolute top-0 right-3 w-px h-full bg-gradient-to-b from-transparent via-cyber-cyan/[0.07] to-transparent" />
    </div>
  )
}

/** Small signal/equalizer bars — decorative telemetry vibe */
export function SignalBars({ className = '' }: { className?: string }) {
  const heights = [3, 5, 8, 6, 4, 7, 9, 5, 3, 6, 8, 4, 5, 7, 3]
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] bg-cyber-cyan/15"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

/** Diagonal accent line — a thin rotated line for visual interest */
export function DiagonalAccent({
  className = '',
  side = 'right',
}: {
  className?: string
  side?: 'left' | 'right'
}) {
  const rotation = side === 'right' ? 'rotate-[25deg]' : '-rotate-[25deg]'
  const gradient =
    side === 'right'
      ? 'bg-gradient-to-l from-cyber-cyan/15 to-transparent'
      : 'bg-gradient-to-r from-cyber-cyan/15 to-transparent'
  const position = side === 'right' ? 'right-0 origin-right' : 'left-0 origin-left'

  return (
    <div
      className={`absolute w-48 sm:w-72 h-px ${gradient} ${rotation} ${position} pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}

/** Binary/hex data stream text — just flavor text */
export function DataStream({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <p className="font-mono text-[10px] tracking-[0.4em] text-cyber-border/60 select-none whitespace-nowrap">
        // 0x4845 4C4C 4F // SYS.INIT // 01011001 // LINK_UP // 0xF0FF //
      </p>
    </div>
  )
}

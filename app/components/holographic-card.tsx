import { useRef, useState, useCallback, useEffect } from 'react'

import { BlurrableImage } from '~/components/image'

interface HolographicCardProps {
  imageSrc: string
  imageBlurDataUrl: string
  imageAlt: string
}

export function HolographicCard({
  imageSrc,
  imageBlurDataUrl,
  imageAlt,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSettling, setIsSettling] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)
  const settlingTimer = useRef<ReturnType<typeof setTimeout>>(null)

  // Clean up settling timer on unmount
  useEffect(() => {
    return () => {
      if (settlingTimer.current) clearTimeout(settlingTimer.current)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || isAnimating) return
      const rect = cardRef.current.getBoundingClientRect()
      setIsHovering(true)
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    },
    [isAnimating]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  const handleFlip = useCallback(() => {
    setIsAnimating(true)
    setIsFlipped((f) => !f)
  }, [])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName === 'transform') {
        setIsAnimating(false)
        // Ease tilt back to mouse position over 0.4s
        setIsSettling(true)
        if (settlingTimer.current) clearTimeout(settlingTimer.current)
        settlingTimer.current = setTimeout(() => setIsSettling(false), 400)
      }
    },
    []
  )

  // During animation: tilt goes to 0. During settling & after: tilt follows mouse.
  const tiltX = isHovering && !isAnimating ? (mousePos.y - 0.5) * -20 : 0
  const tiltY = isHovering && !isAnimating ? (mousePos.x - 0.5) * 20 : 0

  // When flipped, negate tiltY so tilt direction still follows the mouse naturally
  const finalRotateY = isFlipped ? 180 - tiltY : tiltY

  // Front face holo coordinates
  const holoX = mousePos.x * 100
  const holoY = mousePos.y * 100
  const holoAngle =
    Math.atan2(mousePos.y - 0.5, mousePos.x - 0.5) * (180 / Math.PI) + 90

  // Back face: mirror X (the element itself is rotated 180deg)
  const backHoloX = (1 - mousePos.x) * 100
  const backHoloAngle =
    Math.atan2(mousePos.y - 0.5, 1 - mousePos.x - 0.5) * (180 / Math.PI) + 90

  // Shadow follows tilt direction
  const effectiveTiltY = isFlipped ? -tiltY : tiltY
  const shadowX = isHovering ? -effectiveTiltY * 0.8 : 0
  const shadowY = isHovering ? tiltX * 0.8 : 0

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFlip()
        }
      }}
      aria-label={isFlipped ? 'Flip card to front' : 'Flip card to see stats'}
    >
      <div
        className="w-full aspect-[3/4] max-h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tiltX}deg) rotateY(${finalRotateY}deg)`,
          transition: isAnimating
            ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s ease'
            : isSettling
              ? 'transform 0.4s ease-out, box-shadow 0.4s ease'
              : isHovering
                ? 'transform 0.1s ease-out, box-shadow 0.2s ease'
                : 'transform 0.5s ease-out, box-shadow 0.5s ease',
          boxShadow: isHovering
            ? `${shadowX}px ${shadowY + 10}px 40px rgba(0, 210, 225, 0.15), 0 20px 60px rgba(0, 0, 0, 0.4)`
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden border-2 border-white/20"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <BlurrableImage
            blurDataUrl={imageBlurDataUrl}
            src={imageSrc}
            width={440}
            height={616}
            alt={imageAlt}
            className="w-full h-full"
          />

          <HoloOverlay
            isActive={isHovering && !isFlipped}
            holoX={holoX}
            holoY={holoY}
            holoAngle={holoAngle}
            blendMode="color-dodge"
          />

          {/* "Click to flip" hint */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 text-center">
              Click to flip
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden border-2 border-cyber-cyan/30"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardBack />

          <HoloOverlay
            isActive={isHovering && isFlipped}
            holoX={backHoloX}
            holoY={holoY}
            holoAngle={backHoloAngle}
            blendMode="screen"
          />

          {/* "Click to flip back" hint */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 text-center">
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HoloOverlay({
  isActive,
  holoX,
  holoY,
  holoAngle,
  blendMode,
}: {
  isActive: boolean
  holoX: number
  holoY: number
  holoAngle: number
  blendMode: string
}) {
  return (
    <>
      {/* Holographic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'],
          opacity: isActive ? 0.5 : 0,
          transition: 'opacity 0.3s',
          background: `linear-gradient(
            ${holoAngle}deg,
            hsla(180, 100%, 50%, 0.4) 0%,
            hsla(300, 100%, 50%, 0.25) 20%,
            hsla(60, 100%, 50%, 0.25) 40%,
            hsla(180, 100%, 50%, 0.4) 60%,
            hsla(300, 100%, 50%, 0.25) 80%,
            hsla(180, 100%, 50%, 0.4) 100%
          )`,
        }}
      />

      {/* Fine holographic line pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isActive ? 0.12 : 0,
          transition: 'opacity 0.3s',
          backgroundImage: `repeating-linear-gradient(
            ${holoAngle + 45}deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.4) 2px,
            rgba(255,255,255,0.4) 3px
          )`,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Light spot following mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s',
          background: `radial-gradient(
            circle at ${holoX}% ${holoY}%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.08) 25%,
            transparent 60%
          )`,
        }}
      />
    </>
  )
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="aspect-[1/1.2] bg-cyber-surface-light/50 rounded-sm border border-cyber-border relative overflow-hidden mb-[4%]">
        <div
          className="absolute bottom-0 left-0 right-0 bg-cyber-cyan/20 border-t border-cyber-cyan/40"
          style={{ height: `${value}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-cyber text-[clamp(0.4rem,3cqi,0.875rem)] font-bold text-cyber-text">
          {value}
        </span>
      </div>
      <span className="font-mono text-[clamp(0.3rem,2cqi,0.5625rem)] uppercase tracking-wider text-cyber-text-dim">
        {label}
      </span>
    </div>
  )
}

function CardBack() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-cyber-surface via-cyber-bg to-cyber-surface p-[6%]" style={{ containerType: 'inline-size' }}>
      {/* Top accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mb-[3%]" />

      {/* Header */}
      <div className="flex items-start justify-between mb-[1%]">
        <h3 className="font-cyber text-[clamp(0.5rem,3.6cqi,1rem)] uppercase tracking-widest font-bold text-cyber-text">
          Rowin Hernandez
        </h3>
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="font-cyber text-[clamp(0.4rem,2.8cqi,0.75rem)] font-bold text-cyber-cyan">
            HP
          </span>
          <span className="font-cyber text-[clamp(0.75rem,4.5cqi,1.375rem)] font-black text-cyber-text">
            &infin;
          </span>
        </div>
      </div>

      {/* Type */}
      <p className="text-[clamp(0.4rem,2.8cqi,0.75rem)] font-mono uppercase tracking-wider text-cyber-text-dim mb-[3%]">
        Stage 2 &mdash; Full-Stack Developer
      </p>

      {/* Subtitle box */}
      <div className="rounded border border-cyber-border bg-cyber-surface-light/30 px-[4%] py-[2%] mb-[4%]">
        <p className="font-mono text-[clamp(0.4rem,2.8cqi,0.8125rem)] text-cyber-text-dim text-center">
          {'{ Developer \u00B7 Leader \u00B7 Dad \u00B7 Cyclist* }'}
        </p>
      </div>

      {/* Moves */}
      <div className="space-y-[3%] flex-1 min-h-0">
        <div>
          <div className="flex items-center justify-between mb-[1%]">
            <div className="flex items-center gap-[4%]">
              <span className="w-[8%] aspect-square rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 inline-flex items-center justify-center text-[clamp(0.35rem,2.2cqi,0.625rem)]">
                &#9889;
              </span>
              <span className="font-cyber text-[clamp(0.4rem,3cqi,0.875rem)] uppercase tracking-wider font-bold text-cyber-text">
                Ship It
              </span>
            </div>
            <span className="font-cyber text-[clamp(0.6rem,3.8cqi,1.125rem)] font-black text-cyber-text">
              80
            </span>
          </div>
          <p className="text-[clamp(0.35rem,2.5cqi,0.6875rem)] font-mono text-cyber-text-dim leading-snug pl-[12%]">
            Deploy a production-ready feature. Does 40 more damage if opponent
            is a deadline.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-[1%]">
            <div className="flex items-center gap-[4%]">
              <span className="w-[8%] aspect-square rounded-full bg-cyber-magenta/20 border border-cyber-magenta/40 inline-flex items-center justify-center text-[clamp(0.35rem,2.2cqi,0.625rem)]">
                &#128295;
              </span>
              <span className="font-cyber text-[clamp(0.4rem,3cqi,0.875rem)] uppercase tracking-wider font-bold text-cyber-text">
                Rubber Duck Debug
              </span>
            </div>
            <span className="font-cyber text-[clamp(0.6rem,3.8cqi,1.125rem)] font-black text-cyber-text">
              40+
            </span>
          </div>
          <p className="text-[clamp(0.35rem,2.5cqi,0.6875rem)] font-mono text-cyber-text-dim leading-snug pl-[12%]">
            Explain the bug out loud. Remove all status conditions from your
            benched Developers.
          </p>
        </div>
      </div>

      {/* Stat bars */}
      <div className="grid grid-cols-4 gap-[3%] my-[3%]">
        <StatBar label="Code" value={95} />
        <StatBar label="Lead" value={88} />
        <StatBar label="Ship" value={92} />
        <StatBar label="Debug" value={85} />
      </div>

      {/* Footer */}
      <div className="border-t border-cyber-border pt-[2%]">
        <div className="flex justify-between text-[clamp(0.35rem,2.5cqi,0.6875rem)] font-mono uppercase tracking-wider mb-[2%]">
          <div>
            <span className="text-cyber-text-dim">weakness </span>
            <span>&#127828;</span>
          </div>
          <div>
            <span className="text-cyber-text-dim">resist </span>
            <span>&#128027; -30</span>
          </div>
          <div>
            <span className="text-cyber-text-dim">retreat </span>
            <span>&#9749;&#9749;</span>
          </div>
        </div>
      </div>

      {/* Flavor text */}
      <p className="text-[clamp(0.3rem,2.2cqi,0.625rem)] font-mono italic text-cyber-text-dim text-center leading-snug">
        *Often found on biking trails he has no business being on.
      </p>
    </div>
  )
}

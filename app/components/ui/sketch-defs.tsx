export function SketchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.016"
          numOctaves="2"
          seed="7"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
      </filter>
      <marker
        id="ah"
        viewBox="0 0 10 10"
        refX="7"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path className="arrow-fill" d="M0.5,1 L9,5 L0.5,9 L3,5 Z" />
      </marker>
    </svg>
  )
}

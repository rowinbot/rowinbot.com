interface DiagramAnnotationProps {
  lines: string[]
  x: number
  y: number
  lineHeight?: number
  arrowPath: string
}

/** A red margin note inside a diagram: stacked italic text plus a hand arrow. */
export function DiagramAnnotation({
  lines,
  x,
  y,
  lineHeight = 13,
  arrowPath,
}: DiagramAnnotationProps) {
  return (
    <>
      {lines.map((line, index) => (
        <text
          key={line}
          className="red-note i"
          x={x}
          y={y + index * lineHeight}
          textAnchor="start"
        >
          {line}
        </text>
      ))}
      <path
        className="stroke red-stroke"
        pathLength={1}
        d={arrowPath}
        markerEnd="url(#ah)"
        filter="url(#rough)"
      />
    </>
  )
}

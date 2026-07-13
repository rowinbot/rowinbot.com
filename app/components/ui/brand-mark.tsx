interface BrandMarkProps {
  className?: string
}

/** The Rowinbot "Selective Soft Pixel RH" glyph — monochrome, inherits color. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label="Rowinbot"
      className={className}
      fill="currentColor"
    >
      <rect x="12.5" y="18" width="14" height="60" rx="3" />
      <rect x="22.5" y="18" width="28" height="12" rx="3" />
      <rect x="45.5" y="23" width="14" height="31" rx="3" />
      <rect x="22.5" y="46" width="60" height="14" rx="2" />
      <rect x="37.5" y="56" width="15" height="13" rx="1" />
      <rect x="47.5" y="65" width="15" height="13" rx="1" />
      <rect x="66.5" y="18" width="16" height="60" rx="3" />
    </svg>
  )
}

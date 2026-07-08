const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/rowinbot' },
  { label: 'Twitter / X', href: 'https://twitter.com/rowinbot' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rowinbot/' },
  { label: 'rowin@kalebtec.com', href: 'mailto:rowin@kalebtec.com' },
] as const

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink py-10 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Rowin Hernandez
            </p>
            <p className="mt-2 font-mono text-meta text-ink-soft">
              Senior product engineer &amp; tech lead · Vigo, Galicia
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="border border-rule px-3 py-1.5 font-mono text-meta text-ink transition-colors hover:border-mark hover:text-mark"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl border-t border-dashed border-rule pt-5 font-mono text-meta leading-relaxed text-ink-soft">
          I take engagements through my studio, Kalebtec — my engineering, plus a
          studio's operations and continuity.{' '}
          <a
            href="https://kalebtec.com?ref=rowinbot"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-link hover:text-mark"
          >
            kalebtec.com&nbsp;→
          </a>
        </p>

        <p className="mt-4 font-mono text-label tracking-[0.06em] text-ink-soft">
          Vigo, Galicia · 2026
        </p>
      </div>
    </footer>
  )
}

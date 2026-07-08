import { Link } from 'react-router'

import { MainLogo } from '../graphics/main-logo'

const navLinks = [
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/my-experience' },
] as const

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/rowinbot' },
  { label: 'Twitter', href: 'https://twitter.com/rowinbot' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rowinbot/' },
  { label: 'Kalebtec', href: 'https://kalebtec.com?ref=rowinbot' },
] as const

export function Footer() {
  return (
    <>
      {/* Sharp gradient separator line */}
      <div className="h-px bg-gradient-to-r from-cyber-magenta/40 via-cyber-cyan to-cyber-magenta/40" />

      <footer className="bg-cyber-bg py-16 pb-8 relative overflow-hidden">
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none" />

        {/* Faint grid background */}
        <div className="absolute inset-0 cyber-grid-bg pointer-events-none opacity-50" />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          {/* Top section: Logo + Description | Nav links */}
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Logo + Description */}
            <div className="max-w-md">
              <MainLogo className="!fill-cyber-text [filter:drop-shadow(0_0_20px_rgba(0,240,255,0.3))]" />

              <p className="mt-5 font-mono text-sm leading-relaxed text-cyber-text-dim">
                Software engineer building at the intersection of design and
                code. Crafting interfaces, writing about the web, and exploring
                what's next.
              </p>

              {/* Terminal-style status line */}
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cyber-cyan animate-neon-pulse" />
                <span className="font-mono text-[11px] tracking-wider text-cyber-cyan/60">
                  SYSTEM ONLINE — TENERIFE, ES
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-4 md:items-end">
              <span className="font-cyber text-[10px] font-bold uppercase tracking-[0.3em] text-cyber-cyan/40">
                Navigate
              </span>
              <div className="flex flex-wrap gap-6 md:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="font-cyber text-xs uppercase tracking-[0.2em] font-semibold text-cyber-text-dim transition-all duration-300 hover:text-cyber-cyan hover:neon-text-cyan"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <span className="mt-4 font-cyber text-[10px] font-bold uppercase tracking-[0.3em] text-cyber-cyan/40">
                Connect
              </span>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-cyber-cyan/30 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyber-text-dim transition-all duration-300 hover:border-cyber-cyan hover:text-cyber-cyan hover:glow-cyan cyber-corners"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Decorative data stream */}
          <div className="mt-14 overflow-hidden" aria-hidden="true">
            <p className="font-mono text-[10px] tracking-[0.5em] text-cyber-border select-none whitespace-nowrap">
              {'//'}
              {' 01001000 01000101 01001100 01001100 01001111 '}
              {'//'}
              {' ROWIN.SYS '}
              {'//'}
              {' 0xF0FF '}
              {'//'}
              {' UPLINK ACTIVE '}
              {'//'}
            </p>
          </div>
        </div>

        {/* Bottom section: Copyright bar */}
        <div className="relative mx-auto mt-8 max-w-6xl px-6 pt-6 sm:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent mb-6" />
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="font-mono text-xs tracking-wider text-cyber-text-dim">
              &copy; {new Date().getFullYear()} ROWIN_HERNANDEZ // ALL_RIGHTS_RESERVED
            </p>
            <p className="font-cyber text-[10px] font-bold tracking-[0.3em] text-cyber-cyan/30 uppercase">
              Designed in the neon grid
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

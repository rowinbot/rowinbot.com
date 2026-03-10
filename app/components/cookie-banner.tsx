import { useState, useEffect } from 'react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = document.cookie.includes('cookie-consent=accepted')
    if (!hasAccepted) {
      // Small delay before showing
      const timeout = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timeout)
    }
  }, [])

  const acceptCookies = () => {
    // Set cookie for 1 year
    const expires = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toUTCString()
    document.cookie = `cookie-consent=accepted; expires=${expires}; path=/; SameSite=Lax`
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom">
      <div className="mx-auto max-w-4xl border border-cyber-cyan/20 bg-cyber-surface/95 backdrop-blur-md p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Left decorative element */}
        <div className="hidden sm:block w-1 h-12 bg-gradient-to-b from-cyber-cyan to-cyber-magenta shrink-0" />

        <div className="flex-1 space-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
            // COOKIE_PROTOCOL
          </p>
          <p className="text-sm text-cyber-text-dim leading-relaxed">
            This site uses cookies to enhance your experience and remember your
            preferences across sessions.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={acceptCookies}
            className="border border-cyber-cyan bg-cyber-cyan/10 px-6 py-2 font-mono text-xs uppercase tracking-widest text-cyber-cyan hover:bg-cyber-cyan/20 transition-all duration-300 glow-cyan"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

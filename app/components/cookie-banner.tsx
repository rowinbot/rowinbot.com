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
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 border border-rule bg-surface/95 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:p-6">
        <div className="flex-1 space-y-1">
          <p className="font-mono text-label uppercase tracking-[0.1em] text-mark">
            Cookies
          </p>
          <p className="font-mono text-meta leading-relaxed text-ink-soft">
            This site uses cookies to enhance your experience and remember your
            preferences across sessions.
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={acceptCookies}
            className="border border-ink bg-ink px-6 py-2 font-mono text-meta text-paper transition-colors hover:border-mark hover:bg-mark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

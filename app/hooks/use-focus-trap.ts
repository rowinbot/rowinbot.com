import * as focusTrap from 'focus-trap'
import { useEffect } from 'react'

interface UseFocusTrapProps {
  selectors: string[]
  enabled: boolean
}
export function useFocusTrap({ selectors, enabled }: UseFocusTrapProps) {
  const selector = selectors.join(', ')

  useEffect(() => {
    if (!enabled) return

    const elements = Array.from(
      document.querySelectorAll(selector)
    ) as HTMLElement[]

    if (elements.length === 0) {
      console.warn(
        `useFocusTrap: Unable to activate focus-trap. No elements found for selectors: ${selector}`
      )
      return
    }

    const trap = focusTrap.createFocusTrap(elements, {
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
    })
    trap.activate()

    return () => {
      trap.deactivate()
    }
  }, [selector, enabled])
}

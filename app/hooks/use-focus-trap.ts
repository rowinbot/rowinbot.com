import * as focusTrap from 'focus-trap'
import { useEffect } from 'react'

interface UseFocusTrapProps {
  selectors: string[]
  enabled: boolean
}
export function useFocusTrap({ selectors, enabled }: UseFocusTrapProps) {
  useEffect(() => {
    if (!enabled) return

    const elements = Array.from(
      document.querySelectorAll(selectors.join(', '))
    ) as HTMLElement[]

    if (elements.length === 0) {
      console.warn(
        `useFocusTrap: Unable to activate focus-trap. No elements found for selectors: ${selectors.join(
          ', '
        )}`
      )
      return
    }

    const trap = focusTrap.createFocusTrap(elements)
    trap.activate()

    return () => {
      trap.deactivate()
    }
  }, [selectors, enabled])
}

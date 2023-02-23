import { useEffect } from 'react'

export function useSyncClassNameWithElement(
  selector: string,
  className: string
) {
  useEffect(() => {
    if (!selector) return

    const element = document.querySelector(selector)
    const classes = className.split(' ').filter(Boolean)

    if (element) {
      classes.forEach((className) => {
        element.classList.add(className)
      })

      return () => {
        classes.forEach((className) => {
          element.classList.remove(className)
        })
      }
    }
  }, [selector, className])
}

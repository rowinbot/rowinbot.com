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

/**
 * @param date formatted as DD/MM/YYYY
 */
export function formatStrDate(strDate: string) {
  const [day, month, year] = strDate.split('/').map((s) => parseInt(s, 10))

  const date = new Date(Date.UTC(year, month - 1, day))

  // Format date as DD MMMM YYYY using Intl.DateTimeFormat
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const websiteUrl = 'https://rowinbot.com'

export const getStringOr = (v: unknown, d: string): string =>
  typeof v === typeof d ? (v as string) : d

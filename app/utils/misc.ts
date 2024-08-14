import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

type UnknownArguments = readonly unknown[]

/**
 * Variadic function arguments -> Instead of an array of arguments with signature e.g `(string | number | boolean)[]` we do a tuple which respects the order for the types => Safer code :)
 */
type GenericArguments<T extends UnknownArguments> = readonly [...T]
type GenericFunction<T extends UnknownArguments> = (
  ...args: GenericArguments<T>
) => void

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useEffectEvent<T extends UnknownArguments>(
  handler: GenericFunction<T>
) {
  const ref = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    ref.current = handler
  })

  return useCallback((...args: GenericArguments<T>) => {
    ref.current(...args)
  }, [])
}

export function useInterval(
  handler: () => boolean | void,
  timeInterval: number
) {
  const effectHandler = useEffectEvent(handler)

  useEffect(() => {
    const interval = setInterval(effectHandler, timeInterval)

    return () => clearInterval(interval)
  }, [effectHandler, timeInterval])
}

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

export function formatDate(date: Date) {
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

import { type ReactNode, useSyncExternalStore } from 'react'

interface ClientOnlyProps {
  children: () => ReactNode
  fallback?: ReactNode
}

const emptySubscribe = () => () => {}

/*
  Renders children only after hydration. React Flow needs the DOM (it measures
  nodes with a ResizeObserver), so it must not run during SSR — the server and
  first client paint show the fallback, then the real graph mounts client-side.
  useSyncExternalStore returns the server snapshot (false) during SSR/hydration
  and the client snapshot (true) afterward, without a hydration mismatch.
*/
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  return <>{hydrated ? children() : fallback}</>
}

import { getServerEnv } from './env.server'

declare global {
  interface Window {
    __env: Record<string, string>
  }
}

export function getEnv(envName: string): string | undefined {
  if (typeof global.process === 'undefined') {
    return window.__env[envName]
  }

  return getServerEnv(envName)
}

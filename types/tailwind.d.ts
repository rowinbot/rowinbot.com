/* eslint-disable @typescript-eslint/consistent-type-imports */

type Config = import('tailwindcss').Config

declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette(
    colors: Config['theme'] | undefined
  ): Record<string, string | string[]>
}

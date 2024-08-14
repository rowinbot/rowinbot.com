import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import imageBlur from '@rowinbot/rollup-image-blur'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  optimizeDeps: {
    exclude: ['sharp', 'builtin-modules'],
  },
  plugins: [
    { ...imageBlur(), enforce: 'pre' },
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['use-sound'],
  },
})

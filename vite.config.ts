import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import imageBlur from '@rowinbot/rollup-image-blur'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  optimizeDeps: {
    exclude: ['sharp', 'builtin-modules'],
  },
  plugins: [
    { ...imageBlur(), enforce: 'pre' },
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['use-sound', '@floating-ui/react-dom'],
  },
})

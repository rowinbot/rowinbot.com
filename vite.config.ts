import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import imageBlur from '@rowinbot/rollup-image-blur'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  optimizeDeps: {
    exclude: ['sharp', 'builtin-modules'],
  },
  plugins: [{ ...imageBlur(), enforce: 'pre' }, reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ['use-sound', '@floating-ui/react-dom'],
  },
})

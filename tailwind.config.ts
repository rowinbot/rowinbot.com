import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

const config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,md,mdx}'],
  theme: {
    screens: {
      '2xs': '372px',
      xs: '512px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    textShadow: {
      short: 1,
      regular: 2,
      long: 3,
    },
    extend: {
      colors: {
        cyber: {
          bg: 'rgb(var(--cyber-bg) / <alpha-value>)',
          surface: 'rgb(var(--cyber-surface) / <alpha-value>)',
          'surface-light': 'rgb(var(--cyber-surface-light) / <alpha-value>)',
          border: 'rgb(var(--cyber-border) / <alpha-value>)',
          cyan: 'rgb(var(--cyber-cyan) / <alpha-value>)',
          magenta: 'rgb(var(--cyber-magenta) / <alpha-value>)',
          orange: 'rgb(var(--cyber-orange) / <alpha-value>)',
          yellow: 'rgb(var(--cyber-yellow) / <alpha-value>)',
          text: 'rgb(var(--cyber-text) / <alpha-value>)',
          'text-dim': 'rgb(var(--cyber-text-dim) / <alpha-value>)',
        },
      },
      spacing: {
        x: '1.75rem',
        'x-safe': '1.5rem',
        'x-sm': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'Inter-fallback'],
        cyber: ['Orbitron', 'Inter', 'sans-serif'],
        display: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        body: ['"Open Sans"'],
      },
      animation: {
        gradient: 'gradient 2s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        glitch: 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [textShadowPlugin, appUtilities],
} satisfies Config

type AppConfigTheme = (typeof config)['theme']

function textShadowPlugin({ matchUtilities, theme }: PluginAPI) {
  matchUtilities(
    {
      'text-shadow': (value) => {
        return {
          '--el-text-shadow-color': value,
        }
      },
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )

  matchUtilities(
    {
      'text-shadow': (value) => {
        const base = 2
        const layers = typeof value === 'string' ? parseInt(value, 10) : value

        let className = '0 0 1px var(--el-text-shadow-color), '

        for (let i = 0; i < layers; i++) {
          className += `${base + i}px ${
            base + i
          }px 0px var(--el-text-shadow-color)`
          if (i < layers - 1) className += ', '
        }

        return {
          textShadow: className,
        }
      },
    },
    {
      values: theme<AppConfigTheme['textShadow']>('textShadow'),
      type: ['length'],
    }
  )

  matchUtilities(
    {
      'svg-stop': (value) => {
        return {
          'stop-color': value,
        }
      },
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
}

function appUtilities({ addUtilities }: PluginAPI) {
  addUtilities({
    // Utilities
    '.box-decoration-break': {
      '-webkit-box-decoration-break': 'clone',
      'box-decoration-break': 'clone',
    },
    '.no-marker': {
      '& summary::-webkit-details-marker': {
        display: 'none',
      },
    },
    '.select-none': {
      '-webkit-user-select': 'none',
    },

    // Components
    '.skewed-mark': {
      '@apply relative before:absolute before:bottom-0 before:h-1 before:from-cyber-cyan before:to-cyber-magenta before:bg-gradient-to-r before:w-full before:inset-x-0 before:translate-y-2 before:-z-10 z-10 before:!skew-x-[135deg]':
        {},
    },
  })
}

export default config

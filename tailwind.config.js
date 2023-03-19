const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

function textShadowPlugin(matchUtilities, theme) {
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
        const strValue = value
        const base = 2
        const layers = 2 + 2 * parseInt(strValue, 10)

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
      values: theme('textShadow'),
      type: ['length'],
    }
  )
}

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      spacing: {
        'journal-entry-x': '3rem',
      },
      fontFamily: {
        sans: ['Inter', 'Inter-fallback'],
        display: ['Inter', 'Inter-fallback'],
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
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      textShadowPlugin(matchUtilities, theme)
    },
  ],
}

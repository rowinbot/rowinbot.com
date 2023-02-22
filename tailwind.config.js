module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-inter)'],
        body: ['"Open Sans"'],
      },
      animation: {
        gradient: 'gradient 2s linear infinite',
      },
    },
  },
  plugins: [],
}

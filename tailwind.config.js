module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
        display: ['Inter'],
        body: ['"Open Sans"'],
      },
      animation: {
        gradient: 'gradient 20s ease-out infinite',
      },
    },
  },
  plugins: [],
}

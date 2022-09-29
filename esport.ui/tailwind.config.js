/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#28243d',
        primaryctrs: '#2f2c45',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
}

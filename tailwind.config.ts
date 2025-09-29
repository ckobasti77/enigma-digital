/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        deltha: ['var(--font-deltha)', ...defaultTheme.fontFamily.sans],
        aeonik: ['var(--font-aeonik)', ...defaultTheme.fontFamily.sans],
        brokenConsole: ['var(--font-broken-console)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

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
      },
      keyframes: {
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'glitch': {
          '0%, 100%': { textShadow: '2px 0 #ec4899, -2px 0 #22d3ee' },
          '20%': { textShadow: '-2px 0 #ec4899, 2px 0 #22d3ee' },
          '40%': { textShadow: '2px 2px #ec4899, -2px -2px #22d3ee' },
          '60%': { textShadow: '-2px 2px #ec4899, 2px -2px #22d3ee' },
          '80%': { textShadow: '0 0 #ec4899, 0 0 #22d3ee' },
        },
      },
      animation: {
        'border-flow': 'border-flow 3s linear infinite',
        'glitch': 'glitch 1s infinite',
      },
    },
  },
  plugins: [],
};

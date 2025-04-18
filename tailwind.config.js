/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinner: {
          '0%': {
            transform: 'rotate(0)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        moveToRight: {
          '0%': {
            transform: 'translateX(-550 %) rotate(20deg)'
          },
          '100%': {
            transform: 'translateX(550 %) rotate(20deg)'
          }
        }
      },
      animation: {
        spinner: 'spinner 0.5s ease infinite',
        moveToRight: 'moveToRight 0.8s linear infinite'
      }
    },
  },
  plugins: []
};

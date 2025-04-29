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
        },
        skeleton: {
          '0%': {
            backgroundColor: '#2c2c2e', // xám đậm
          },
          '50%': {
            backgroundColor: '#3a3a3c', // xám trung bình sáng hơn tí
          },
          '100%': {
            backgroundColor: '#2c2c2e',
          }
        },
        dance: {
          '0%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-5px)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        fadeOut: {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        }

      },
      animation: {
        spinner: 'spinner 0.5s ease infinite',
        moveToRight: 'moveToRight 0.8s linear infinite',
        skeleton: 'skeleton 1.5s linear infinite',
        dance: 'dance 0.6s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out'
      }
    },
  },
  plugins: []
};

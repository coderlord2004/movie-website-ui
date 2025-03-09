/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Quét các file trong thư mục src
  ],
  theme: {
    extend: {
      boxShadow: {
        'boxShadow-red': '0 0 6px 3px red',
        'boxShadow-green': '0 0 6px 3px green',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const themeColors = require('./src/assets/colors/themeColors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...themeColors
      },
      boxShadow: {
        ml: '0 7px 10px -2px rgba(0, 0, 0, 0.1), 0 3px 5px -1px rgba(0, 0, 0, 0.06)',
        even: '0 0 20px -1px rgba(0, 0, 0, 0.1), 0px 1px 1px -1px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
};

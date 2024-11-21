/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'base-small': '0.9375rem',
        'base-medium': '1rem',
        'base-large': '1.0625rem',
      },
    },
  },
  plugins: [],
};
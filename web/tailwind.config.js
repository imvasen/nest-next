/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#fffffe',
        'custom-primary': '#007849',
        'custom-primary-darker': '#006839',
      },
    },
  },
  plugins: [],
};

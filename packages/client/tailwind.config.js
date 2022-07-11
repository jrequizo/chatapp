/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-darkgreen': '#006400',
        'theme-green': '#249a44',
        'theme-lightgreen': '#34e062'
      }
    },
  },
  plugins: [],
}

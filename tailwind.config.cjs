/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        tatweer: {
          orange: '#E85D04',
          'orange-light': '#FF6B00',
          navy: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}

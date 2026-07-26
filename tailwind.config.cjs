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
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        ora: {
          blue: '#0A3D6B',
          'blue-light': '#145A8A',
          lagoon: '#1FA8B8',
          navy: '#0B1C2C',
          sand: '#EDE6DA',
          cream: '#F7F4EE',
          ink: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // dark grey base + red accent
        night: '#1a1a1c',
        accent: '#e03a3a',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Source Serif 4"', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
}

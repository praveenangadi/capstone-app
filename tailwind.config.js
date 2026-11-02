/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#121212',
          800: '#161616',
          700: '#262626',
          600: '#393939',
          500: '#525252',
        },
        brand: {
          DEFAULT: '#0f62fe',
          hover: '#0353e9',
        },
        link: '#78a9ff',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

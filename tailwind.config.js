/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: '#050508',
        accent1: '#4F8EF7',
        accent2: '#A78BFA',
        accent3: '#34D399',
        textPrimary: '#F0F4FF',
      },
    },
  },
  plugins: [],
}

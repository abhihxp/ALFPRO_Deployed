export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7b5eea',
      }
    },
  },
  safelist: [
    'col-span-3',
    'col-span-4',
    'col-span-6',
    'col-span-12',
  ],
  plugins: [],
}


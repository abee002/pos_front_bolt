/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom POS color palette
        'pos-green': '#65B53D',
        'pos-dark': '#353A3F',
        'pos-medium': '#39434B',
        'pos-light': '#E8F5DD',
        // Dark theme variants
        'pos-dark-bg': '#1a1d21',
        'pos-dark-card': '#2a2f35',
        'pos-dark-border': '#404852',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

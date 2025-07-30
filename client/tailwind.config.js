// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1980px" },
      "xl": { max: "1680px" },
      "lg": { max: "1440px" },
      "md": { max: "1024px" },
      "sm": { max: "769px" },
      "xs": { max: "480px" },
      "xxs": { max: "379px" },
    },
    colors: {
      'blue': '#0056D2',
      'red': '#D04715',
      'green': '#50C878',
      'orange': '#FF6B35',
      'lightblue': '#0056D2',
      'lightpurple': '#C5C5E2',
      'lightorange': '#FFC8AB',
      'lightgray': '#F5F5F54D',
      // Keep some default colors you might need
      'white': '#ffffff',
      'black': '#000000',
      'transparent': 'transparent',
      'current': 'currentColor',
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111", 
        secondary: "#666666",
        accent: "#f5f5f5",
      }
    },
  },
  plugins: [],
}
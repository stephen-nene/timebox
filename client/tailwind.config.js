/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Rubik Vinyl", "serif"],
      logo2: "Agu Display",
      Sixtyfour: "Sixtyfour",
    },
    extend: {},
  },
  plugins: [],
};
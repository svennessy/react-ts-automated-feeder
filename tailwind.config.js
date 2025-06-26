/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Raleway", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "640px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "3000px",
    },
  },
  plugins: [],
}

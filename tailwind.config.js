/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#497ECF",
        secondary_yellow: "#FFC436",
        secondary_red: "#f9597a",
        secondary_green: "#54B435",
      },
      borderWidth: {
        red: "1px",
      },
      borderColor: {
        red: "#e53e3e",
      },
    },
  },
  plugins: [],
};

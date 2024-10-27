/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: { 
        headerBg: "#dfdedd",
        primary: "#eb4f3e",
        textColor: "#070707",
        disabled: "#5e6571",
        light: "#ffffff",
      },
    },
  },
  plugins: [],
};
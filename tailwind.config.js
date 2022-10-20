/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-0": "#FFFFFF",
        "primary-100": "#FAFAFA",
        "primary-200": "#F7F7F7",
        "primary-300": "#F3F3F3",
        "secondary-200": "#66737E",
        "error-100": "#E37E5D",
        "error-200": "#D2524C",
        success: "#E0F19B",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

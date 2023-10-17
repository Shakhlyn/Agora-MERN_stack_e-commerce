/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "500px",
        mobile: "300px",
      },
      colors: {
        gray: "#394867",
      },
    },
  },
  plugins: [],
};

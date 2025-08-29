/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#12332e",   // deep green
        accent: "#cac2b0",  // cookie tan
        cream: "#e9e7e2",
        ink: "#1f2937"
      }
    },
  },
  plugins: [],
};
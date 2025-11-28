/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#22c55e",
        darkBg: "#050816",
        cardBg: "#0f172a",
      },
    },
  },
  plugins: [],
};

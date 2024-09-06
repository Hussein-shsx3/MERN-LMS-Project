/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        title: "var(--title-color)",
        text: "var(--text-color)",
        icons: "var(--icons-color)",
        borderColor: "var(--border-color)",
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1400",
      },
    },
  },
  plugins: [],
};

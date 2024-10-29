/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        primary:"var(--color-primary)",
        title: "var(--title-color)",
        text: "var(--text-color)",
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1250px",
        "2xl": "1400",
      },
    },
  },
  plugins: [],
};

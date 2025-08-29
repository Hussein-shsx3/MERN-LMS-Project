module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        title: "var(--title-color)",
        text: "var(--text-color)",
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "1000px",
        xl: "1290px",
        "2xl": "1400",
      },
      animation: {
        scrollH: "scroll 1s",
      },
    },
  },
  plugins: [],
};

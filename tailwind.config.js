module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monster: ['"Montserrat"', "sans-serif"],
        secondary: ["Bricolage Grotesque"],
      },
      colors: {
        primary: "#425652",
        secondary: "#EBE2D0",
      },
      animation: {
        dash: "dash 2s ease-in-out forwards",
      },
      keyframes: {
        dash: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default {
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
        dash: "dash 2s ease-in-out infinite",
      },
      keyframes: {
        dash: {
          "0%": { strokeDashoffset: "1000" },
          "50%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "1000" },
        },
      },
    },
  },
  plugins: [],
};

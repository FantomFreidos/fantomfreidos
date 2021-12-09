module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg: "#306082",
        fg: "#CBDBFC",
      },
      fontFamily: {
        vt323: "'VT323', monospace;",
        barlow: "'Barlow', sans-serif;",
        whacky: "'whackyjoe'",
      },
      backgroundImage: {
        hero: "url('/assets/images/hero.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

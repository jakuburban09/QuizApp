/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primaryGray: "#F5F5F5",
      purple: "#6F36BC",
      purpleDark: "#36174D",
      blue: "#FF495C",
      red: "#B3100E",
      purpleishWhite: "#F3EFFE",
      purpleishWhiteOpacity: "#F3EFFE8C", // 8C represents 56% opacity
      grayOpacity: "#66666652",
      green: "#167D0F",
      orange: "#A24905",
      gray25: "#F0F0F0",
      gray50: "#DBDBDB",
      gray100: "#C7C7C7",
      gray200: "#B3B3B3",
      gray300: "#9E9E9E",
      gray400: "#8A8A8A",
      gray500: "#707070",
      gray600: "#5C5C5C",
      gray700: "#474747",
      gray800: "#333333",
      gray900: "#1F1F1F",
      black40Transparent: "#00000040",
      purple100: "#EDD7FB",
      purple200: "#D8B1F8",
      purple300: "#B986EA",
      purple400: "#9963D6",
      purple500: "#6F36BC",
      purple600: "#5627A1",
      purple700: "#3F1B87",
      purple800: "#2C116D",
      purple900: "#1E0A5A",
      green100: "#EEFBCE",
      green200: "#DAF89E",
      green300: "#BAEA6B",
      green400: "#98D544",
      green500: "#6BBA12",
      green600: "#539F0D",
      green700: "#3F8509",
      green800: "#2D6B05",
      green900: "#205903",
      orange100: "#FEF2CD",
      orange200: "#FEE29B",
      orange300: "#FCCD69",
      orange400: "#FAB843",
      orange500: "#F79707",
      orange600: "#D47905",
      orange700: "#B15D03",
      orange800: "#8F4502",
      orange900: "#763401",
      blue100: "#C8FAEE",
      blue200: "#94F6E7",
      blue300: "#5CE6DB",
      blue400: "#33CDCD",
      blue500: "#009EAD",
      blue600: "#007B94",
      blue700: "#005D7C",
      blue800: "#004364",
      blue900: "#003053",
      red100: "#FDDFD4",
      red200: "#FBB9AA",
      red300: "#F38A7E",
      red400: "#E75D5C",
      red500: "#D82B39",
      red600: "#B91F39",
      red700: "#9B1538",
      red800: "#7D0D35",
      red900: "#670832",
    },
    extend: {
      bg: {
        purpleishWhite: "#F3EFFE8C",
      },
      "custom-div": {
        bg: "#F3EFFE8C",
        color: "#36174D",
        border: "66666652",
      },
      boxShadow: {
        basic: "0px 0px 12px 0px rgba(0,0,0,0.2)",
      },
    },
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
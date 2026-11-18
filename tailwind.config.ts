import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        choc: {
          950: "#120A06",
          900: "#1E110B",
          800: "#2C1810",
          700: "#3E2217",
          600: "#543020",
          500: "#6E422D",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FDF8EE",
          200: "#F7EFE0",
          300: "#EFE2C9",
          400: "#E2CEAA",
        },
        gold: {
          300: "#F3DF98",
          400: "#E5C158",
          500: "#D4AF37",
          600: "#B89225",
          700: "#8F6F16",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

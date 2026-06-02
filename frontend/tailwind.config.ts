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
        primary: {
          50: "#f0f6fb",
          100: "#dfe8f6",
          200: "#c4d9f1",
          300: "#a3c5e8",
          400: "#7fa8dd",
          500: "#5a88ce",
          600: "#3967c1",
          700: "#2a4ca8",
          800: "#1f3580",
          900: "#032343",
          950: "#021528",
        },
        secondary: {
          50: "#fefbf3",
          100: "#fef6e4",
          200: "#fce8c3",
          300: "#f9d99b",
          400: "#f5c66a",
          500: "#edb247",
          600: "#e6a31e",
          700: "#d48c16",
          800: "#b8711a",
          900: "#6b4109",
        },
        accent: {
          50: "#fefbf3",
          100: "#fef6e4",
          200: "#fce8c3",
          300: "#f9d99b",
          400: "#f5c66a",
          500: "#edb247",
          600: "#e6a31e",
          700: "#d48c16",
          800: "#b8711a",
          900: "#6b4109",
        },
        dark: "#032343",
        light: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideInUp: "slideInUp 0.6s ease-out",
        slideInDown: "slideInDown 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

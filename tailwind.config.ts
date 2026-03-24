import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3c74ae",
          "blue-dark": "#2d5f96",
          "blue-light": "#e8f0f9",
          ash: "#8f8b8f",
        },
        surface: {
          DEFAULT: "#f5f7fa",
          elevated: "#eef1f5",
        },
        // Compatibility aliases for existing class names.
        gold: "#3c74ae",
        "gold-light": "#2d5f96",
        dark: "#ffffff",
        "dark-surface": "#f5f7fa",
        "dark-elevated": "#eef1f5",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(60,116,174,0.35)" },
          "70%": { boxShadow: "0 0 0 10px rgba(60,116,174,0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E8C97A",
        dark: "#0A0A0A",
        "dark-surface": "#111111",
        "dark-elevated": "#1A1A1A",
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
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(201,168,76,0)" },
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


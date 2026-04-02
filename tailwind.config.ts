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
        dark: {
          DEFAULT: "#0A0A0A",
          surface: "#111111",
          elevated: "#1a1a2a",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
        },
        surface: {
          DEFAULT: "#f5f7fa",
          elevated: "#eef1f5",
        },
        text: {
          primary: "#1a1a2e",
          secondary: "#4a4a6a",
          muted: "#8f8b8f",
        },
        border: {
          DEFAULT: "#dde2e8",
        },
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-blue": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-blue": "pulse-blue 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

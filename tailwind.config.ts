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
        primary: {
          DEFAULT: "#3c74ae",
          deep: "#2a5a8c",
          soft: "#eaf2fa",
          softer: "#f4f8fc",
          100: "#eaf2fa",
        },
        navy: {
          DEFAULT: "#1a2942",
          2: "#324562",
        },
        ink: "#0e1a2e",
        muted: "#6b7a90",
        line: {
          DEFAULT: "#e5eaf1",
          2: "#eef1f6",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15,30,60,.04), 0 1px 1px rgba(15,30,60,.03)",
        md: "0 8px 24px -10px rgba(28,52,90,.18), 0 2px 6px rgba(28,52,90,.05)",
        lg: "0 30px 60px -25px rgba(28,52,90,.25), 0 8px 20px -10px rgba(28,52,90,.12)",
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

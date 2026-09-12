import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0B",
        obsidian: { DEFAULT: "#141417", raised: "#1C1C20" },
        crimson: { DEFAULT: "#FF1053", bright: "#FF3D77", deep: "#B80B3D" },
        chrome: { light: "#D8D8DE", dark: "#6E6E76" },
        ink: "#F5F5F7",
        steel: "#9A9AA3",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        ui: ["var(--font-rajdhani)", "sans-serif"],
        glitch: ["var(--font-press-start)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        lg: "12px",
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        scan: 'scan 4s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;

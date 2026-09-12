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
        void: "var(--bg-void)",
        panel: "var(--bg-panel)",
        line: "var(--line)",
        ink: {
          DEFAULT: "var(--ink)",
          dim: "var(--ink-dim)",
        },
        signal: {
          DEFAULT: "var(--signal)",
          warm: "var(--signal-warm)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        lg: "12px",
      }
    },
  },
  plugins: [],
};
export default config;

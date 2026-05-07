import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        card: "var(--card)",
        border: "var(--border)",
        "muted-foreground": "var(--text-2)",
        "surface-2": "var(--surface-2)",
        brand: {
          blue: "var(--brand-blue)",
          yellow: "var(--brand-yellow)",
          green: "var(--brand-green)",
          pink: "var(--brand-pink)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "var(--shadow)",
        "soft-sm": "var(--shadow-sm)",
      },
    },
  },
  plugins: [],
};

export default config;


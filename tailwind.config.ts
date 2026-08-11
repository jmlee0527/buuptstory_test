import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4267A8",
        ink: "#292929",
        surface: "#FFFDF6",
      },
      boxShadow: {
        card: "3px 4px 0 rgba(53, 53, 53, 0.08), 0 10px 24px -18px rgba(53, 53, 53, 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 280ms ease-out" },
    },
  },
  plugins: [],
} satisfies Config;

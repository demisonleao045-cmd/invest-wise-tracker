import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-2": "var(--brand-2)",
        bg: "var(--bg)",
        muted: "var(--muted)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
};
export default config;

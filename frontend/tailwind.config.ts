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
        legal: {
          50: '#f2f9f5',
          100: '#e1f2e7',
          200: '#c5e5d1',
          300: '#9bd2b1',
          400: '#6bb88c',
          500: '#469b6b',
          600: '#347d54',
          700: '#2a6344',
          800: '#234f38',
          900: '#1b4332',
          950: '#0d251c',
        },
        sand: {
          50: '#faf9f6',
          100: '#f4f2ec',
          200: '#e8e4d8',
          300: '#d9d2c0',
        }
      },
    },
  },
  plugins: [],
};
export default config;

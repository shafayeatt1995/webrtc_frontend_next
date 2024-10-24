/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "pulse-scale": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "0.8",
          },
        },
      },
      animation: {
        "pulse-scale": "pulse-scale 1.5s ease-in-out infinite",
      },
    },
  },
  safelist: [
    "text-green-600",
    "text-yellow-600",
    "text-rose-600",
    "text-blue-600",
    "top-5",
    "bottom-5",
    "left-5",
    "right-5",
    "left-1/2",
    "-translate-x-1/2",
    "transition",
  ],
  plugins: [],
};

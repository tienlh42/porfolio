/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // blue-600
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#7C3AED", // indigo-600
          dark: "#5B21B6",
        },
        accent: "#EAB308", // amber-500
        background: {
          light: "#F8FAFC", // slate-50
          dark: "#0F172A", // slate-900
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

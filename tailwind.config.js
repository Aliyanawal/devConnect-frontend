// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",     // Dark Blue
        secondary: "#1e293b",   // Slightly lighter
        accent: "#3b82f6",     // Blue
        light: "#f1f5f9",       // Light Grey
        danger: "#ef4444",     // Red
        success: "#10b981",    // Green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        fade: "fadeIn 1.5s ease-in-out",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
};

/* styles.css */


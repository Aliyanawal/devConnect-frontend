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
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Animation Utilities */
.animate-fade {
  animation: fadeIn 1.5s ease-in-out;
}

/* Component Enhancements */
.navbar {
  @apply bg-primary text-light p-4 flex justify-between items-center shadow-md;
}

.btn {
  @apply bg-accent text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300;
}

.footer {
  @apply bg-secondary text-light py-4 text-center text-sm;
}

.card {
  @apply bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ease-in-out;
}

.input {
  @apply w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent;
}

.label {
  @apply font-semibold text-gray-700;
}

.container-centered {
  @apply max-w-4xl mx-auto p-6;
}

.heading {
  @apply text-3xl font-bold text-primary mb-6 animate-fade;
}

.text-link {
  @apply text-accent hover:underline;
}

.success-msg {
  @apply text-success text-sm mt-1;
}

.error-msg {
  @apply text-danger text-sm mt-1;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .navbar {
    @apply flex-col items-start;
  }

  .card {
    @apply p-4;
  }

  .heading {
    @apply text-2xl;
  }
}

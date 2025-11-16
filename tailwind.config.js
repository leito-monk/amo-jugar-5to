import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'edu-primary': '#4F46E5',
        'edu-secondary': '#F59E0B',
        'edu-success': '#10B981',
        'edu-danger': '#EF4444',
        'edu-warning': '#F59E0B',
        'edu-info': '#3B82F6',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ['Comic Neue', 'cursive'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        eduTheme: {
          "primary": "#4F46E5",
          "secondary": "#F59E0B",
          "accent": "#10B981",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
}

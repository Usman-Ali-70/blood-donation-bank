/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#DC2626',
          dark: '#EF4444',
        },
        secondary: {
          DEFAULT: '#EC4899',
          dark: '#F472B6',
        },
        neutral: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 10px 30px rgba(0, 0, 0, 0.4)',
        'hover': '0 20px 40px rgba(220, 38, 38, 0.2)',
        'hover-dark': '0 20px 40px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
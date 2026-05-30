/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#7F56D9',
          600: '#6941C6',
        },
        dark: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#101828'
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-text': 'linear-gradient(90deg, #FF58D5 0%, #4E6EFF 100%)',
        'gradient-bg': 'linear-gradient(90deg, rgba(255, 88, 213, 0.5) 0%, rgba(78, 110, 255, 0.5) 100%)',
      }
    },
  },
  plugins: [],
}

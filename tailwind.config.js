/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Blues
        primary: {
          DEFAULT: '#5B7CFF',
          dark: '#3F5BDB',
          light: '#7A94FF',
        },
        secondary: {
          DEFAULT: '#8FD3FE',
          light: '#B0E2FF',
        },
        // Joyful Accents
        mint: {
          DEFAULT: '#34D399',
          dark: '#10B981',
          light: '#6EE7B7',
        },
        sunny: {
          DEFAULT: '#FBBF24',
          light: '#FEF3C7',
        },
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FFE4E6',
        },
        // Professional Neutrals
        gray: {
          900: '#1F2937',
          600: '#6B7280',
          300: '#E5E7EB',
          100: '#F9FAFB',
          50: '#F5F7FF',
        },
        // Background
        background: '#F5F7FF',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'custom': '0 10px 15px -3px rgba(91, 124, 255, 0.1), 0 4px 6px -2px rgba(91, 124, 255, 0.05)',
        'custom-lg': '0 20px 25px -5px rgba(91, 124, 255, 0.15), 0 10px 10px -5px rgba(91, 124, 255, 0.1)',
      },
    },
  },
  plugins: [],
}

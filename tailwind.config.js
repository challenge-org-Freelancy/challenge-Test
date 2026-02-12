/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#b3d1f9',
          dark: '#02066F',
          light: '#C7D3E6',
        },
        royal: {
          DEFAULT: '#02066F',
          light: '#2F5DCC',
        },
        // Supporting Blues
        softBlue: {
          DEFAULT: '#C7D3E6',
          light: '#E8EEF7',
        },
        lightBlue: {
          DEFAULT: '#E8EEF7',
        },
        // Secondary Neutral Colors
        beige: {
          DEFAULT: '#f5f5dc',
          light: '#F5F1ED',
        },
        maroon: {
          DEFAULT: '#800020',
          dark: '#5C0017',
          light: '#A64D4D',
        },
        gray: {
          DEFAULT: '#D8D8D8',
          dark: '#2B2F36',
          600: '#6B7280',
          300: '#D8D8D8',
          100: '#F9FAFB',
          50: '#E8EEF7',
        },
        charcoal: {
          DEFAULT: '#2B2F36',
        },
        // Accent Colors (Use Sparingly)
        success: {
          DEFAULT: '#3FA66B',
          light: '#E8F5ED',
        },
        warning: {
          DEFAULT: '#E5A100',
          light: '#FFF8E5',
        },
        error: {
          DEFAULT: '#D64545',
          light: '#FEE8E8',
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
        background: '#E8EEF7',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(179, 209, 249, 0.12), 0 2px 4px rgba(179, 209, 249, 0.08)',
        'custom-lg': '0 8px 24px rgba(179, 209, 249, 0.15), 0 4px 8px rgba(179, 209, 249, 0.1)',
      },
    },
  },
  plugins: [],
}

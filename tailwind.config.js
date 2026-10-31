/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        khaki: {
          50: '#FAF7F0',
          100: '#F4EFE2',
          200: '#E8DFC8',
          300: '#D9CBA9',
          400: '#C3B091', // Standard Khaki
          500: '#A9956C',
          600: '#8A7545', // Deep Khaki
          700: '#6C5B34',
          800: '#504325',
          900: '#352C18',
        },
        emergency: {
          DEFAULT: '#B3261E',
          hover: '#951F18',
          light: '#FDF2F2',
          dark: '#3D0E0B',
        },
        success: {
          DEFAULT: '#2D8063',
          light: '#EAF5F0',
          dark: '#14382B',
        },
        warning: {
          DEFAULT: '#B77B25',
          light: '#FBF4E8',
          dark: '#452D0A',
        },
        paper: {
          light: '#F6F1E4',
          dark: '#2A251A',
        },
        textMain: {
          light: '#3B3426',
          dark: '#F3EDDC',
        },
        textMuted: {
          light: '#6F6954',
          dark: '#BDB59C',
        },
        borderBase: {
          light: '#E6DCC3',
          dark: '#4A4230',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(59, 52, 38, 0.06), 0 4px 20px -2px rgba(59, 52, 38, 0.04)',
        'soft-lg': '0 8px 30px -4px rgba(59, 52, 38, 0.08), 0 4px 14px -2px rgba(59, 52, 38, 0.05)',
      }
    },
  },
  plugins: [],
}

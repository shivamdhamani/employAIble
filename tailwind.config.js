/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:       '#F5F7FA',
        'bg-alt': '#EEF2F7',
        surface:  '#FFFFFF',
        border:   '#D1DAE8',
        'border-s':'#B0BFD4',
        brand:    '#0056B3',
        'brand-d':'#003D80',
        'brand-l':'#E8F0FA',
        teal:     '#0E7490',
        'teal-l': '#E0F5F8',
        success:  '#15803D',
        warning:  '#B45309',
        error:    '#B91C1C',
        'text-1': '#2D2D2D',
        'text-2': '#4B5563',
        'text-3': '#6B7280',
        'text-4': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter','system-ui','-apple-system','sans-serif'],
      },
    },
  },
  plugins: [],
}

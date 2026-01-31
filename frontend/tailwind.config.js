/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Unbounded', 'sans-serif'],
      },
      colors: {
        background: '#050505',
        foreground: '#E5E5E5',
        primary: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#C0C0C0',
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#262626',
          foreground: '#9CA3AF',
        },
        border: '#333333',
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          foreground: '#E5E5E5',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

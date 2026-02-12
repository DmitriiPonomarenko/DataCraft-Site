/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          dark: '#020617',
          light: '#1e293b',
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          neon: '#0ea5e9',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.95) 100%)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.45), 0 0 40px rgba(14, 165, 233, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.7), 0 0 60px rgba(14, 165, 233, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(14, 165, 233, 0.4)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
};

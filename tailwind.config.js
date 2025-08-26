export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6E19',
          secondary: '#FF8533',
          light: '#FFE6D6',
          dark: '#E55A0F',
          gradient: 'linear-gradient(135deg, #FF6E19 0%, #FF8533 100%)',
        },
        accent: {
          gold: '#FFD700',
          cream: '#FFF8F0',
          warm: '#FFF2E6',
        }
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(255, 110, 25, 0.25)',
        premium: '0 20px 40px -15px rgba(255, 110, 25, 0.3)',
        glow: '0 0 20px rgba(255, 110, 25, 0.3)',
        card: '0 8px 32px rgba(0, 0, 0, 0.1)',
        floating: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

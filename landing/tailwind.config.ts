import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#070a05',
        'bg-darker': '#030402',
        'accent': '#393f5b',
        'text-primary': '#f3f6f8',
        'text-secondary': '#a8b2c1',
        'text-muted': '#6b7280',
      },
      spacing: {
        'section': 'clamp(5rem, 15vw, 10rem)',
        'component': 'clamp(3rem, 8vw, 6rem)',
        'element': 'clamp(1.5rem, 4vw, 3rem)',
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 7rem)',
        'h1': 'clamp(2.5rem, 6vw, 5rem)',
        'h2': 'clamp(2rem, 5vw, 4rem)',
        'h3': 'clamp(1.5rem, 3vw, 2.5rem)',
        'body-large': 'clamp(1.125rem, 2vw, 1.5rem)',
        'body': 'clamp(1rem, 1.5vw, 1.125rem)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '600ms',
        'bounce': '500ms',
      },
      boxShadow: {
        'glow': '0 0 50px rgba(79, 70, 229, 0.3)',
        'glow-sm': '0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)',
        'glow-lg': '0 0 30px rgba(79, 70, 229, 0.5), 0 0 60px rgba(124, 58, 237, 0.3), 0 0 90px rgba(236, 72, 153, 0.2)',
      },
      animation: {
        'breathe': 'breathe 25s ease-in-out infinite',
        'mesh-rotate': 'mesh-rotate 60s linear infinite',
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'gradient-rotate': 'gradient-rotate 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1) rotate(2deg)' },
        },
        'mesh-rotate': {
          '0%': { transform: 'rotate(0deg) translateX(0)' },
          '100%': { transform: 'rotate(360deg) translateX(20px)' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-rotate': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(124, 58, 237, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config

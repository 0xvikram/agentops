import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#FAFAFC', // Page background
        'dark-secondary': '#FFFFFF', // Card panels
        'dark-tertiary': '#F1F3F5', // Accent background / border
        'accent': '#6366f1', // Premium indigo
        'accent-hover': '#4f46e5',
        'accent-light': '#eef2ff', // Light indigo background
        'agentops-purple': '#7c3aed',
        'agentops-violet': '#8b5cf6',
        'agentops-gray': '#64748b',
        'agentops-dark': '#0f172a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'glow-violet': '0 0 25px rgba(124, 58, 237, 0.15)',
        'glow-indigo': '0 0 25px rgba(99, 102, 241, 0.15)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
export default config


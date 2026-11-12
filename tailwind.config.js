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
        kps: {
          dark: '#080C14',
          surface: '#0F1626',
          card: '#141D30',
          elevated: '#1A243B',
          border: '#23304A',
          borderLight: '#324568',
          gold: '#F59E0B',
          goldHover: '#D97706',
          goldLight: '#FCD34D',
          amber: '#F59E0B',
          cyan: '#0EA5E9',
          cyanGlow: '#38BDF8',
          textMuted: '#94A3B8',
          textDim: '#64748B',
          textBright: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['"Archivo"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Archivo"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'industrial-mesh': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 60%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}


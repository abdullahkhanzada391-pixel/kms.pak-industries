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
          // Dark Luxury Industrial Palette
          dark: '#111315',         // Primary background
          surface: '#181C1B',      // Secondary background
          card: '#24282A',         // Card background
          cardElevated: '#2C3234', // Hover & elevated card
          border: '#343B37',       // Industrial border
          borderLight: '#464F4A',  // Subtle highlighted border
          
          // Forest Green Spectrum (Engineering, Reliability, Innovation)
          green: '#174D38',        // Primary forest green
          greenLight: '#216447',   // Secondary green
          greenGlow: '#2E8B62',    // Accent emerald highlight
          greenDeep: '#0D2E21',    // Rich deep forest backdrop
          greenDark: '#0A2017',    // Ultra-deep green surface
          
          // Crimson Red Spectrum (Selective CTAs, Active States, Critical Numbers)
          crimson: '#B51F32',      // Primary crimson red
          crimsonHover: '#D12B42', // Secondary crimson hover
          crimsonLight: '#E83E55', // High-contrast crimson
          crimsonGlow: 'rgba(181, 31, 50, 0.35)',

          // Typography
          textPrimary: '#E8ECE9',  // Primary off-white text
          textSecondary: '#929A96',// Secondary muted grey-green text
          textMuted: '#68726E',    // Dim technical labels
          textDim: '#4E5753',

          // Compatibility fallbacks
          gold: '#216447',
          goldHover: '#174D38',
          amber: '#216447',
          cyan: '#174D38'
        }
      },
      fontFamily: {
        sans: ['"Archivo"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Archivo"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'forest-vignette': 'radial-gradient(circle at 50% 50%, rgba(23, 77, 56, 0.12) 0%, transparent 70%)',
        'crimson-vignette': 'radial-gradient(circle at 50% 50%, rgba(181, 31, 50, 0.10) 0%, transparent 70%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}

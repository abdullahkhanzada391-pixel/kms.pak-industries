/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 70% White Canvas & Clean Modern Light Surfaces
        canvas: '#FFFFFF',
        slateLight: '#F8FAFC',
        cardWhite: '#FFFFFF',
        softBorder: '#E2E8F0',
        softBorderGold: '#F1E5D1',

        // 20% Deep Engineering Navy Blue (HK Power Industries Core)
        navy: {
          DEFAULT: '#0B192C',
          deep: '#060E18',
          dark: '#0A192F',
          surface: '#0F2648',
          royal: '#1E3A8A',
          electric: '#2563EB',
          subtle: '#1E293B',
          text: '#0B192C',
          body: '#334155',
          muted: '#64748B',
          light: '#94A3B8'
        },

        // 20% Vibrant & Luxurious Gold Accent (HK Power Lightning & Prestige)
        gold: {
          DEFAULT: '#C59B27',
          light: '#F59E0B',
          metallic: '#D4AF37',
          amber: '#D97706',
          dark: '#92400E',
          shimmer: '#FDE68A',
          tint: '#FFFBEB',
          surface: 'rgba(197, 155, 39, 0.1)',
          border: 'rgba(197, 155, 39, 0.3)'
        },

        // Backward-compatible semantic mappings to guarantee full theme coverage
        latte: '#F8FAFC',          // Crisp light slate
        warmIvory: '#FFFFFF',      // Crisp pure white canvas
        mochaCream: '#F1F5F9',     // Clean secondary tint
        softBeige: '#E2E8F0',      // Architectural border
        
        darkMocha: '#0B192C',      // Deep Navy Text
        coffeeBrown: '#334155',    // Slate Navy Secondary Text
        warmTaupe: '#C59B27',      // Warm Gold Accent
        
        burgundy: '#0B192C',       // Primary Navy CTA
        burgundyHover: '#1E3A8A',  // Royal Navy Hover
        mutedWine: '#C59B27',      // Gold Badge Accent
        wineLight: 'rgba(197, 155, 39, 0.12)',
        
        softBorderDark: '#CBD5E1',
        mutedText: '#64748B',      // Slate Muted
        lightMuted: '#94A3B8',

        kps: {
          bg: '#FFFFFF',
          latte: '#F8FAFC',
          card: '#FFFFFF',
          cardMuted: '#F8FAFC',
          cardMocha: '#F1F5F9',
          dark: '#0B192C',
          darkSurface: '#0A192F',
          coffee: '#334155',
          border: '#E2E8F0',
          burgundy: '#0B192C',
          burgundyHover: '#1E3A8A',
          wine: '#C59B27',
          text: '#0B192C',
          textMuted: '#64748B',
          taupe: '#C59B27'
        }
      },
      fontFamily: {
        serif: ['"Bodoni 72 Bold"', '"Bodoni Poster"', '"Bodoni MT Poster Compressed"', '"Bodoni 72"', '"Bodoni Moda"', '"Bodoni MT"', '"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Bodoni 72 Bold"', '"Bodoni Poster"', '"Bodoni MT Poster Compressed"', '"Bodoni 72"', '"Bodoni Moda"', '"Bodoni MT"', '"DM Serif Display"', '"Playfair Display"', 'serif'],
        heading: ['"Bodoni 72 Bold"', '"Bodoni Poster"', '"Bodoni MT Poster Compressed"', '"Bodoni 72"', '"Bodoni Moda"', '"Bodoni MT"', '"DM Serif Display"', '"Playfair Display"', 'serif'],
        sans: ['"Bricolage Grotesque"', '"Manrope"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'warm-xs': '0 1px 2px rgba(11, 25, 44, 0.04)',
        'warm-sm': '0 1px 3px rgba(11, 25, 44, 0.06), 0 1px 2px rgba(11, 25, 44, 0.03)',
        'warm-md': '0 4px 14px rgba(11, 25, 44, 0.08)',
        'warm-lg': '0 12px 32px rgba(11, 25, 44, 0.10)',
        'warm-xl': '0 20px 48px -8px rgba(11, 25, 44, 0.14)',
        'warm-2xl': '0 25px 60px -12px rgba(11, 25, 44, 0.22)',
        'gold-glow': '0 8px 24px rgba(197, 155, 39, 0.32)',
        'navy-glow': '0 8px 24px rgba(11, 25, 44, 0.30)',
        'burgundy-glow': '0 8px 24px rgba(11, 25, 44, 0.28)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

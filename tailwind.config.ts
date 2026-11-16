import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8ed',
          100: '#f6eed4',
          200: '#eddcaa',
          300: '#e1c376',
          400: '#d7ab48',
          500: '#c5932a',
          600: '#b8860b',
          700: '#8a6218',
          800: '#6f4e1b',
          900: '#463116',
          metallic: '#D4AF37',
          shimmer: '#F3E5AB',
          champagne: '#F7E7CE',
        },
        burgundy: {
          950: '#23040c',
          900: '#3d0714',
          800: '#5c0b1f',
          700: '#7e102d',
          600: '#9d163a',
          500: '#be1f48',
        },
        midnight: {
          950: '#030814',
          900: '#071022',
          800: '#0d1b38',
          700: '#14284b',
          600: '#1e3a6a',
        },
        emeraldTeal: {
          950: '#041614',
          900: '#082522',
          800: '#0e3a36',
          700: '#15524c',
          600: '#1e6f67',
        },
        silver: {
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        cinzel: ['var(--font-cinzel)', 'Cinzel Decorative', 'Georgia', 'serif'],
        handwriting: ['var(--font-greatvibes)', 'Great Vibes', 'cursive'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)',
        'silver-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%)',
        'royal-gradient': 'linear-gradient(180deg, #3d0714 0%, #1a0309 100%)',
        'midnight-sky': 'radial-gradient(ellipse at top, #14284b 0%, #071022 65%, #030814 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.65)',
        'silver-glow': '0 0 25px rgba(226, 232, 240, 0.4)',
        'royal': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      screens: {
        'fold-cover': { max: '350px' },
        'fold-unfolded': { raw: '(min-aspect-ratio: 4/5) and (max-width: 960px)' },
      },
    },
  },
  plugins: [],
};

export default config;

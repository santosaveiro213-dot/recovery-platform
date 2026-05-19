import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          50: '#f1f5fa',
          100: '#dde7f1',
          200: '#bccee3',
          300: '#8eadcd',
          400: '#5d87b3',
          500: '#3e6a99',
          600: '#305380',
          700: '#284468',
          800: '#1e3a5f',
          900: '#1a3052',
          950: '#0f1d34'
        },
        secondary: {
          DEFAULT: '#c9a84c',
          50: '#fbf8ee',
          100: '#f5edcf',
          200: '#ebd99c',
          300: '#e0c067',
          400: '#d6ab45',
          500: '#c9a84c',
          600: '#a37623',
          700: '#825a1f',
          800: '#6d4a20',
          900: '#5d3f21',
          950: '#36220e'
        },
        accent: {
          DEFAULT: '#2a9d8f',
          50: '#effbf8',
          100: '#d8f4ee',
          200: '#b3e9dd',
          300: '#83d7c8',
          400: '#52beaf',
          500: '#2a9d8f',
          600: '#1f807a',
          700: '#1c6663',
          800: '#1a5251',
          900: '#194543',
          950: '#082827'
        },
        ink: {
          DEFAULT: '#2c2c2c',
          soft: '#4a4a4a',
          muted: '#6b6b6b'
        },
        canvas: {
          DEFAULT: '#f8f7f4',
          raised: '#ffffff',
          sunken: '#efece5'
        }
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        serif: [
          'var(--font-serif)',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif'
        ]
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(30, 58, 95, 0.15)',
        lift: '0 12px 40px -12px rgba(30, 58, 95, 0.25)',
        ring: '0 0 0 4px rgba(42, 157, 143, 0.15)'
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        'node-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.25)', opacity: '1' }
        },
        'dash': {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' }
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, -3px)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-fast': 'fade-in-fast 0.3s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'node-pulse': 'node-pulse 2.2s ease-in-out infinite',
        'dash': 'dash 1.6s linear infinite',
        'drift': 'drift 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;

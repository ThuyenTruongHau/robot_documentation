/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fffe',
          100: '#ccfffe',
          200: '#99fffd',
          300: '#5dfcfa',
          400: '#22eef2',
          500: '#36A9A9',
          600: '#2d8f8f',
          700: '#247575',
          800: '#1e5e5e',
          900: '#194d4d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200', 
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      // Custom responsive breakpoints for large screens
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3440px',
      },
      // Absolute container widths for different screen sizes
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px', 
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
        'container-3xl': '1800px',
        'container-4xl': '2400px',
        'container-5xl': '3200px',
        'container-full': '100%',
      },
      // Absolute spacing for large screens
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '256': '64rem',
      },
      // Min heights for responsive cards
      minHeight: {
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
      }
    },
  },
  plugins: [],
}

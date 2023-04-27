// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{tsx,tsx,js,ts,jsx}',
  ],
  theme: {
    screens: {
      xs: '370px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        pale: 'var(--pale)',
        dark_pale: 'var(--dark_pale)',
        electric_blue: 'var(--electric_blue)',
        border: 'var(--border)',
        navy: 'var(--navy)',
        dark_navy: 'var(--dark_navy)',
        background: 'var(--background)',
        muted: 'var(--muted)',
        primaryBlack: 'var(--primaryBlack)',
        secondaryBlack: 'var(--secondaryBlack)',
        tertiaryBlack: 'var(--tertiaryBlack)',
      },
      width: {
        128: '32rem',
      },
      blur: {
        10: '10px',
      },
      fontFamily: {
        bebas_neue: ['Bebas Neue', 'sans-serif']
      }
    },
  },
};

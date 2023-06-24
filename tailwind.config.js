// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '370px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        pale: 'var(--pale)',
        slate: 'var(--slate)',
        dark_pale: 'var(--dark_pale)',
        electric_blue: 'var(--electric_blue)',
        border: 'var(--border)',
        navy: 'var(--navy)',
        beige: 'var(--beige)',
        dark_navy: 'var(--dark_navy)',
        background: 'var(--background)',
        muted: 'var(--muted)',
        primaryBlack: 'var(--primaryBlack)',
        secondaryBlack: 'var(--secondaryBlack)',
        tertiaryBlack: 'var(--tertiaryBlack)',
      },
      fontFamily: {
        bebas: ['var(--font-bebas-neue)'],
      },
      screens: {
        tall: { raw: '(min-height: 1000px)' },
      },
    },
  },
};

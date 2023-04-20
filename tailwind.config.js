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
        stark: '#e7dfdd',
        navy: '#0B2447',
        background: '#f6f6f6',
        primaryBlack: '#161616',
        secondaryBlack: '#242424',
        tertiaryBlack: '#282828',
      },
      width: {
        128: '32rem',
      },
      blur: {
        10: '10px',
      },
    },
  },
};

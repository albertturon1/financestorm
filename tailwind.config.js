/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{tsx,tsx,js,ts,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#161616',
        secondaryBlack: '#242424',
        tertiaryBlack: '#282828',
      },
      width: {
        128: '32rem',
        144: '40rem',
      },
    },
  },
};

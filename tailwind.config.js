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
        primaryBlack: '#0A0A0A',
        secondaryBlack: '#161616',
      },
    },
  },
};

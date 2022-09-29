const colors = require('tailwindcss/colors');
// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
    },
    fontFamily: {
      // sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
    },
  },
};

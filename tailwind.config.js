/** @type {import('tailwindcss').Config} */

const { colors: customColors } = require('./src/styles/colors');

module.exports = {
content: [
  "./App.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}"

],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'regular': ['SFProDisplay-Regular'],
        'bold': ['SFProDisplay-Bold'],
        'black': ['SFProDisplay-BlackItalic'],
        'heavy': ['SFProDisplay-HeavyItalic'],
        'light': ['SFProDisplay-LightItalic'],
        'medium': ['SFProDisplay-Medium'],
        'semibold': ['SFProDisplay-SemiBoldItalic'],
        'thin': ['SFProDisplay-ThinItalic'],
        'ultralight': ['SFProDisplay-UltraLightItalic'],
      },
      colors: customColors,
    },
  },
  plugins: [],
};

// app/styles/colors.ts
const defaultColors = require('tailwindcss/colors');

export const colors = {
  ...defaultColors, // Keep all Tailwind default colors
  primary: '#24A19C', 
  textdarkblack: '#000000', 
  accent: '#F59E0B', // amber-500
  background: '#F3F4F6', // gray-100
  text: '#767E8C',
  success: '#10B981', // emerald-500
  danger: '#EF4444', // red-500
  warning: '#FBBF24', // amber-400
  textbold: "#1B1C1F",
  inputbg: "#F6F7F9",
  inputborder: "#E0E5ED",
  textblack: '#333333',
};

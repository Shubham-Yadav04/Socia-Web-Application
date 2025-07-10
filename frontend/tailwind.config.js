/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode:'class',
  theme: {
    extend: {
      boxShadow:{
        small:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        light:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        neutral:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        simple:" rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        primary:" rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      },
      
        transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration:{
        sm:1
      }
    },
  },
  plugins: [],
}


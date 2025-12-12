/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // scan all React components
  darkMode: 'class', // enable dark mode
  theme: {
    extend: {
      boxShadow: {
        small:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        light:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        neutral:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        simple:" rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        primary:" rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      },
    },
    //  screens: {
    //   sm: '640px',   // small devices
    //   md: '768px',   // medium devices
    //   lg: '1024px',  // large devices
    //   xl: '1280px',  // extra large
    //   '2xl': '1536px'
    // }
  },
  plugins: [],
}

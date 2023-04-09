/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#f2e1d8",
        "secondary": "#4d5056",
        "secondary-alt": "#73767b",
      },
      borderColor: {
        "primary-darker": "#c9ae9f"
      },
      textColor:{
        "primary": "#f2e1d8",
        "primary-lighter": "#fbf6f3",
        "secondary": "#4d5056",
        "secondary-lighter": "#cacbcc",
        "secondary-darker": "#34373c"
      },
      fontSize: {
        "icon-large": "256px"
      },
      height: {
        "fullscreen": "calc(100vh - 160px)"
      },
      maxHeight: {
        "fullscreen": "calc(100vh - 160px)"
      }
    },
  },
  plugins: [],
}

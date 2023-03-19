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
      fontSize: {
        "icon-large": "256px"
      },
      height: {
        "fullscreen": "calc(100vh - 96px)"
      },
      maxHeight: {
        "fullscreen": "calc(100vh - 96px)"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#d2c39d",
        "secondary": "#658e9c",
        "secondary-alt": "#7BAEBF",
      },
      borderColor: {
        "primary-darker": "#c1ae81"
      },
      fontSize: {
        "icon-large": "256px"
      }
    },
  },
  plugins: [],
}

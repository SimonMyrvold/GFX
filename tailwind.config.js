/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}", "**/**/*.{html,js}", "*.{html.js}"],
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
       'main1' : '#222831',
       'main2' : '#393E46',
       'main3' : '#00ccca',
       'main4' : '#00FFF5',
     },
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'light-teal':'#00C4C4',
      'white':'white',
      'black':'black',
      'teal':'#008080',
      'dark-blue':'#067eaa',
      'gray':'#F2F2F2',
      'primary':'#008080'
    },
    fontFamily:{
      Nunito:['Nunito','sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

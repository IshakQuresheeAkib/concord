/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-teal':'#00C4C4',
        'white':'#ffffff',
        'black':'#000000',
        teal: {
          DEFAULT: '#008080',
          50: '#F0FFFE',
          100: '#C8EBE9',
          200: '#9FD8D5',
          300: '#4FB0AB',
          400: '#1A9390',
          500: '#008080',
          600: '#006B6B',
          700: '#005555',
          800: '#004040',
          900: '#002B2B',
        },
        coral: {
          DEFAULT: '#E07856',
          50: '#FEF8F5',
          100: '#FCDCC8',
          200: '#F9BDA8',
          300: '#F69C7D',
          400: '#EE8B66',
          500: '#E07856',
          600: '#D25D42',
          700: '#B53F2E',
          800: '#8A2E1F',
          900: '#5C1F13',
        },
        'dark-blue': '#067eaa',
        'gray': '#F2F2F2',
        'primary': '#008080',
      },
      fontFamily:{
        Nunito:['Nunito','sans-serif']
      },
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F9CBF]',
        secondary: '#58585B',
        accent: '#FBBF24',
        dark: '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        Belanosima: ['"Belanosima"', 'sans-serif'], 
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #58585B, #0F9CBF)', 
      },
      
    },
  },
  plugins: [],
}


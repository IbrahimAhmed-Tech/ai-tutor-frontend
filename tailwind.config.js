module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

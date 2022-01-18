module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#010001',
          white: '#fffeff',
          green: '#01a25d',
          yellow: '#fac633',
          red: '#da2b05',
          neutral: {
            0: '#e9e6e1',
            1: '#c9c9cc',
            2: '#5a595d',
          },
        },
      },
    },
  },
  plugins: [],
};

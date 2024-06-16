module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1a202c",
          800: "#2d3748",
          700: "#4a5568",
          600: "#718096",
          500: "#a0aec0",
        },
        blue: {
          500: "#4299e1",
          600: "#3182ce",
        },
      },
    },
  },
  plugins: [],
};

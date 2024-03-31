/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        white: "#D9D9D9",
        orange: {
          1: "#E64F00",
          2: "#952100",
        },
        teal: {
          1: "#3B836E",
          2: "#003735",
        },
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};

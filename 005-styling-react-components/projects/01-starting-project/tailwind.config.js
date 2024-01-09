/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // creating a new utility class which allows to use font from google fonts
    extend: {
      fontFamily: {
        // any identifier/name can be given
        title: ['"Pacifico"', "cursive"],
      },
    },
  },
  plugins: [],
};

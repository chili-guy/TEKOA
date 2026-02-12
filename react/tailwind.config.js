/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./react/src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "b-1": "var(--b-1)",
        "b-2": "var(--b-2)",
        "b-4": "var(--b-4)",
        bg: "var(--bg)",
        "label-colorlightprimary": "var(--label-colorlightprimary)",
        line: "var(--line)",
        main: "var(--main)",
        stroke: "var(--stroke)",
        white: "var(--white)",
      },
      fontFamily: {
        "body-reguler-12": "var(--body-reguler-12-font-family)",
        "body-reguler-14": "var(--body-reguler-14-font-family)",
        "button-blod-14": "var(--button-blod-14-font-family)",
        "button-blod-16": "var(--button-blod-16-font-family)",
        "callout-bold": "var(--callout-bold-font-family)",
        "heading-h1": "var(--heading-h1-font-family)",
        "heading-h2": "var(--heading-h2-font-family)",
        "label-medium-14": "var(--label-medium-14-font-family)",
      },
    },
  },
  plugins: [],
};


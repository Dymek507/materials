/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import daisyui from "daisyui";

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".flex-center": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ".wh-full": {
      width: "100%",
      height: "100%",
    },
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      din: ["DIN_Pro", "ui-sans-serif"],
      "din-thin": ["DIN_Pro_thin", "ui-sans-serif"],
      "helvetica-neue": ["Helvetica_Neue", "ui-sans-serif"],
      "helvetica-neue-light": ["Helvetica_Neue_light", "ui-sans-serif"],
    },
    extend: {
      animation: {
        slidey: "upslide 0.2s linear 0s",
      },
      boxShadow: {
        "3xl": "0 65px 90px -30px rgba(0, 0, 0, 1)",
      },
      backgroundImage: {
        "opening-c": "url('/src/assets/concrete-bg.jpg')",
        "walkout-fr-l": "url('/src/assets/opening/walkout_frame_left.png')",
        "walkout-fr-r": "url('/src/assets/opening/walkout_frame_right.png')",
        "walkout-bg-2": "url('/src/assets/opening/walkout-bg-2.png')",
        "squad-field": "url('/src/assets/field-1.svg')",
      },
      colors: {
        "primary-main": "rgba(12,52,86,0.85)",
        "secondary-main": "#f50057",
        main: "#0c3456",
      },
      flex: {
        2: "2 2 0%",
      },
      gridTemplateColumns: {
        "card-stats": "1fr auto 0.2em 1fr 1em auto 0.2em 1fr 1fr",
      },
      gridTemplateRows: {
        "card-stats": "repeat(3, 0.94em)",
      },
      keyframes: {
        upslide: {
          "0%": { transform: "translate(0px,200px)", opacity: 0 },
          "50%": { transform: "translate(0px,100px)", opacity: 0.5 },
          "100%": { transform: "translate(0px,0px)", opacity: 1 },
        },
      },
      screens: {
        xs: "420px",
        sm: "640px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
      },
    },
  },
  plugins: [Myclass, daisyui],
};

import { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Gilroy", "sans-serif"], // Add your custom font
      },
      colors: {
        blue: {
          1: "#1F5AF4",
          2: "#276DF71A",
        },
        gray: {
          0: "#F9F9F9",
          1: "#808080",
          2: "#2A2A2AB2",
          3: "#26262699",
          4: "#CFCFCF",
          5: "#424242",
          6: "#827F9812",
          7: "#E8E8E8",
          8: "#E0E0E0",
        },
        green: {
          1: "#01A85A",
          2: "#44B07E",
        },
        orange: {
          1: "#FF7A00",
        },
        red: {
          1: "#F42C1F",
        },
      },
    },
  },
  plugins: [],
};
export default config;

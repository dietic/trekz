import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      blue: "#1A2958",
      red: "#F08F7B",
      green: "#00D2C1",
      pink: "#FF4E8A",
      white: "#F9F6EE",
      gray: "#A8B2C1",
      "light-gray": "#D6D6D6",
      "dark-gray": "#555555",
      black: "#28282B",
      transparent: "transparent",
    },
    fontFamily: {
      NAM: ["New Amsterdam"],
    },
  },
  plugins: [],
};
export default config;

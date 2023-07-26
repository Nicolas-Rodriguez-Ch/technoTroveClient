/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#001C30",
        "custom-blue": "#176B87",
        "custom-light-blue": "#64CCC5",
        "custom-mint": "#DAFFFB",
      },
    },
  },
  plugins: [],
};

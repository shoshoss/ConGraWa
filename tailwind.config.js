module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        custom_sky: "rgb(56 189 248)",
      },
      fontSize: {
        sm: "15px", // 15pxの文字サイズを設定
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      },
      animation: {
        ripple: "ripple 0.6s linear",
      },
    },
  },
  plugins: [require("daisyui")],
};

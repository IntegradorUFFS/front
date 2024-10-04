/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "menu-in": "menu-in 0.85s ease-in-out",
        "menu-in-content": "menu-in-content 0.85s ease-in-out",
        "menu-out": "menu-out 0.7s ease-in-out",
        "menu-out-content": "menu-out-content 0.85s ease-in-out",
        "width-fit": "width-fit 0.4s ease-in-out",
        "width-0": "width-0 0.35s ease-in-out",
        ripple: "ripple 600ms linear",
      },
      keyframes: {
        "menu-in": {
          "0%": {
            width: 0,
            "max-height": 0,
            padding: 0,
            overflow: "hidden",
            top: "3rem",
          },
          "40%": { padding: "0.5rem", top: "4.5rem" },
          "50%": { padding: "0.75rem", width: 0 },
          "60%": { width: "100%", "max-height": 0 },
          "100%": { "max-height": "6rem", overflow: "hidden" },
        },
        "menu-in-content": {
          "0%": {
            opacity: 0,
          },
          "60%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "menu-out-content": {
          "0%": {
            opacity: 1,
          },
          "20%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "menu-out": {
          "0%": {
            overflow: "hidden",
            maxHeight: "6rem",
          },
          "40%": { padding: "0.75rem", width: 0, maxHeight: 0 },
          "60%": { padding: "0.5rem" },
          "100%": {
            width: 0,
            "max-height": 0,
            padding: 0,
            overflow: "hidden",
            top: "3rem",
            zIndex: "0",
          },
        },
        "width-fit": {
          "0%": { maxWidth: 0, overflow: "hidden", padding: 0 },
          "100%": { maxWidth: "10rem", overflow: "hidden" },
        },
        "width-0": {
          "100%": { maxWidth: 0, overflow: "hidden", padding: 0 },
          "0%": { maxWidth: "10rem", overflow: "hidden" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.4 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

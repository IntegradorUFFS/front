/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lato"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      backgroundImage: {
        artemis: "url('/images/artemis.jpg')",
      },
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
            width: "0",
            "max-height": "0",
            padding: "0",
            overflow: "hidden",
            top: "3rem",
            zindex: "0",
          },
          "40%": {
            padding: "0.5rem",
            top: "4.5rem",
            zindex: "0",
          },
          "50%": {
            padding: "0.75rem",
            width: "0",
            zindex: "0",
          },
          "60%": {
            width: "100%",
            "max-height": "0",
          },
          "100%": {
            "max-height": "6rem",
            overflow: "hidden",
            zindex: "10",
          },
        },
        "menu-in-content": {
          "0%": {
            opacity: "0",
          },
          "60%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "menu-out-content": {
          "0%": {
            opacity: "1",
          },
          "20%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0",
          },
        },
        "menu-out": {
          "0%": {
            overflow: "hidden",
            maxHeight: "6rem",
            zIndex: "10",
          },
          "40%": {
            padding: "0.75rem",
            width: "0",
            maxHeight: "0",
            zIndex: "10",
          },
          "60%": {
            padding: "0.5rem",
            zIndex: "0",
          },
          "100%": {
            width: "0",
            "max-height": "0",
            padding: "0",
            overflow: "hidden",
            top: "3rem",
            zIndex: "0",
          },
        },
        "width-fit": {
          "0%": {
            maxWidth: "0",
            overflow: "hidden",
            padding: "0",
          },
          "100%": {
            maxWidth: "10rem",
            overflow: "hidden",
          },
        },
        "width-0": {
          "100%": {
            maxWidth: "0",
            overflow: "hidden",
            padding: "0",
          },
          "0%": {
            maxWidth: "10rem",
            overflow: "hidden",
          },
        },
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: "0.4",
          },
          "100%": {
            transform: "scale(4)",
            opacity: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aileron: ["Aileron", "sans-serif"],
      },
      backgroundImage: {
        artemis: "url('/images/artemis.jpg')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "menu-in": "menu-in 0.85s ease-in-out",
        "filter-in": "filter-in 0.85s ease-in-out",
        "filter-out": "filter-out 0.5s ease-in-out",
        "menu-in-content": "menu-in-content 0.85s ease-in-out",
        "menu-out": "menu-out 0.7s ease-in-out",
        "menu-out-content": "menu-out-content 0.85s ease-in-out",
        "width-fit": "width-fit 0.4s ease-in-out",
        "width-zero": "width-zero 0.35s ease-in-out",
        ripple: "ripple 600ms linear",
        bounce: "bounce 0.6s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(0)" },
        },

        "filter-in": {
          "0%": {
            opacity: "0",
            width: "0",
            "max-height": "0",
            padding: "0",
            overflow: "hidden",
            zindex: "0",
          },
          "40%": {
            opacity: "0.5",
            padding: "0.5rem",
            zindex: "0",
          },
          "50%": {
            padding: "0.75rem",
            width: "0",
            zindex: "0",
          },
          "60%": {
            opacity: "1",
            width: "width-fit",
            "max-height": "0",
          },
          "100%": {
            "max-height": "8rem",
            overflow: "hidden",
            zindex: "10",
          },
        },
        "filter-out": {
          "0%": {
            overflow: "hidden",
            "max-height": "8rem",
            zIndex: "10",
          },
          "40%": {
            padding: "0.75rem",
            width: "0",
            maxHeight: "0",
            zIndex: "10",
            opacity: "1",
          },
          "60%": {
            padding: "0.2rem",
            zIndex: "0",
          },
          "100%": {
            width: "0",
            "max-height": "0",
            padding: "0",
            overflow: "hidden",
            zIndex: "0",
            opacity: "0",
          },
        },
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
            width: "width-fit",
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
            "max-width": "0",
            "max-height": "40px",
            overflow: "hidden",
            padding: "0",
          },
          "100%": {
            maxWidth: "18rem",
            overflow: "hidden",
          },
        },
        "width-zero": {
          "100%": {
            "max-width": "0",
            "max-height": "40px",
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
        primary: {
          bg: "#021641",
          border: "#105dfb",
          fg: "#f0f6ff",
        },
        secondary: {
          fg: "#ecfdf5",
          bg: "#10b981",
        },
        text: {
          primary: "#0f1419",
          secondary: "#6b7585",
        },
        border: {
          DEFAULT: "#d9dde4",
        },
        surface: {
          elevated: "#ffffff",
          default: "#fafbfc",
        },
        neutral: {
          1: "#f9f9fa",
          2: "#f0f2f4",
          3: "#dcdfe5",
          4: "#b8bdc7",
          5: "#8f96a3",
          6: "#67707e",
          7: "#484f5b",
          8: "#303641",
          9: "#1f242d",
          10: "#101318",
        },
        blueRibbon: {
          1: "#f0f5ff",
          2: "#d7e4fe",
          3: "#a5c2fd",
          4: "#73a0fd",
          5: "#407efc",
          6: "#0e5cfb",
          7: "#0447d3",
          8: "#0336a1",
          9: "#02256e",
          10: "#01143c",
        },
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
};

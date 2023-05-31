/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'], // or 'media' or 'class' or false
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      backgroundColor: {
        theme: {
          main: "var(--color-bg-main)",
          sub: "var(--color-bg-sub)",
          accent: "var(--color-bg-accent)",
          light: "var(--color-bg-light)",
          card: {
            main: "var(--color-card-bg-main)",
          },
          scroll: "var(--color-bg-scroll)",
        },
      },
      textColor: {
        theme: {
          main: "var(--color-text-main)",
          accent: "var(--color-text-accent)",
          light: "var(--color-text-light)",
          error: "var(--color-error-main)",
          success: "var(--color-success-main)",
        },
      },
      padding: {
        leftSidebarFull: "var(--left-sidebar-full)",
        leftSidebarCompact: "var(--left-sidebar-compact)",
        leftSidebarMobile: "var(--left-sidebar-mobile)",
      },
      borderColor: {
        theme: {
          main: "var(--color-text-main)",
          error: "var(--color-error-main)",
          accent: "var(--color-bg-accent)",
          success: "var(--color-success-main)",
        },
      },
      gradientColorStops: {
        main: {
          from: "var(--color-gradient-main-from)",
          to: "var(--color-gradient-main-to)",
        },
        "bg-main": {
          from: "var(--color-gradient-bg-from)",
          to: "var(--color-gradient-bg-to)",
        },
      },
      animation: {
        toastIn: "toastIn .8s both",
        toastOut: "toastOut .8s both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        toastIn: {
          "0%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: 0.7,
          },
          "80%": { transform: "translate(0px) scale(0.7)", opacity: 0.7 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        toastOut: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "20%": { transform: "translate(0px) scale(0.7)", opacity: 0.7 },
          "100%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: 0.7,
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      zIndex: {
        overlay: "var(--overlay-z-index)",
        modal: "var(--overlay-z-index)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "headless" }),
    require("tailwindcss-animate"),
  ],
};

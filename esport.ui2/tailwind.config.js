function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'], // or 'media' or 'class' or false
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        theme: {
          main: "var(--color-bg-main)",
          sub: "var(--color-bg-sub)",
          accent: "var(--color-bg-accent)",
          light: "var(--color-bg-light)",
          card: {
            main: "var(--color-card-bg-main)",
          },
        },
      },
      textColor: {
        theme: {
          main: "var(--color-text-main)",
          accent: "var(--color-text-accent)",
          light: "var(--color-text-light)",
          error: "var(--color-error-main)",
        },
      },
      padding: {
        leftSidebarFull: "var(--left-sidebar-full)",
        leftSidebarCompact: "var(--left-sidebar-compact)",
      },
      borderColor: {
        theme: {
          main: "var(--color-text-main)",
          error: "var(--color-error-main)",
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
      },
      zIndex: {
        overlay: "var(--overlay-z-index)",
        modal: "var(--overlay-z-index)",
      },
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "headless" }),
  ],
};

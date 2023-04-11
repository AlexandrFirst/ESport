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
        },
      },
      textColor: {
        theme: {
          main: "var(--color-text-main)",
          accent: "var(--color-text-accent)",
          light: "var(--color-text-light)",
        },
      },
      padding: {
        leftSidebarFull: "var(--left-sidebar-full)",
        leftSidebarCompact: "var(--left-sidebar-compact)",
      },
      borderColor: {
        theme: {
          main: "var(--color-text-main)",
        },
      },
      gradientColorStops: {
        main: {
          from: "var(--color-gradient-main-from)",
          to: "var(--color-gradient-main-to)",
        },
      },
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "headless" }),
  ],
};

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
        },
      },
      textColor: {
        theme: {
          main: "var(--color-text-main)",
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
    },
  },
  plugins: [
    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "headless" }),
  ],
};

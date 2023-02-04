/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      // return `rgba(${(hexToRgb(hex), opacityValue)})`
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    // return `rgb(${hexToRgb(hex)})`
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", ":global(.dark)"], // or 'media' or 'class' or false
  theme: {
    extend: {
      textColor: {
        skin: {
          main: withOpacity("--color-text-main"),
          subsidiary: withOpacity("--color-text-subsidiary"),
          accent: withOpacity("--color-text-accent"),
          error: withOpacity("--color-error-main"),
          primary: withOpacity("--color-primary-main"),
          "primary-hover": withOpacity("--color-primary-main-hover"),
          secondary: withOpacity("--color-text-secondary"),
        },
        darkSkin: {
          main: withOpacity("--color-dark-text-main"),
          subsidiary: withOpacity("--color-dark-text-subsidiary"),
          accent: withOpacity("--color-dark-text-accent"),
          error: withOpacity("--color-dark-error-main"),
          primary: withOpacity("--color-dark-primary-main"),
          "primary-hover": withOpacity("--color-dark-primary-main-hover"),
          secondary: withOpacity("--color-dark-text-secondary"),
        },
      },
      backgroundColor: {
        skin: {
          main: withOpacity("--color-bg-main"),
          contrast: withOpacity("--color-bg-contrast"),
          subsidiary: withOpacity("--color-bg-subsidiary"),
          accent: withOpacity("--color-bg-accent"),

          primary: withOpacity("--color-primary-main"),
          "primary-hover": withOpacity("--color-primary-main-hover"),
        },
        darkSkin: {
          main: withOpacity("--color-dark-bg-main"),
          contrast: withOpacity("--color-dark-bg-contrast"),
          subsidiary: withOpacity("--color-dark-bg-subsidiary"),
          accent: withOpacity("--color-dark-bg-accent"),

          primary: withOpacity("--color-dark-primary-main"),
          "primary-hover": withOpacity("--color-dark-primary-main-hover"),
        },
      },
      gradientColorStops: {
        skin: {
          "main-from": withOpacity("--color-gradient-main-from"),
          "main-to": withOpacity("--color-gradient-main-to"),
        },
      },
      colors: {
        "text-main": withOpacity("--color-text-main"),
        "text-subsidiary": withOpacity("--color-text-subsidiary"),
        "bg-main": withOpacity("--color-bg-main"),
        "bg-contrast": withOpacity("--color-bg-contrast"),
        "bg-subsidiary": withOpacity("--color-bg-subsidiary"),
        error: withOpacity("--color-error-main"),

        primary: withOpacity("--color-primary-main"),
        "primary-hover": withOpacity("--color-primary-main-hover"),
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      backgroundImage: {
        "unloggedin-layout-1": "url('/public/unloggedin-backgound.jpg')",
        "unloggedin-layout-2": "url('/public/unloggedin-backgound-1.jpg')",
      },
      borderColor: {
        skin: {
          error: withOpacity("--color-dark-error-main"),
        },
        darkSkin: {
          error: withOpacity("--color-dark-error-main"),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

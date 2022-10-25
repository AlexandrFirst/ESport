/** @type {import('tailwindcss').Config} */

const hexToRgb = (hex) => {
  let strHex = hex;
  if (hex[0] === "#") {
    strHex = hex.substring(1, hex.length);
  }
  var aRgbHex = strHex.match(/.{1,2}/g);
  if (!aRgbHex) {
    return null;
  }
  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ].join(", ");
};

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

// module.exports = {
//   content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
// textColor: {
//   skin: {
//     base: withOpacity('--color-text-base'),
//     muted: withOpacity('--color-text-muted'),
//     inverted: withOpacity('--color-text-inverted'),
//   },
// },
// backgroundColor: {
//   skin: {
//     fill: withOpacity('--color-fill'),
//     'fill-contrast': withOpacity('--color-fill-contrast'),
//     'button-accent': withOpacity('--color-button-accent'),
//     'button-accent-hover': withOpacity('--color-button-accent-hover'),
//     'button-muted': withOpacity('--color-button-muted'),
//   },
// },
// gradientColorStops: {
//   skin: {
//     hue: withOpacity('--color-fill'),
//   },
// },
// colors: {
//   primary: '#28243d',
//   primaryctrs: '#2f2c45',
// },
// transitionDuration: {
//   DEFAULT: '300ms',
// },
//     },
//   },
//   plugins: [],
// }

// const theme = {
//   primary: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   secondary: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   error: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   warning: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   info: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   success: {
//     light: '#EAEDF6',
//     main: '#28243d',
//     dark: '#28245d',
//     accent: '#0f30ab',
//     'contrast-text': '#ffffff',
//   },
//   text: {
//     primary: '',
//     secondary: '',
//     disabled: '',
//   },
//   background: {
//     paper: '',
//     default: '',
//   },
// }

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class' or false
  theme: {
    extend: {
      textColor: {
        skin: {
          main: withOpacity("--color-text-main"),
          subsidiary: withOpacity("--color-text-subsidiary"),
          error: withOpacity("--color-error-main"),
          primary: withOpacity("--color-primary-main"),
          "primary-hover": withOpacity("--color-primary-main-hover"),
          // contrast: withOpacity(),
        },
      },
      backgroundColor: {
        skin: {
          main: withOpacity("--color-bg-main"),
          contrast: withOpacity("--color-bg-contrast"),
          subsidiary: withOpacity("--color-bg-subsidiary"),

          primary: withOpacity("--color-primary-main"),
          "primary-hover": withOpacity("--color-primary-main-hover"),
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

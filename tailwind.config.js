const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
    },
  },
  corePlugins: {
    textTransform: false,
    rotate: false,
    tableLayout: false,
    scale: false,
    skew: false,
    resize: false,
  },
  variants: {
    backgroundColor: ['responsive', 'default', 'focus', 'hover'],
    zIndex: ['responsive'],
    margin: ['responsive'],
    height: ['responsive'],
  },
};

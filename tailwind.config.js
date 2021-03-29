const { colors } = require('tailwindcss/defaultTheme');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
    },
  },
  extend: {
    lineClamp: {
      4: '4',
    },
  },
  plugins: [
    lineClamp,
  ],
  corePlugins: {
    textTransform: false,
    rotate: false,
    tableLayout: false,
    scale: false,
    skew: false,
    resize: false,
  },
  variants: {
    backgroundColor: ['responsive', 'DEFAULT', 'focus', 'hover'],
    zIndex: ['responsive'],
    margin: ['responsive'],
    height: ['responsive'],
  },
  purge: {
    content: ['**/*.ejs'],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [/text-/, /icon-/],
    }
  }
};

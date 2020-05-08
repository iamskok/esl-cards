import colors from './colors'
import fonts from './fonts'
import fontSizes from './fontSizes'
import fontWeights from './fontWeights'
import lineHeights from './lineHeights'
import space from './space'
import radii from './radii'
import sizes from './sizes'
import media from './media'
import borderWidth from './borderWidth'
import durations from './durations'
import timingFunctions from './timingFunctions'

const lightTheme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  radii,
  sizes,
  media,
  borderWidth,
  durations,
  timingFunctions,
}

const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors.modes.dark,
  },
}

export { lightTheme, darkTheme }

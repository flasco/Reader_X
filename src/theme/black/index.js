
import theme from '../default';
import { colors } from './variables';

export default {
  ...theme,
  variables: {
    ...theme.variables,
    colors: {
      ...theme.variables.colors,
      main: colors.main,
    }
  },

  // ==== nav style ====
  navContainer: {
    backgroundColor: colors.main,
  }
}

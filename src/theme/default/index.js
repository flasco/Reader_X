
import { colors } from './variables';
import nav from './nav.style';
import tip from './tip.style';

export default {
  barStyle: 'light-content',
  ...nav,
  page: {
    backgroundColor: colors.contrast,
  },
  ...tip,
};

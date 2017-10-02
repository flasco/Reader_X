
import variables from './variables';
import nav from './nav.style';
import tip from './tip.style';

export default {
  variables,
  barStyle: 'light-content',
  ...nav,
  page: {
    backgroundColor: variables.colors.contrast,
  },
  ...tip,
};

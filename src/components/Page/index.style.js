import { width, theme } from '../../theme';

export default {
  container: {
    ...theme.styles.page
  },
  loading: {
    image: {
      width: width / 2,
      resizeMode: 'contain',
    }
  }
}

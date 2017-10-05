
import { size, colors } from '../../theme';

export default {
  container: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
  },
  name: {
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
  },
  info: {
    fontSize: size.sm,
    color: colors.info,
    marginBottom: 5,
  },
  text: {
    marginRight: 35,
    fontSize: size.md,
    color: colors.text,
  },
}

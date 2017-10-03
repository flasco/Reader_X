
import { colors, size } from '../../theme'

export default {
  info: {
    container: {
      backgroundColor: '#000',
      flexDirection: 'row',
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15,
    },
    preview: {
      width: 95,
      height: 125,
    },
    text: {
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 30,
      },
      title: {
        fontSize: size.lg,
        color: colors.contrast,
      },
      author: {
        fontSize: size.md - 1,
        color: colors.contrast,
      },
      others: {
        fontSize: size.sm,
        color: colors.contrast,
      },
      rating: {
        backgroundColor: colors.transparent,
        marginRight: 10
      },
      inline: {
        flexDirection: 'row',
      },
      oneword: {
        container: {},
        text: {},
      },
    },
  }
}

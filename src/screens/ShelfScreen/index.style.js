import { theme, size, colors } from '../../theme';

export default {
  list: {
    container: {
      flex: 1,
    },
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E2E4',
    marginLeft: 13,
  },
  item: {
    container: {
      height: 94,
      alignItems: 'center',
      paddingLeft: 5,
      paddingTop: 13,
      paddingBottom: 13,
      borderBottomWidth: 0,
    },
    icon: {
      width: 52,
      height: 68,
    },
    title: {
      container: {
        paddingLeft: 10,
        paddingRight: 10,
        height: size.md + 2,
      },
      text: {
        margin: 0,
        padding: 0,
        fontSize: size.md + 2,
        color: colors.title,
      },
    },
    info: {
      container: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 66 - size.md
      },
      text: {
        container: {
          paddingTop: (66 - size.md) / 2 - size.md - 1,
        },
        text: {
          fontSize: size.md,
          color: colors.info,
        },
      },
    },
  },
  readMore: {
    container: {
      alignItems: 'center',
      marginTop: 14,
    },
    button: {
      wrapper: {
        height: 10,
      },
      button: {
        borderWidth: 1,
        borderColor: colors.main,
        backgroundColor: colors.contrast,
        height: 10,
        width: 86,
      },
      borderRadius: 22,
      color: colors.main,
      fontSize: size.sm,
      chevron: {
        marginLeft: 0,
        marginRight: -5,
      },
    },
  },
};


import { colors, size, weight } from '../../theme';

export default {
  page: {
    backgroundColor: '#eee',
  },
  parallax: {
    flex: 1,
    paddingTop: 60,
  },
  scrollview: {
    backgroundColor: '#eee',
  },
  listStyleItem: {
    container: {
      flexDirection: 'row',
      backgroundColor: colors.contrast,
      paddingLeft: 3,
      paddingRight: 3,
      height: 48,
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: '#E1E2E4',
    },
    label: {
      fontSize: size.md + 1,
      color: colors.text,
      lineHeight: 48,
      flex: 80,
    },
    value: {
      fontSize: size.md,
      color: colors.info,
      lineHeight: 48,
      flex: 260,
      textAlign: 'right',
    },
    chevron: {
      container: {
        flex: 35,
      },
      size: size.md,
      color: colors.info,
    },
  },
  info: {
    container: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15,
      height: 150,
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
  },
  statistics: {
    container: {
      backgroundColor: colors.contrast,
      flexDirection: 'row',
      height: 70,
    },
    item: {
      container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      data: {
        container: {
          flexDirection: 'row',
          alignItems: 'flex-end',
        },
        number: {
          fontSize: size.lg,
          color: 'black',
        },
        unit: {
          fontSize: size.sm - 1,
          color: 'black',
        },
      },
      label: {
        fontSize: size.sm,
        color: colors.info,
      },
    },
  },
  detail: {
    container: {
      marginTop: 15,
      backgroundColor: colors.contrast,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
    },
    description: {
      container: {
        flexDirection: 'column',
        paddingBottom: 20,
      },
      title: {
        fontSize: size.lg - 3,
        color: colors.text,
        lineHeight: 45,
      },
      text: {
        fontSize: size.md,
        color: colors.info,
        lineHeight: 25,
      },
    },
  },
  honor: {
    container: {
      marginTop: 15,
      backgroundColor: colors.contrast,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
    },
  },
  area: {
    container: {
      marginTop: 15,
      backgroundColor: colors.contrast,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
    },
    contentContainer: {
      flex: 1,
      marginBottom: 5,
      borderTopWidth: 1,
      borderColor: '#E1E2E4',
      paddingTop: 15,
    },
  },
  comment: {
    item: {
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
    },
  },
  author: {
    info: {
      container: {
        flexDirection: 'row',
      },
      photo: {
        width: 50,
        height: 50,
      },
      textContainer: {
        paddingLeft: 15,
        justifyContent: 'space-around',
      },
      name: {
        fontSize: size.lg - 1,
        color: colors.text,
      },
      info: {
        fontSize: size.md - 1,
        color: colors.info,
      },
    },
    books: {
      container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 15,
      },
      book: {
        container: {
          flexDirection: 'column',
          marginRight: 15,
        },
        preview: {
          width: 95,
          height: 125,
        },
        titleWrapper: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
        },
        title: {
          fontSize: size.md,
          color: colors.text,
          textAlign: 'center',
        },
        readers: {
          fontSize: size.md,
          color: colors.info,
          textAlign: 'center',
        },
      },
    },
  },
}

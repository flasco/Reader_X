
import { size, colors } from '../../theme';

const vars = {
  commons: {
    title: size.md + 2,
    text: size.md,
  },
  simple: {
    container: 94,
    preview: 68,
    previeww: 52,
  },
  complete: {
    container: 120,
    preview: 94,
    previeww: 72,
  },
};

export default {
  common: {
    list: {
      container: {
        flex: 1,
        marginTop: 0,
        borderTopWidth: 0,
      },
    },
    divider: {
      height: 1,
      backgroundColor: '#E1E2E4',
      marginLeft: 13,
    },
    item: {
      container: {
        alignItems: 'center',
        paddingLeft: 5,
        paddingTop: 13,
        paddingBottom: 13,
        borderBottomWidth: 0,
      },
      preview: {},
      title: {
        container: {
          paddingLeft: 10,
          paddingRight: 10,
          height: vars.commons.title,
        },
        text: {
          margin: 0,
          padding: 0,
          color: colors.title,
          fontSize: vars.commons.title,
        },
      },
      info: {
        container: {
          paddingLeft: 10,
          paddingRight: 10,
        },
        text: {
          container: {
          },
          text: {
            color: colors.info,
            fontSize: vars.commons.text,
          },
        },
      },
    },
  },
  simple: {
    item: {
      container: {
        height: vars.simple.container,
      },
      preview: {
        width: vars.simple.previeww,
        height: vars.simple.preview,
      },
      title: {
        container: {},
        text: {},
      },
      info: {
        container: {
          paddingLeft: 10,
          paddingRight: 10,
          height: vars.simple.preview - vars.commons.title
        },
        text: {
          container: {
            paddingTop: (vars.simple.preview - vars.commons.title) / 2 - vars.commons.text - 1,
          },
          text: {},
        },
      },
    },
  },
  complete: {
    item: {
      container: {
        height: vars.complete.container,
      },
      preview: {
        width: vars.complete.previeww,
        height: vars.complete.preview,
      },
      title: {
        container: {},
        text: {},
      },
      info: {
        container: {
          paddingLeft: 10,
          paddingRight: 10,
          height: vars.complete.preview - vars.commons.title
        },
        text: {
          container: {},
          text: {},
        },
        description: {
          container: {
            height: vars.complete.preview - vars.commons.title - vars.commons.text,
            justifyContent: 'center',
          },
        },
        authors: {
          container: {
            height: vars.commons.text,
            flexDirection: 'row',
          },
          author: {

          },
          tags: {},
        },
      },
    },
  },
}

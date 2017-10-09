
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
  divider: {
    height: 1,
    backgroundColor: '#E1E2E4',
    marginLeft: 13,
  },
  item: {
    container: {
      height: vars.complete.container,
      borderBottomWidth: 0,
    },
    preview: {
      width: vars.complete.previeww,
      height: vars.complete.preview,
    },
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
        height: vars.complete.preview - vars.commons.title
      },
      text: {
        container: {},
        text: {
          color: colors.info,
          fontSize: vars.commons.text,
        },
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
};

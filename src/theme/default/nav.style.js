
import { colors, size } from './variables';

const button = {
  color: colors.contrast,
  fontSize: size.ml,
}

export default {
  navContainer: {
    backgroundColor: colors.main,
  },
  navTitle: {
    color: '#fff',
    alignSelf: 'center'
  },
  navLeftContainer: {
    marginLeft: 10,
  },
  navRightContainer: {
    marginRight: 10,
    flexDirection: 'row',
  },
  navButtonContainer: {
    width: 40,
  },
  button,
}

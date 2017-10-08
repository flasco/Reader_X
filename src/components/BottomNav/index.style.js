import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  Fotter: {
    height: 50,
    paddingTop: 6,
    backgroundColor: '#000',
    zIndex: 2,
    width: width,
    position: 'absolute',
    opacity: 0.75,
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  
  FotterItems: {
    color: '#fff', textAlign: 'center', fontSize: 12,
  },

};
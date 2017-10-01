import {
  StackNavigator
} from 'react-navigation';

import BookListScreen from './BookListScreen';

const TopNavigator = StackNavigator({
  Home: {
    screen: BookListScreen
  },
}, {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default TopNavigator;
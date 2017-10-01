import {
  StackNavigator
} from 'react-navigation';

import ShelfScreen from './ShelfScreen';

const TopNavigator = StackNavigator({
  Home: {
    screen: ShelfScreen
  },
}, {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  });

export default TopNavigator;
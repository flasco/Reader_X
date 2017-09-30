import {
    StackNavigator
} from 'react-navigation';

import bookListScreen from './bookListScreen';



const TopNavigator = StackNavigator({
    Home: {
        screen: bookListScreen
    },
}, {
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false
    }
});

export default TopNavigator;
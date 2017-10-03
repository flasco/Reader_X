import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';

import ShelfScreen from './ShelfScreen';
import RecommandScreen from './RecommandScreen';
import RankingScreen from './RankingScreen';
import SettingScreen from './SettingScreen';

import BookScreen from './BookScreen';

import { theme } from '../theme';

const StackNavigatorWrapper = (key, Comp) => {
  const Wrapper = StackNavigator({
    [key]: {
      screen: Comp,
    }
  });
  return Wrapper;
}

const BookTabNavigator = TabNavigator({
  Shelf: {
    screen: ShelfScreen,
  },
  Recommand: {
    screen: RecommandScreen,
  },
  Ranking: {
    screen: RankingScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
}, {
  mode: 'screen',
  tabBarPosition: 'bottom',
});

const MainNavigator = StackNavigator({
  Home: {
    screen: BookTabNavigator,
  },
  Book: {
    screen: BookScreen,
  },
}, {
  mode: 'screen',
  navigationOptions: ({ navigation, screenProps }) => {
    if (navigation.state.index === 0) {
      return {
        headerStyle: theme.styles.navContainer,
        headerTitleStyle: theme.styles.navTitle,
      };
    }
    return {
      headerStyle: theme.styles.navContainer,
      headerTitleStyle: theme.styles.navTitle,
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={theme.styles.navButton.color}
          onPress={() => navigation.goBack()}
        />
      )
    }
  }
});

const TopNavigator = StackNavigator({
  Main: {
    screen: MainNavigator,
  },
}, {
  mode: 'modal',
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
  }
});

export default TopNavigator;
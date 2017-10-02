import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import React from 'react';
import { Text } from 'react-native';

import ShelfScreen from './ShelfScreen';
import RecommandScreen from './RecommandScreen';
import RankingScreen from './RankingScreen';
import SettingScreen from './SettingScreen';

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
  navigationOptions: {
    headerStyle: theme.styles.navContainer,
    headerTitleStyle: theme.styles.navTitle,
  }
});

const TopNavigator = StackNavigator({
  Home: {
    screen: BookTabNavigator,
  },
}, {
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false
  }
});

export default TopNavigator;
import React, { Component } from 'react';
import { Text } from 'react-native';

import { Icon } from 'react-native-elements';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let toEnd = true;
    return {
      title: '设置',
      tabBarLabel: '设置',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='lastfm'
          type='entypo'
          color={tintColor}
        />
      ),
    };
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (<Text>Setting</Text>);
  }
}

export default SettingScreen;

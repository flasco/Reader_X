import React, { Component } from 'react';
import { Text } from 'react-native';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let toEnd = true;
    return {
      title: '设置',
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

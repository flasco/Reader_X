import React, { PureComponent } from 'react';
import { TouchableOpacity, } from 'react-native';

import { Icon } from 'react-native-elements'

class IconTouch extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon
          name={this.props.iconName}
          type={this.props.iconType}
          color='#fff'
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    );
  }
}

export default IconTouch;
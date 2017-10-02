import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View } from 'react-native';
import { Col } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './index.style';

class EmptyView extends Component {
  static propTypes = {
    tip: PropTypes.string.isRequired,
    subTip: PropTypes.string,
    iconContainer: PropTypes.object.isRequired,
    icon: PropTypes.node,
    iconStyle: PropTypes.object.isRequired,
    footer: PropTypes.node.isRequired,
  }
  static defaultProps = {
    iconContainer: {},
    iconStyle: {},
    footer: false,
  }

  constructor(props) {
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
    this.renderSubTip = this.renderSubTip.bind(this);
  }

  renderIcon(icon) {
    if (!icon) {
      return false;
    }
    if (icon.name) {
      // icon from vector icons, now only support ionicons.
      return (
        <Icon
          name={icon.name}
          size={icon.size}
          color={icon.color}
        />
      )
    }
    if (icon.uri) {
      // icon from web
      return (
        <Image
          source={{ uri: icon.uri }}
        />
      )
    }
    // icon from require
    return (
      <Image
        style={this.props.iconStyle}
        source={icon}
      />
    )
  }

  renderSubTip(subTip) {
    if (subTip) {
      return <Text style={styles.subTip}>{subTip}</Text>
    }
    return false;
  }

  render() {
    const { icon, tip, subTip } = this.props;
    return (
      <Col style={styles.container}>
        <View style={this.props.iconContainer}>
          {this.renderIcon(icon)}
        </View>
        <Text style={styles.tip}>{tip}</Text>
        {this.renderSubTip(subTip)}
        {this.props.footer}
      </Col>
    )
  }
}

export default EmptyView;

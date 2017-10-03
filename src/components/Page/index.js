import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import EmptyView from '../EmptyView';

import styles from './index.style';

class Page extends Component {
  static propTypes = {
    containerStyle: PropTypes.object.isRequired,
    enableLoad: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,

    init: PropTypes.func.isRequired,
  }
  static defaultProps = {
    containerStyle: {},
    enableLoad: false,
    init: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,  // default loading show
    }
  }

  async componentDidMount() {
    this.props.init();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enableLoad && 'boolean' === typeof nextProps.loading && !nextProps.loading) {
      // while loaded
      this.setState({
        loading: nextProps.loading,
      });
    }
  }

  render() {
    if (this.props.enableLoad && this.state.loading) {
      // show loading page
      return (
        <EmptyView
          tip="loading..."
          // icon={require('../../assets/loading.gif')}
          iconStyle={styles.loading.image}
        />
      );
    }

    return (
      <View style={[styles.container, this.props.containerStyle, { flex: 1 }]}>
        {this.props.children}
      </View>
    );
  }
}

export default Page;

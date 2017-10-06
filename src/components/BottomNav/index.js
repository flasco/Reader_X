import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';

import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles from './index.style';
const { height, width } = Dimensions.get('window');

let tht;

class BottomNav extends Component {
  constructor(props) {
    super(props);

    tht = this;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={styles.Fotter}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
          this.props.screenProps.router.navigate(this.props.navigation, 'Book', {}, NavigationActions.navigate({ routeName: 'Catalog', params: {} }));
        }}>
          <Icon
            size={24}
            name='list'
            type='entypo'
            color={'#fff'} />
          <Text style={styles.FotterItems}>目录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {}}
        >
          <Icon
            size={24}
            name="moon" //light-up
            type='entypo'
            color={'#fff'} />
          <Text style={styles.FotterItems}>夜间</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { alert('coming soon...'); }}>
          <Icon
            size={24}
            name="cog"
            type='entypo'
            color={'#fff'} />
          <Text style={styles.FotterItems}>设置</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default BottomNav;
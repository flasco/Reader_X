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
          let item = {chapterList:this.props.chapterList,bookName:this.props.bookName};
          this.props.screenProps.router.navigate(this.props.navigation, 'Book', {}, NavigationActions.navigate({ routeName: 'Catalog', params: item }));
        }}>
          <Icon
            size={24}
            name='format-list-bulleted'
            type='MaterialIcons'
            color={'#fff'} />
          <Text style={styles.FotterItems}>目录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {}}
        >
          <Icon
            size={24}
            name="brightness-low" //brightness-high 日间模式
            type='MaterialIcons'
            color={'#fff'} />
          <Text style={styles.FotterItems}>夜间</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { alert('coming soon...'); }}>
          <Icon
            size={24}
            name="settings"
            type='MaterialIcons'
            color={'#fff'} />
          <Text style={styles.FotterItems}>设置</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default BottomNav;
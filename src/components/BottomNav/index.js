import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';

import { Icon } from 'react-native-elements';

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
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {  }}>
          <Icon
            size={25}
            name='list'
            type='entypo'
            color={'#fff'} />
          <Text style={styles.FotterItems}>目录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={()=>{  }}>
          <Icon
            size={25}
            name="moon" //light-up
            type='entypo'
            color={'#fff'} />
          <Text style={styles.FotterItems}>夜间</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { alert('coming soon...'); }}>
          <Icon
            size={25}
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
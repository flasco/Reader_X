import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, InteractionManager, TouchableWithoutFeedback } from 'react-native';

import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles, { containerColors } from './index.style';
const { height, width } = Dimensions.get('window');

let tht;

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSetting: false,
    }
    tht = this;

    this.settingShow = this.settingShow.bind(this);
  }

  settingShow() {
    const flag = this.state.isSetting;
    this.setState({ isSetting: !flag });
  }

  render() {
    return (
      <View>
        {this.state.isSetting && <View style={styles.Setting}>
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(1) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.zhuishuGreen }]} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(2) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.qidianPink }]} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(3) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.qidianRockYellow }]} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(4) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.qidianwhite }]} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(5) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.qidianX }]} />
          </TouchableWithoutFeedback >
          <TouchableWithoutFeedback onPress={() => { this.props.changeBackGround(6) }}>
            <View style={[styles.roundx, { backgroundColor: containerColors.qidianY }]} />
          </TouchableWithoutFeedback >
        </View>}
        <View style={styles.Fotter}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => {
            let item = {
              chapterList: this.props.chapterList,
              bookName: this.props.bookName,
              bookNum: this.props.recordNum,
              callback: (chapterId, index) => {
                // console.log(`${chapterId}   ${index} `);
                this.props.getContent(chapterId, index);
              }
            };
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
            onPress={() => { this.props.modeChange(); }}
          >
            <Icon
              size={24}
              name="brightness-low" //brightness-high 日间模式
              type='MaterialIcons'
              color={'#fff'} />
            <Text style={styles.FotterItems}>夜间</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.settingShow() }}>
            <Icon
              size={24}
              name="settings"
              type='MaterialIcons'
              color={'#fff'} />
            <Text style={styles.FotterItems}>设置</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}


export default BottomNav;
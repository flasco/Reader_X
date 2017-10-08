import React, { Component,PureComponent } from 'react';
import {  Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Button,Divider,ListItem,List } from 'react-native-elements';

import styles from './index.style';
import { theme } from '../../theme';

import RefreshFlatList from '../../components/RefreshFlatList'; 
import { chapterList } from '../../services/book';

class OrginChangeScreen extends PureComponent {  
    static navigationOptions = ({ navigation, screenProps }) => {
      return {
        title: '选择书源',
        tabBarVisible: false,
      };
    }
    constructor(props) {
      super(props);
      
      this.state = {
        bookList:[],
        fetchFlag:0,
      };
    }

    componentDidMount(){
      // console.log(this.props.navigation.state.params.chapterList);
      let data = this.props.navigation.state.params;
    }

    async fetchContent(bookId, direct) {
      const { err, data } = await chapterList(bookId);
      console.log(data);
      for(let i = 0,j = data.length;i<j;i++){
        data[i].isDownload = i % 2 ;//测试句
      }
      
      this.setState({
        bookList:data,
      });

    }

    renderSeparator() {
      return (
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
        </View>
      );
    }

    renderRow(item) {
      return(
        <View></View>
      );
    }

    render() {
      return (
        <View>

        </View>
      );
    }
}



export default OrginChangeScreen;
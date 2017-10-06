import React, { Component,PureComponent } from 'react';
import {  Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Button,Divider } from 'react-native-elements';

import styles from './index.style';
import { theme } from '../../theme';

import RefreshFlatList from '../../components/RefreshFlatList'; 

let selected = 0,tht;


/**
 * 
 * swap-vert MaterialIcons
 * 
 * @class CatalogScreen
 * @extends {PureComponent}
 */
class CatalogScreen extends PureComponent {  
    static navigationOptions = ({ navigation, screenProps }) => {
      const callback = () => {
        alert('sort');
      };
      return {
        title: `${navigation.state.params.bookName}`,

        headerRight: (
          <View style={styles.navRightContainer}>
            <Button
              containerViewStyle={styles.wrapper}
              buttonStyle={styles.button}
              color={'#fff'}
              title='正序'
              fontSize={16}
              leftIcon={{ name: 'swap-vert', type:'MaterialIcons', color: '#fff', style: styles.chevron }}
              onPress={() => {
                screenProps.a();
              }}
            />
          </View>
        ),
        tabBarVisible: false,
      };
    }
    constructor(props) {
      super(props);
      tht = this;
      this._FlatList;
      this.state = {
        bookList:[
          {
            num:0,
            title:'入坑必看~',
            url:'http://www.qu.la/book/book/33301/1825139.html',
            isDownload:true,
          },{
            num:1,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:2,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:3,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:4,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:5,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:6,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:7,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:8,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:9,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:10,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:11,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:12,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:13,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          },{
            num:14,
            title: '楔子',
            url: 'http://www.qu.la/book/book/33301/1825140.html',
            isDownload:false,
          }
        ],
        fetchFlag:0,
      };

      this.renderSeparator = this.renderSeparator.bind(this);
      this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }

    renderSeparator() {
      return (
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
        </View>
      );
    }

    onHeaderRefresh() {
      return;
    }

    renderRow(item) {
      const itemColor = item.item.isDownload?styles.Catalogcolors.loadedChapterColor:styles.Catalogcolors.noLoadChapterColor;
      return(
        <View style={styles.itemContainerStyle}>
          <Text style={[styles.itemFontStyle,itemColor]}>{item.item.title}</Text>
        </View>
      );
    }

    render() {//this.refs._flat.refs.listRef.
      return (
        <View style={styles.SunnyModeContainer}>
          <RefreshFlatList
            style={{backgroundColor:'#eeeeee'}}
            ref={'_flat'}
            listRef={'_flatListx'}
            data = {this.state.bookList}
            renderItem={this.renderRow}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.num}
            refreshState={this.state.fetchFlag}
            onHeaderRefresh={this.onHeaderRefresh} />
          


        </View>
      );
    }
}

const Wrapper = StackNavigator({
  cat: {
    screen: (props) => {
      return <CatalogScreen {...this.props} screenProps={{
        ...this.props.screenProps,
        sort: () => {
          alert('sort');
        }
      }} />;
    },
  },
});


export default Wrapper;
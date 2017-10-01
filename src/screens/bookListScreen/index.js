import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import Toast from '../../components/react-native-easy-toast';

import RefreshListView, { RefreshState } from '../../components/RefreshFlatList';
import getNet from '../../utils/getNet';
import BookItem from '../../components/bookItemComp';
import IconTouch from '../../components/IconTouch';

import styles from './index.style';

var RefreshCount = 0;

class BookList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '古意流苏',
      headerBackTitle: ' ',
      headerStyle: styles.theme.RedTheme,
      headerRight: (
        <View style={styles.test.nav}>
          <IconTouch
            iconName='magnifying-glass'
            iconType='entypo'
            onPress={() => { }}
          />
          <IconTouch
            iconName='dots-three-horizontal'
            iconType='entypo'
            onPress={() => { }}
          />
        </View>
      ),
      headerTitleStyle: {
        color: '#fff',
        alignSelf: 'center'
      }
    };
  };
  constructor(props) {
    super(props);
    let mockList = [{
      bookName: '飞剑问道',
      author: '我吃西红柿',
      url: 'http://www.xs.la/34_34495/',
      recordChapter: 'http://www.xs.la/3434495/2266828.html',
      latestChapter: '待检测',
      recordPage: 1,
      plantformId: 5,
    }, {
      bookName: '元尊',
      author: '天蚕土豆',
      url: 'http://www.xs.la/58_58435/',
      recordChapter: 'http://www.xs.la/58_58435/3485348.html',
      latestChapter: '待检测',
      recordPage: 1,
      plantformId: 5,
    }]

    this.renderRow = this.renderRow.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    this.state = {
      booklist: mockList,
      loadingFlag: true,
      fetchFlag: false,
    }
  }

  onHeaderRefresh() {
    this.setState({ fetchFlag: RefreshState.HeaderRefreshing })
    let listlength = this.state.booklist.length;
    getNet.refreshChapter(this.state.booklist, (Mes) => {
      if (Mes !== 0) {
        this.refs.toast.show(Mes);
      }
      RefreshCount++;
      if (RefreshCount != listlength) return;
      this.setState({
        booklist: this.state.booklist,
        fetchFlag: RefreshState.Idle,
      }, () => {
        RefreshCount = 0;
      });
    });
  }

  keyExtractor(item, index) {
    return item.url;
  }

  renderRow(item) {
    const rowData = item.item;
    return (
      <BookItem
        onPress={() => { }}
        imgSrc={require('../../assets/testPic.jpeg')}
        bookName={rowData.bookName}
        author={rowData.author}
        latestChapter={rowData.latestChapter} />
    );
  }

  renderSeparator() {
    return (<View style={styles.test.solid} />);
  }

  renderFooter() {
    return (
      <View style={{ width: 170, alignItems: 'center', }}>
        <Button
          containerViewStyle={{ height: 10 }}
          backgroundColor='#F9F9F9'
          borderRadius={22}
          buttonStyle={{ borderWidth: 1, borderColor: 'red' }}
          color='red'
          title='浏览记录 >'
          /* iconComponent={<Icon
                  name='chevron-right'
                  />} */
          iconLeft={{
            name: 'chevron-right',
            color: 'red'
          }}
        />
      </View>


    );
  }

  render() {
    return (// toast 的bot 是为了针对 使用了导航之后导致window的高度变小而导致的位置变化
      <View style={styles.test.container}>
        <Toast
          ref="toast"
          position='center'
          bot={30} />
        <StatusBar barStyle="light-content"></StatusBar>
        <RefreshListView
          style={{ flex: 1 }}
          data={this.state.booklist}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeparator}
          getItemLayout={(data, index) => ({ length: 90, offset: 91 * index, index })}//行高38，分割线1，所以offset=39
          keyExtractor={this.keyExtractor}
          refreshState={this.state.fetchFlag}
          onHeaderRefresh={this.onHeaderRefresh}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

export default BookList;
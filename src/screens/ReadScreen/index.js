import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, ActionSheetIOS, AsyncStorage, LayoutAnimation } from 'react-native';

import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';

import { content, chapterList } from '../../services/book';

import styles from './index.style';

const width = styles.width;
const height = styles.height;

let tht, bookLstTag, bookMapTag, bookInfoTag;

class ReadItem extends Component {
  constructor(props) {
    super(props);
    this.date = dateFormat(new Date(), 'H:MM');
  }
  render() {
    return (
      <View style={[styles.SunnyModeContainer, styles.bookCont]}>
        <Text style={[styles.title, styles.SunnyMode.Title]}>{this.props.title}</Text>
        <Text style={[styles.textsize, styles.SunnyMode.Text]} numberOfLines={21}>{this.props.data}</Text>
        <View style={styles.bottView}>
          <Text style={styles.bottom1}>{this.date}</Text>
          <Text style={styles.bottom2} >{this.props.page}/{this.props.totalPage} </Text>
        </View>
      </View>
    );
  }
}

class ReadScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let showHeader = navigation.state.params.showHeader ? {} : { header: null };
    return {
      title: '',
      headerStyle: {
        position: 'absolute',
        backgroundColor: '#000',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
        opacity: 0.75
      },
      ...showHeader,
      headerRight: (
        <View style={styles.navRightContainer}>
          <Icon
            containerStyle={styles.navButtonContainer}
            name='arrow-downward'
            type='MaterialIcons'
            color={styles.navButton.color}
            underlayColor={styles.navButton.underlayColor}
            onPress={() => { tht.downChoose(); }}
          />
          <Icon
            containerStyle={styles.navButtonContainer}
            name='bubble-chart'//
            type='MaterialIcons'
            color={styles.navButton.color}
            underlayColor={styles.navButton.underlayColor}
            onPress={() => { }}
          />
          <Icon
            containerStyle={styles.navButtonContainer}
            name='more-horiz'//bubble-chart
            type='MaterialIcons'
            color={styles.navButton.color}
            underlayColor={styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarVisible: false,
    };
  }
  constructor(props) {
    super(props);

    this.currentBook = props.navigation.state.params;
    this.totalPage = 1;
    this.chapterList;
    this.chapterContentMap;

    bookMapTag = `@Reader_X:${this.currentBook.BookId}_${this.currentBook.source || 'bqg'}_Map`;
    bookLstTag = `@Reader_X:${this.currentBook.BookId}_${this.currentBook.source || 'bqg'}_Lst`;
    bookInfoTag = `@Reader_X:${this.currentBook.BookId}__${this.currentBook.source || 'bqg'}_Info`;

    this.bookInfo;

    this.state = {
      currentNum: 1, //props.navigation.state.params.bookNum,
      loadFlag: true, //判断是出于加载状态还是显示状态
      currentItem: '', //作为章节内容的主要获取来源。
      isVisible: false, //判断导航栏是否应该隐藏
      goFlag: 0, //判断是前往上一章（-1）还是下一章（1）
    };

    tht = this;

    this.renderPage = this.renderPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.clickBoard = this.clickBoard.bind(this);
    this.downChoose = this.downChoose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.getMapAndLst = this.getMapAndLst.bind(this);

    this.getMapAndLst();

  }

  async getMapAndLst() {
    try {
      const [x, y, z] = await AsyncStorage.multiGet([bookMapTag, bookLstTag, bookInfoTag]);
      this.chapterContentMap = x[1] ? JSON.parse(x[1]) : new Map();
      this.chapterList = y[1] ? JSON.parse(y[1]) : [];
      this.bookInfo = z[1] ? JSON.parse(z[1]) : { recordNum: 0, recordPage: 0 };
      this.chapterList.length === 0 && await this.fetchChapterList(this.currentBook.BookId);
      this.chapterList.length !== 0 && await this.fetchContent(this.chapterList[this.bookInfo.recordNum].chapterId, 0);
    } catch (err) {
      // console.log(err);
    }
  }

  renderPage(data, pageID) {
    const title = this.chapterList[this.bookInfo.recordNum].title;
    return (
      <ReadItem
        data={data}
        title={title}
        totalPage={this.totalPage}
        page={Number(pageID) + 1} />
    );
  }

  async fetchContent(chapterId, direct) {
    let data = this.chapterContentMap[chapterId];
    if (!data) {
      data = (await content(this.currentBook.BookId, chapterId)).data.content;
      this.chapterContentMap[chapterId] = data;
      AsyncStorage.setItem(bookMapTag, JSON.stringify(this.chapterContentMap));
    }

    let arr = getContextArr(data, width, height, 23);//23 是字体大小
    this.totalPage = arr.length;
    this.setState({
      currentItem: arr,
      goFlag: direct,
      loadFlag: false,
    });
  }

  getContent(chapterId, index) {
    this.bookInfo.recordNum = index;
    this.setState({
      loadFlag: true,
    }, () => {
      this.fetchContent(chapterId, 1);
    });
  }

  async fetchChapterList(bookId) {
    if (!this.chapterList.length) {
      const { data, err } = await chapterList(bookId);
      this.chapterList = data;
      try {
        await AsyncStorage.setItem(bookLstTag, JSON.stringify(this.chapterList));
      } catch (err) { }
    }
  }

  downChoose() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['缓存50章', '缓存150章', 'Cancel',],
      cancelButtonIndex: 2,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: {//50章
            // this.download_Chapter(50);
            break;
          }
          case 1: {//150章
            // this.download_Chapter(150);
            break;
          }
        }
      });
  }

  getNextPage() {
    if (this.bookInfo.recordNum >= this.chapterList.length - 1) {
      this.refs.toast.show('到最后一页了...');
      return;
    }
    const chapterId = this.chapterList[++this.bookInfo.recordNum].chapterId;
    this.setState({ loadFlag: true }, () => {
      this.fetchContent(chapterId, 1);
    });
  }

  getPrevPage() {
    if (this.bookInfo.recordNum <= 0) {
      this.refs.toast.show('到第一页了...');
      return;
    }
    const chapterId = this.chapterList[--this.bookInfo.recordNum].chapterId;
    this.setState({ loadFlag: true }, () => {
      this.fetchContent(chapterId, -1);
    });
  }

  async getCurrentPage(pag) {
    pag = pag === 0 ? 1 : pag;
    this.bookInfo.recordPage = pag;
    await AsyncStorage.setItem(bookInfoTag, JSON.stringify(this.bookInfo));
  }

  clickBoard() {
    const flag = this.state.isVisible;
    LayoutAnimation.configureNext({
      duration: 200, //持续时间
      create: { // 视图创建
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,// opacity
      },
      update: { // 视图更新
        type: LayoutAnimation.Types.linear,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,// opacity
      }
    });
    this.props.navigation.setParams({
      showHeader: !flag
    });
    this.setState({ isVisible: !flag });
  }


  render() {
    const ViewDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
    return (
      <View style={styles.SunnyModeContainer}>
        <StatusBar
          barStyle={'light-content'}
          hidden={!this.state.isVisible}
          animation={true} />
        {this.state.loadFlag ? (
          <Text style={styles.centr}>
            Loading...</Text>) :
          (<ViewPager
            dataSource={ViewDs.cloneWithPages(this.state.currentItem)}
            renderPage={this.renderPage}
            getNextPage={this.getNextPage}
            getPrevPage={this.getPrevPage}
            getCurrentPage={this.getCurrentPage}
            clickBoard={this.clickBoard}
            initialPage={this.bookInfo.recordPage - 1}
            locked={this.state.isVisible}
            Gpag={this.state.goFlag} />)}
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          chapterList={this.chapterList}
          recordNum={this.bookInfo.recordNum}
          bookName={this.currentBook.bookName}
          getContent={this.getContent} />}
      </View>
    );
  }
}


export default ReadScreen;
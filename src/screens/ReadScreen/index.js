import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, ActionSheetIOS, AsyncStorage, LayoutAnimation } from 'react-native';

import { Icon ,Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';
import { HeaderBackButton } from 'react-navigation';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';

import { content, chapterList } from '../../services/book';
import realm, { SortDescriptor } from '../../models';

import styles from './index.style';

const width = styles.width;
const height = styles.height;

let tht;

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
      headerLeft:(
        <HeaderBackButton
        title='返回'
        tintColor={'#fff'}
        onPress={() => {
          tht.refs.pager.clearcmp();
          screenProps.router.goBack(navigation);
        }}/>
      ),
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

    const bookId = props.navigation.state.params.BookId;
    this.currentBook  = realm.objects('Shelf').filtered(`BookId = ${bookId}`)[0];
    console.log(this.currentBook);
    this.totalPage = 1;
    this.chapterList;
    this.recordNum = 0;

    this.state = {
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


    this.getMapAndLst(bookId);

  }

  async getMapAndLst(bookId) {
    this.chapterList = realm.objects('Chapter').filtered(`BookId = ${bookId}`).sorted(['ChapterId']);
    if (this.chapterList && this.chapterList.length > 0) {
      for (let i = 0, j = this.chapterList.length; i < j; i++) { // 如果都不等，recordNum 默认等于0，从头开始。
        if (this.chapterList[i].Title === this.currentBook.LastChapter) {
          this.recordNum = i;
          break;
        }
      }
    } else {
      const { data, err } = await chapterList(bookId);
      // console.log(data);
      realm.write(() => {
        data.map(item => {
          // console.log(item);
          realm.create('Chapter', {
            BookId: bookId,
            ChapterId:+item.chapterId,
            Title:item.title,
          });
        });
      });
      this.chapterList = realm.objects('Chapter').filtered(`BookId = ${bookId}`).sorted(['ChapterId']);
      
    }
    // console.log(chapterList);

    await this.fetchContent(this.chapterList[this.recordNum].ChapterId, 0);


    // const [x, y, z] = await AsyncStorage.multiGet([bookMapTag, bookLstTag, bookRecordTag]);
    // this.chapterContentMap = x[1] ? JSON.parse(x[1]) : new Map();
    // this.chapterList = y[1] ? JSON.parse(y[1]) : [];
    // this.bookRecord = z[1] ? JSON.parse(z[1]) : { recordNum: 0, recordPage: 1 };
    // this.chapterList.length === 0 && await this.fetchChapterList(this.currentBook.BookId);
    // this.chapterList.length !== 0 && await this.fetchContent(this.chapterList[this.bookRecord.recordNum].chapterId, 0);

  }

  renderPage(data, pageID) {
    const title = this.chapterList[this.recordNum].Title;
    return (
      <ReadItem
        data={data}
        title={title}
        totalPage={this.totalPage}
        page={Number(pageID) + 1} />
    );
  }

  async fetchContent(chapterId, direct) {
    let data = this.chapterList[this.recordNum].Content;

    if (!data || data.length<1) {
      data = (await content(this.currentBook.BookId, chapterId)).data.content;
      // console.log(this.chapterList[this.recordNum]);
      // realm.write(()=>{   //buG所在
      //   this.chapterList[this.recordNum].Content = data;
      // })
      // this.chapterList[this.recordNum].Content = data;
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
    this.recordNum = index;
    this.setState({
      loadFlag: true,
    }, () => {
      this.fetchContent(chapterId, 1);
    });
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
    if (this.recordNum >= this.chapterList.length - 1) {
      this.refs.toast.show('到最后一页了...');
      return;
    }
    const chapterId = this.chapterList[++this.recordNum].ChapterId;
    this.setState({ loadFlag: true }, () => {
      this.fetchContent(chapterId, 1);
    });
  }

  getPrevPage() {
    if (this.recordNum <= 0) {
      this.refs.toast.show('到第一页了...');
      return;
    }
    const chapterId = this.chapterList[--this.recordNum].ChapterId;
    this.setState({ loadFlag: true }, () => {
      this.fetchContent(chapterId, -1);
    });
  }

  async getCurrentPage(pag) {
    pag = pag === 0 ? 1 : pag;
    realm.write(()=>{
      this.currentBook.LastChapterReadPage = pag;
    })
    // this.currentBook.setLastChapterReadPage(pag);
    // this.currentBook.recordPage = pag;
    // await AsyncStorage.setItem(bookRecordTag, JSON.stringify(this.bookRecord));
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
            ref={'pager'}
            dataSource={ViewDs.cloneWithPages(this.state.currentItem)}
            renderPage={this.renderPage}
            getNextPage={this.getNextPage}
            getPrevPage={this.getPrevPage}
            getCurrentPage={this.getCurrentPage}
            clickBoard={this.clickBoard}
            initialPage={this.currentBook.LastChapterReadPage - 1}
            locked={this.state.isVisible}
            bodyComponents = {this.bodyComponents}
            Gpag={this.state.goFlag} />)}
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          chapterList={this.chapterList}
          recordNum={this.recordNum}
          bookName={this.currentBook.BookName}
          getContent={this.getContent} />}
      </View>
    );
  }
}


export default ReadScreen;
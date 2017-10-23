import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, ActionSheetIOS, AsyncStorage, LayoutAnimation } from 'react-native';

import { Icon, Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';
import { HeaderBackButton } from 'react-navigation';
import async from 'async';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';

import { content, chapterList } from '../../services/book';
import realm, { SortDescriptor } from '../../models';
import { mergeDeep } from '../../utils/object';

import styles, { containerColors } from './index.style';

const width = styles.common.width;
const height = styles.common.height;

let tht;

let q = async.queue(function (num, callback) {
  loadX(num, () => {
    callback(null);
  })
}, 5);

q.drain = function () {
  tht.refs.toast.show(`Task finished process:${successTask}/${allTask}`);
  successTask = 0;
};

async function loadX(num, callback) {
  try {
    await tht.cacheLoad(num);
    successTask++;
  } catch (err) {

  } finally {
    callback()
  }
};

let allTask = 0, successTask = 0;



class ReadScreen extends PureComponent {
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
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            tht.refs.pager.clearcmp();
            screenProps.router.goBack(navigation);
          }} />
      ),
      headerRight: (
        <View style={styles.common.navRightContainer}>
          <Icon
            containerStyle={styles.common.navButtonContainer}
            name='arrow-downward'
            type='MaterialIcons'
            color={styles.common.navButton.color}
            underlayColor={styles.common.navButton.underlayColor}
            onPress={() => { tht.downChoose(); }}
          />
          <Icon
            containerStyle={styles.common.navButtonContainer}
            name='bubble-chart'//
            type='MaterialIcons'
            color={styles.common.navButton.color}
            underlayColor={styles.common.navButton.underlayColor}
            onPress={() => { tht.sourceChoose(); }}
          />
          <Icon
            containerStyle={styles.common.navButtonContainer}
            name='more-horiz'//bubble-chart
            type='MaterialIcons'
            color={styles.common.navButton.color}
            underlayColor={styles.common.navButton.underlayColor}
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
    this.currentBook = realm.objects('Shelf').filtered(`BookId = ${bookId}`)[0];
    this.totalPage = 1;
    this.chapterList;
    this.recordNum = 0;
    this.backgroundColor = containerColors.zhuishuGreen;
    this.isChange = 0;

    this.sourceselect = 'bqg';

    this.state = {
      loadFlag: true, //判断是出于加载状态还是显示状态
      currentItem: '', //作为章节内容的主要获取来源。
      isVisible: false, //判断导航栏是否应该隐藏
      goFlag: 0, //判断是前往上一章（-1）还是下一章（1）
      sunnyMode: true,
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
    this.modeChange = this.modeChange.bind(this);
    this.changeBackGround = this.changeBackGround.bind(this);
    this.cacheLoad = this.cacheLoad.bind(this);
    this.download_Chapter = this.download_Chapter.bind(this);
    this.sourceChoose = this.sourceChoose.bind(this);

    this.getMapAndLst(bookId);

  }

  get styles() {
    if (this.currentstyle) {
      if (0 !== this.isChange) {
        return this.currentstyle;
      }
      this.isChange = 0;
    }

    if (this.state.sunnyMode) {
      const container = {
        Container: {
          flex: 1,
          backgroundColor: this.backgroundColor,
        }
      };

      return (this.currentstyle = mergeDeep({}, styles.common, styles.sunnyMode, container));
    } else {
      return (this.currentstyle = mergeDeep({}, styles.common, styles.moonMode));
    }
  }

  //region

  async getMapAndLst(bookId) {
    const backgroundColor = await AsyncStorage.getItem('backgroundColor');
    this.sourceselect = await AsyncStorage.getItem('sourceselect');
    if(this.sourceselect === null) {
      this.sourceselect = 'bqg';
      await AsyncStorage.setItem('sourceselect',this.sourceselect);
    }
    if (backgroundColor !== null) {
      this.backgroundColor = backgroundColor;
    } else {
      AsyncStorage.setItem('backgroundColor', this.backgroundColor);
    }
    const Mode = await AsyncStorage.getItem('sunnyMode');
    if (Mode !== null) {
      this.setState({
        sunnyMode: JSON.parse(Mode)
      })
    }

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
      realm.write(() => {
        data.map(item => {
          realm.create('Chapter', {
            BookId: bookId,
            ChapterId: +item.chapterId,
            Title: item.title,
            Content: null,
          });
        });
      });
      this.chapterList = realm.objects('Chapter').filtered(`BookId = ${bookId}`).sorted(['ChapterId']);
    }

    await this.fetchContent(this.chapterList[this.recordNum].ChapterId, 0);
    this.cacheLoad(this.recordNum + 1);
  }

  async changeBackGround(index) {
    switch (index) {
      case 1:
        this.backgroundColor = containerColors.zhuishuGreen;
        break;
      case 2:
        this.backgroundColor = containerColors.qidianPink;
        break;
      case 3:
        this.backgroundColor = containerColors.qidianRockYellow;
        break;
      case 4:
        this.backgroundColor = containerColors.qidianwhite;
        break;
      case 5:
        this.backgroundColor = containerColors.qidianX;
        break;
      case 6:
        this.backgroundColor = containerColors.qidianY;
        break;
    }
    await AsyncStorage.setItem('backgroundColor', this.backgroundColor);
    this.forceUpdate();
  }

  async cacheLoad(num) {
    let data = this.chapterList[num].Content;
    if (!data || data.length < 1) {
      // this.refs.toast.show('开始预缓存');
      data = (await content(this.currentBook.BookId, this.chapterList[num].ChapterId)).data.content;
      realm.write(() => {
        this.chapterList[num].Content = data;
      });
    } else {
      // this.refs.toast.show(`下章[ ${num} ]已经有缓存了！`);
    }
  }

  async fetchContent(chapterId, direct) {
    let data = this.chapterList[this.recordNum].Content;

    if (!data || data.length < 1) {
      data = (await content(this.currentBook.BookId, chapterId,this.sourceselect)).data.content;
      realm.write(() => {
        this.chapterList[this.recordNum].Content = data;
        this.currentBook.LastChapter = this.chapterList[this.recordNum].Title;
      });

    }
    let arr = getContextArr(data, width, height, 23);//23 是字体大小
    this.totalPage = arr.length;

    requestAnimationFrame(() => {//修复与realm的冲突
      this.setState({
        currentItem: arr,
        goFlag: direct,
        loadFlag: false,
      });
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

  download_Chapter(num) {
    let length = this.chapterList.length;
    const wantNum = this.recordNum + num;
    let end = wantNum > length ? length : wantNum;
    allTask = end - this.recordNum - 1;
    for (let i = this.recordNum + 1; i < end; i++) {
      q.push(i);
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
            this.download_Chapter(50);
            break;
          }
          case 1: {//150章
            this.download_Chapter(150);
            break;
          }
        }
      });
  }



  sourceChoose() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['笔趣阁', '一百度', 'Cancel',],
      cancelButtonIndex: 2,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: {//50章
            this.sourceselect = 'bqg';
            break;
          }
          case 1: {//150章
            this.sourceselect = 'ybdu';
            break;
          }
        }
        AsyncStorage.setItem('sourceselect',this.sourceselect);
      });
  }

  getNextPage() {
    if (this.recordNum >= this.chapterList.length - 1) {
      this.refs.toast.show('到最后一页了...');
      return;
    }
    const chapterId = this.chapterList[++this.recordNum].ChapterId;

    this.cacheLoad(this.recordNum + 1);

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
    realm.write(() => {
      this.currentBook.LastChapterReadPage = pag;
    });
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

  modeChange() {
    const flag = this.state.sunnyMode;
    this.setState({
      sunnyMode: !flag,
    });
    AsyncStorage.setItem('sunnyMode', JSON.stringify(!flag));
  }
  //endregion

  renderPage(data, pageID) {
    const title = this.chapterList[this.recordNum].Title;
    const date = dateFormat(new Date(), 'H:MM');
    return (
      <View style={[this.styles.Container, this.styles.bookCont]}>
        <Text style={[this.styles.title, this.styles.TitleColor]}>{title}</Text>
        <Text style={[this.styles.textsize, this.styles.TextColor]} numberOfLines={21}>{data}</Text>
        <View style={this.styles.bottView}>
          <Text style={[this.styles.bottom1, this.styles.BottomColor]}>{date}</Text>
          <Text style={[this.styles.bottom2, this.styles.BottomColor]} >{Number(pageID) + 1}/{this.totalPage} </Text>
        </View>
      </View>
    );
  }

  render() {
    const ViewDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
    return (
      <View style={this.styles.Container}>
        <StatusBar
          barStyle={'light-content'}
          hidden={!this.state.isVisible}
          animation={true} />
        {this.state.loadFlag ? (
          <Text style={[this.styles.centr, this.styles.TextColor]}>
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
            bodyComponents={this.bodyComponents}
            Gpag={this.state.goFlag} />)}
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          chapterList={this.chapterList}
          recordNum={this.recordNum}
          changeBackGround={this.changeBackGround}
          modeChange={this.modeChange}
          bookName={this.currentBook.BookName}
          getContent={this.getContent} />}
      </View>
    );
  }
}


export default ReadScreen;
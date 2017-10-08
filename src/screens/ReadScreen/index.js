import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, InteractionManager, LayoutAnimation } from 'react-native';

import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';

import { content,chapterList } from '../../services/book';

import styles from './index.style';

const width = styles.width;
const height = styles.height;

class ReadItem extends PureComponent {
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
    const showHeader = navigation.state.params.showHeeader ? {} : { header: null };
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
            onPress={() => { }}
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
    this.totalPage = 1;
    this.currentBook = {};
    this.chapterList = [];
    this.state = {
      currentNum: 1, //props.navigation.state.params.bookNum,
      loadFlag: true, //判断是出于加载状态还是显示状态
      currentItem: '', //作为章节内容的主要获取来源。
      isVisible: false, //判断导航栏是否应该隐藏
      goFlag: 0, //判断是前往上一章（-1）还是下一章（1）
    };

    this.renderPage = this.renderPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.clickBoard = this.clickBoard.bind(this);
    this.getDataSource = this.getDataSource.bind(this);


    let book = this.props.navigation.state.params;

    this.currentBook = {
      bookName: book.bookName,
      bookId: book.bookId,
      recordNum:0, //这个是记录最后一次看书的章节，下面的是页数
      // recordPage: book.recordPage,
    };
    // console.log(this.currentBook);

    if(this.chapterList.length===0){
      console.log(this.currentBook.bookId);
      this.fetchChapterList(this.currentBook.bookId,()=>{
        console.log(this.chapterList);
        this.fetchContent(this.chapterList[ this.currentBook.recordNum ].chapterId,1);
      });

    }

    

    // setTimeout(()=>{
    //   let dat = '这里是一个测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的n测试第一页的带n测试第一页的带n测试第一页的带n测试第一页的带带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n测试第一页的带项目四下收到哦啊好速度好~\n';
    //   this.getDataSource(dat,()=>{
    //     this.setState({ 
    //       loadFlag:false 
    //     });
    //   });
    // },1000);
    
  }

  renderPage(data, pageID) {
    const title = this.chapterList[this.currentBook.recordNum].title;
    return (
      <ReadItem
        data={data}
        title={title}
        totalPage={this.totalPage}
        page={Number(pageID) + 1} />
    );
  }

  async fetchContent(chapterId, direct) {
    const { err, data } = await content(this.currentBook.bookId,chapterId);
    console.log(data);
    this.getDataSource(data.Data,()=>{
      this.setState({
        goFlag: direct,
        loadFlag: false,
      });
    });
  }

  async fetchChapterList(bookId,callback){
    const { err, data } = await chapterList(bookId);
    for(let i = 0,j = data.length;i<j;i++){
      data[i].isDownload = false ;//测试句
    }
    this.chapterList = data;
    callback();
  }

  getNextPage() {
    if(this.currentBook.recordNum >= this.chapterList.length - 1 ){
      console.log('到最后一页了...');
      return;
    }
    let chapterId = this.chapterList[ ++this.currentBook.recordNum ].chapterId;
    this.setState({ loadFlag: true },()=>{
      this.fetchContent( chapterId , 1);
    });
  }
  
  getPrevPage() {
    if(this.currentBook.recordNum <= 0 ) {
      console.log('到第一页了了...');
      return;
    }
    let chapterId = this.chapterList[ --this.currentBook.recordNum ].chapterId;
    this.setState({ loadFlag: true },()=>{
      this.fetchContent( chapterId , -1);
    });
  }

  getCurrentPage(pag) {
    pag = pag === 0 ? 1 : pag;
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
      showHeeader: !flag
    });
    this.setState({ isVisible: !flag });
  }

  getDataSource(currentContent,callback) {
    let arr = getContextArr(currentContent, width, height, 23);
    this.totalPage = arr.length;
    this.setState({
      currentItem:arr,
    },callback);
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
            initialPage={0}
            locked={this.state.isVisible}
            Gpag={this.state.goFlag} />)}
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav 
          screenProps={this.props.screenProps} 
          navigation={this.props.navigation}
          chapterList={this.chapterList}
          bookName={this.currentBook.bookName} />}
      </View>
    );
  }
}


export default ReadScreen;
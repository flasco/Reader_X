import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, InteractionManager, LayoutAnimation } from 'react-native';

import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';

import { content } from '../../services/book';


let tht, bookPlant, booklist;

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
            name='download'
            type='entypo'
            color={styles.navButton.color}
            underlayColor={styles.navButton.underlayColor}
            onPress={() => { }}
          />
          <Icon
            containerStyle={styles.navButtonContainer}
            name='dots-three-horizontal'
            type='entypo'
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
    tht = this;
    this.totalPage = 1;
    this.state = {
      currentBook: '',
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

    setTimeout(()=>{
      this.setState({ loadFlag:false });
    },1000);
  }

  renderPage(data, pageID) {
    // console.log(data);
    return (
      <ReadItem
        data={data}
        title={'this.state.currentItem.title'}
        totalPage={this.totalPage}
        page={Number(pageID) + 1} />
    );
  }

  async fetchContent(nurl, direct) {
    const { err, data } = await content(123,457,nurl);
    console.log(data);
    this.setState({
      currentItem: data,
      goFlag: direct,
      loadFlag: false,
    });
  }

  getNextPage() {
    this.setState({ loadFlag: true },()=>{
      this.fetchContent('ss', 1);
    });
    
  }
  
  getPrevPage() {
    this.setState({ loadFlag: true },()=>{
      this.fetchContent('aa', -1);
    });
    
  }

  getCurrentPage(pag) {
    pag = pag === 0 ? 1 : pag;
  }

  clickBoard() {
    // console.log('sadasd');
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

  getDataSource() {
    let arr = getContextArr(this.state.currentItem.Data, width, height, 23);
    this.totalPage = arr.length;
    // console.log(arr);
    return arr;
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
            dataSource={ViewDs.cloneWithPages(this.getDataSource())}
            renderPage={this.renderPage}
            getNextPage={this.getNextPage}
            getPrevPage={this.getPrevPage}
            getCurrentPage={this.getCurrentPage}
            clickBoard={this.clickBoard}
            initialPage={1}
            locked={this.state.isVisible}
            Gpag={this.state.goFlag} />)}
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav screenProps={this.props.screenProps} navigation={this.props.navigation} />}
      </View>
    );
  }//this.props.screenProps.router.navigate(this.props.navigation, 'Book', item, NavigationActions.navigate({ routeName: 'Read', params: item }));
}


export default ReadScreen;
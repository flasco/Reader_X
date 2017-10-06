import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, InteractionManager, LayoutAnimation } from 'react-native';

import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import dateFormat from 'dateformat';

import ViewPager from '../../components/ViewPager';
import getContextArr from '../../utils/getContextArr';
import BottomNav from '../../components/BottomNav';


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

  }

  renderPage(data, pageID) {
    console.log(data);
    return (
      <ReadItem
        data={data}
        title={this.state.currentItem.title}
        totalPage={this.totalPage}
        page={Number(pageID) + 1} />
    );
  }

  fetchContent(nurl, direct) {
    this.setState({
      currentItem: {
        title: `章节测试 ${nurl}`,
        content: '裘元坐在季文君的床上耍无赖，“都说‘军令如山律如铁’，大将军叫我跟着你，我就得跟着你。”\n从裘元的嘴里听见“军令如山”这句话，季文君也是颇为惊讶。等她换上了一身素衣披头散发的从屏风后走了出来，裘元也从床上爬了起来。\n“这位英雄，你就留下我吧，我什么都能做的。”裘元抓着季文君的肩膀道：“你要是不留我，我恐怕就得被大将军给遣送回京了。英雄，你就当是可怜可怜我，把我留下吧！”\n裘元死命的摇晃着季文君，没一会儿，季文君的额头上就布满了冷汗。\n“松手！”季文君咬着牙推开了裘元。',
        prev: 'ssss',
        next: 'ssx',
        goFlag: direct,
      }
    });
  }

  getNextPage() {
    this.fetchContent('ss', 1);
  }
  
  getPrevPage() {
    this.fetchContent('aa', -1);
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

  getDataSource() {
    let arr = getContextArr(this.state.currentItem.content, width, height, 23);
    this.totalPage = arr.length;
    console.log(arr);
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
        <ViewPager
          dataSource={ViewDs.cloneWithPages(this.getDataSource())}
          renderPage={this.renderPage}
          getNextPage={this.getNextPage}
          getPrevPage={this.getPrevPage}
          getCurrentPage={this.getCurrentPage}
          clickBoard={this.clickBoard}
          initialPage={1}
          Gpag={this.state.goFlag} />
        <Toast ref="toast" />
        {this.state.isVisible && <BottomNav screenProps={this.props.screenProps} navigation={this.props.navigation} />}
      </View>
    );
  }//this.props.screenProps.router.navigate(this.props.navigation, 'Book', item, NavigationActions.navigate({ routeName: 'Read', params: item }));
}


export default ReadScreen;
import React, { Component } from 'react';
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

class ReadScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      const showHeader = navigation.state.params.showHeeader ? {} : { header: null };
      return {
        title: '',
        headerStyle: {
          position: 'absolute',
          backgroundColor:'#000',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth: 0,
          opacity:0.75
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
        currentItem:'', //作为章节内容的主要获取来源。
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

    

    renderPage(data, pageID){
      return(
        <View style={[styles.SunnyModeContainer,styles.bookCont]}>
          <Text style={[styles.title,styles.SunnyMode.Title]}>{'不管他'}</Text>
          <Text style={[styles.textsize,styles.SunnyMode.Text]} numberOfLines={21}>{data}</Text>
          <View style={styles.bottView}>
            <Text style={styles.bottom1}>{dateFormat(new Date(), 'H:MM')}</Text>
            <Text style={styles.bottom2} >{Number(pageID)+1}/{this.totalPage} </Text>
          </View>
        </View>
      );
    }

    fetchContent(nurl, direct){

    }
    getNextPage(){
      this.setState({
        currentItem:{
          content:'\nＰＳ每周超过５００推荐票或１００人次打赏，小楼都会加更一章。'
        }
      });
    }
    getPrevPage(){
      this.setState({
        currentItem:{
          content:'\n\t\t\t\t\n裘元坐在季文君的床上耍无赖，“都说‘军令如山律如铁’，大将军叫我跟着你，我就得跟着你。”\n从裘元的嘴里听见“军令如山”这句话，季文君也是颇为惊讶。等她换上了一身素衣披头散发的从屏风后走了出来，裘元也从床上爬了起来。\n“这位英雄，你就留下我吧，我什么都能做的。”裘元抓着季文君的肩膀道：“你要是不留我，我恐怕就得被大将军给遣送回京了。英雄，你就当是可怜可怜我，把我留下吧！”\n裘元死命的摇晃着季文君，没一会儿，季文君的额头上就布满了冷汗。\n“松手！”季文君咬着牙推开了裘元。\n“你……”也是头一次被人这么对待的裘元冷了脸，“你这人怎么就这么不知好歹？”\n今日他都恨不得把这一辈的好话都说完了，这人怎么还能这么冷血的推开他？\n“好歹？”季文君捂着肩膀上的伤口冷笑:“裘元，这是战场，不是你的京城。”\n战场上的人只需要记住生和死，至于好歹……那又是什么东西？\n“你流血了？”看到季文君正在往外渗着血的肩膀，裘元才意识到原来自己刚才抓到了人家的伤口。“对不住，实在是对不住。我……我这就去给你叫军医来！”\n裘元说着就要往帐外跑，不过还没等他跑两步，他就被季文君伸脚给绊倒了。\n“不必。”季文君踢着他的脚踝道：“左右不过只是一些小伤，要是你真心想要帮忙，那就帮我把柜子里的伤药拿过来吧。”\n“好嘞！”裘元手脚麻利的从地上爬了起来。\n打发了他去拿药，季文君这才忍着疼又把肩膀上的衣裳给扒了下来。\n裘元拿着从柜子里翻出来的伤药，一回头就看见了季文君肩上那道已经入了骨的箭伤。\n“这还叫小伤？”\n都伤成了这个样子竟然还只说是小伤？难道这人是铁打的吗？\n裘元拿着药大叫，季文君也被他吵的头疼。\n“你闭嘴！”季文君冷眼瞥着裘元，不耐烦道：“要么把药留下滚出去，要么留在这里帮我上药。不然，我今日就叫苏和遣你回京！”\n听到季文君说要把自己遣回京去，裘元顿时就老实了。\n“我闭嘴，我闭嘴。”裘元捂着嘴巴含糊道：“只要不把我送回去，你叫我做什么都行！”\n季文君艰难的抬手，指着那处她根本触及不到的箭伤道：“那就先来帮我上药。”\n“好。”\n裘元带着药走到季文君的身边，虽然他没有伺候过人，但他至少还知道要在上药之前将伤口清洗一遍。\n“水呢？”裘元左看右看，直到他把帐中都翻了个底朝天，也没看见一滴水。\n“那里。”季文君转头给他指了指了那只正摆在桌上的水壶。\n一拿到水壶，裘元就迫不及待的拔开了木塞。可是等他闻到了那股辛辣的味道，他又差点把水壶给甩到了地上。\n“这是酒！”\n“没错，就是酒。”\n看着一脸认真的季文君，裘元忽然觉得这人恐怕是个疯子。\n用烈酒来处理伤口，这不是疯子又是什么？\n裘元还在走神，又听见季文君不悦道：“要帮就帮，不帮拉倒。这么磨磨唧唧的，你是个娘们吗？”\n“你才是个娘们！”被质疑的裘元直接将那壶烈酒全都倒在了季文君的肩上，等酒水将季文君肩上的污血都冲刷干净，裘元又愣了。“你还真是个娘们啊？”\n裘元大叫着，脚下也是往后退了数步。\n“谁是娘们了？”四处流淌的烈酒沾到了肩上的伤口，季文君也是疼的咬着牙直抽冷气。“本将这是天生的白！”\n“那你这未免也太白了吧？”\n“要你管！难道说比我肤白的男人你没见过？”\n裘元无言以对。\n比季文君肤白的男人他真是没有见过，不过比季文君肤白貌美的小倌他倒是见过不少。\n盯着季文君白皙的肩头，裘元忽然很想伸手去摸一摸。可看着那把还被季文君摆在身边的长剑，他觉得还是就这么想想算了吧。\n为了摸一个男人丢了小命？这怎么算都是划不来的！\n“还不快把药拿过来？”见他退的这么远，季文君也冷了脸。\n“哦。”裘元低着头又走了过来，等他把一整瓶的伤药都倒在了季文君的肩膀上，他的眼中忽然精光一闪。“英雄啊，要不要我帮你包扎？”\n“不用了。”\n无事献殷勤，非奸即盗。尤其是这种从京城来的贵公子，对她这么屈尊纡贵，又怎么会没有一点目的？\n季文君还拿着绷带给自己包着伤口，帐外却已经有人来报。\n“副将！”被临时拉来传话的那名将士站在帐外道：“将军刚才在大帐外昏过去了，元都统叫您过去一趟。”\n“知道了。”季文君皱着眉头对帐外人道：“你先去告诉元都统，就说本将一会儿就到。”\n“是。”\n那人隔着帐篷对季文君抱了抱拳，他离开没过多久，季文君也在裘元灼灼的目光下包扎好了伤口。\n“你是留下，还是要与我一起去大帐？”季文君穿着衣服冷声问。\n“我……”裘元踌躇了一会儿，最后还是拿定注意道：“我跟着你！”\n等季文君带着拖油瓶裘元走到了大帐，苏和也醒了过来。\n“将军这是怎么了？”季文君冷眼瞥着还躺在床上的苏和，可她嘴上问的却是一旁的元青。\n见她问元青不问自己，苏和当即便对元青瞪大了眼睛威胁道：“不许说！”\n被恐吓的元青苦笑了一声。\n苏和是大将军不假，可他的直属上司还是季文君。要是他今日因为这点小事得罪了季文君，那估计明日他就得重伤在战场上了。\n“元青？”\n被季文君指名点姓，元青下意识的就脱口说道：“将军三日不眠不休，刚才没熬住，睡过去了……”\n知道了原因，季文君忽然冷笑：“真没出息！”\n“听见没有？”勉强坐起身子的苏和也对这元青冷笑：“真没出息！”\n就这还是个都统呢！连一个女人都镇不住！丢人！\n苏和鄙夷着元青，完全忘了季文君说的就是他自己。\n“将军啊。”一直跟在季文君身后的裘元站到苏和的眼前，“英雄说的就是你呀！”\n“臭小子！”被裘元拆了台的苏和红了眼。\n裘元嘿嘿一笑，可元青却在看到他的那一刹白了脸。\n泰国最胸女主播全新激_情视频曝光扑倒男主好饥_渴!!请关注微信公众号在线看:meinvxuan1(长按三秒复制)!!\n\t\t\t\t\n\t\t\t\t'
        }
      });
    }

    getCurrentPage(pag){
      pag = pag === 0 ? 1 : pag;
    }

    clickBoard(){
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
        delete:{
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,// opacity
        }
      });
      this.props.navigation.setParams({
        showHeeader: !flag
      });
      this.setState({ isVisible: !flag });
    }

    getDataSource(){
      let arr = getContextArr(this.state.currentItem.content,width,height,23);
      this.totalPage = arr.length ;
      return arr;
    }

    render() {
      const ViewDs = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 });
      return (
        <View style={styles.SunnyModeContainer}>
          <StatusBar
            barStyle={styles.barStyle}
            hidden={!this.state.isVisible}
            animation={true}/>
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
          {this.state.isVisible&&<BottomNav/>}
        </View>
      );
    }
}


export default ReadScreen;
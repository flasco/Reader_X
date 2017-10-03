import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import { Icon, Button, Rating, Divider, Avatar } from 'react-native-elements';
import ParallaxView from 'react-native-parallax-view';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import Toast from '../../components/Toast';

import { theme } from '../../theme';
import styles from './index.style';

import { item } from '../../services/book';

/**
 * 
 * @param {*} number 
 * @param {*} fixed 
 * @param {*} type 0: round 1: floor 2: ceil
 */
function fixedRound(number, fixed, type = 0) {
  if (!fixed) {
    fixed = 0;
  }
  // 输入必须为数字
  if (typeof number !== 'number' || typeof fixed !== 'number')
    throw new Error('Parameters should be type of number!');
  // fixed 必须为整数
  if (fixed % 1 !== 0)
    throw new Error('Parameter `fixed` should be an integer!');

  if (fixed === 0) return Math.round(number);
  var t = Math.pow(10, fixed);
  switch (type) {
    case 0: return Math.round(number * t) / t;
    case 1: return Math.floor(number * t) / t;
    case 2: return Math.ceil(number * t) / t;
    default:
      throw new Error(`No type ${type}`);
  }

}

const formatNumber = (number, fixed = 0, unit = true, type = 0) => {
  if (number >= 10000) {
    return `${fixedRound(number / 10000, fixed, type)}${unit ? '万' : ''}`;
  }
  return number;
}

const subword = (str) => {
  if (str.length > 100) {
    return `${str.substring(0, 100)}...`;
  }
  return str;
}

class BookScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: `${navigation.state.params.title ? navigation.state.params.title : ''}`,
      headerStyle: {
        position: 'absolute',
        backgroundColor: theme.styles.variables.colors.transparent,
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
      },
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='share-alternative'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarVisible: false,
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      book: {},
    }

    this.onFetch = this.onFetch.bind(this);
    this.onScrollOverTitle = this.onScrollOverTitle.bind(this);
    this.renderListStyleItem = this.renderListStyleItem.bind(this);
    this.renderBookInfo = this.renderBookInfo.bind(this);
    this.renderBookStatistics = this.renderBookStatistics.bind(this);
    this.renderBookStatisticsItem = this.renderBookStatisticsItem.bind(this);
    this.renderBookDetail = this.renderBookDetail.bind(this);
    this.renderBookHonor = this.renderBookHonor.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.renderCommmentList = this.renderCommmentList.bind(this);
    this.renderBookComment = this.renderBookComment.bind(this);
    this.renderAuthorBooks = this.renderAuthorBooks.bind(this);
    this.renderAuthorInfo = this.renderAuthorInfo.bind(this);
  }

  componentDidMount() {
    this.onFetch();
  }

  async onFetch() {
    const { err, data } = await item(this.props.navigation.state.params.bookId);
    if (err) {
      return;
    }
    if (!data) {
      return;
    }

    this.setState({
      book: data,
    });
  }

  onScrollOverTitle(y) {
    if (!this.overed && y >= 35) {
      this.overed = true;
      this.props.navigation.setParams({
        title: this.state.book.BookName,
      });
    } else if (this.overed && y < 35) {
      this.overed = false;
      this.props.navigation.setParams({
        title: '',
      });
    }
  }

  renderListStyleItem(item) {
    return (
      <View style={styles.listStyleItem.container}>
        <Text style={styles.listStyleItem.label}>{item.label ? item.label : ''}</Text>
        <Text style={styles.listStyleItem.value}>{item.value ? item.value : ''}</Text>
        <Icon
          containerStyle={styles.listStyleItem.chevron.container}
          name='chevron-right'
          type='entypo'
          size={styles.listStyleItem.chevron.size}
          color={styles.listStyleItem.chevron.color}
          underlayColor={styles.listStyleItem.chevron.color}
        />
      </View>
    )
  }

  renderBookInfo(book) {
    return (
      <View style={styles.info.container}>
        <Image source={{ uri: `https://qidian.qpic.cn/qdbimg/349573/${book.BookId}/180` }} style={styles.info.preview} />
        <View style={styles.info.text.container}>
          <Text style={styles.info.text.title}>{book.BookName ? book.BookName : '--'}</Text>
          <Text style={styles.info.text.author}>{book.Author ? book.Author : '--'}</Text>
          <View style={[styles.info.text.inline]}>
            <Rating style={styles.info.text.rating} ratingCount={5} startingValue={+book.BookStar} readonly={true} imageSize={theme.styles.variables.size.md} />
            <Text style={styles.info.text.others}>{book.BssReadTotal ? `${formatNumber(book.BssReadTotal)}人读过` : ''}</Text>
          </View>
          <Text style={styles.info.text.others}>{book.CategoryName && book.SubCategoryName ? `${book.CategoryName} | ${book.SubCategoryName}` : '--'}</Text>
          <Text style={styles.info.text.others}>{book.WordsCnt && book.BookStatus ? `${formatNumber(book.WordsCnt, 1)}字 | ${book.BookStatus}` : '--'}</Text>
        </View>
      </View>
    )
  }

  renderBookStatisticsItem(item) {
    return (
      <View key={item.label} style={styles.statistics.item.container}>
        <View style={styles.statistics.item.data.container}>
          <Text style={styles.statistics.item.data.number}>{item.number ? item.number : '--'}</Text>
          <Text style={styles.statistics.item.data.unit}>{item.unit ? item.unit : ''}</Text>
        </View>
        <Text style={styles.statistics.item.label}>{item.label}</Text>
      </View>
    )
  }

  renderBookStatistics(book) {
    const statistics = [{
      label: '月票',
      number: book.MonthTicketCount,
    }, {
      label: '推荐',
      number: formatNumber(book.RecommendAll, 0, false),
      unit: '万'
    }, {
      label: '打赏',
      number: formatNumber(book.DonateCount, 1, false),
      unit: '万次',
    }, {
      label: '粉丝',
      number: formatNumber(book.BookFansCount, 1, false, 1),
      unit: '万+',
    }];
    return (
      <View style={styles.statistics.container}>
        {statistics.map(item => this.renderBookStatisticsItem(item))}
      </View>
    )
  }

  renderBookDetail(book) {
    return (
      <View style={styles.detail.container}>
        <View style={styles.detail.description.container}>
          <Text style={styles.detail.description.title}>简介</Text>
          <Text style={styles.detail.description.text}>{book.Description ? book.Description : '--'}</Text>
        </View>
        {this.renderListStyleItem({ label: '目录', value: `连载至 ${book.TotalChapterCount} 章` })}
      </View>
    );
  }

  renderBookHonor(book) {
    return (
      <View style={styles.honor.container}>
        {this.renderListStyleItem({ label: '作品荣誉', value: `${book.BookHonor && book.BookHonor.length ? book.BookHonor[0].Honors : ''}` })}
      </View>
    );
  }

  renderComment(item) {
    return (
      <View key={item.Id} style={styles.comment.item.container}>
        <Image style={styles.comment.item.avatar} source={{ uri: `https://qidian.qpic.cn/qd_face/349573/${item.UserId}/100` }} />
        <View style={styles.comment.item.textContainer}>
          <View style={styles.comment.item.name.container}>
            <Text>{item.UserName}</Text>
          </View>
          <Text style={styles.comment.item.info}>{`${item.PostDate}：${item.From}`}</Text>
          <Text style={styles.comment.item.text}>{subword(item.Body)}</Text>
        </View>
      </View>
    );
  }

  renderCommmentList(list) {
    if (!list || !list.length) {
      return false;
    }
    return (
      <View style={styles.area.contentContainer}>
        {list.map(item => this.renderComment(item))}
      </View>
    )
  }

  renderBookComment(book) {
    return (
      <View style={styles.area.container}>
        {this.renderListStyleItem({ label: '书评', value: `${book.BookForumCount ? `${formatNumber(book.BookForumCount, 0, true, 1)}+` : ''}` })}
        {this.renderCommmentList(book.BookReviewList)}
      </View>
    );
  }

  renderAuthorBooks(books) {
    return (
      <ScrollView horizontal={true} style={styles.author.books.container}>
        {
          books.map(book => {
            return (
              <View key={book.BookId} style={styles.author.books.book.container}>
                <Image style={styles.author.books.book.preview} source={{ uri: `https://qidian.qpic.cn/qdbimg/349573/${book.BookId}/180` }} />
                <View style={styles.author.books.book.titleWrapper}>
                  <Text style={styles.author.books.book.title}>{book.BookName}</Text>
                </View>
                <Text style={styles.author.books.book.readers}>{`${formatNumber(book.BssReadTotal, 1, true, 1)}人...`}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  renderAuthorInfo(book) {
    const { AuthorInfo: author = {}, AuthorRecommend: authorBooks = [] } = book;
    return (
      <View style={styles.area.container}>
        {this.renderListStyleItem({ label: '作家', value: '' })}
        <View style={styles.area.contentContainer}>
          <View style={styles.author.info.container}>
            <Avatar
              medium
              rounded
              source={{ uri: author.RealImageUrl }}
            />
            <View style={styles.author.info.textContainer}>
              <Text style={styles.author.info.name}>{author.AuthorName}</Text>
              <Text style={styles.author.info.info}>{author.AuthorDesc}</Text>
            </View>
          </View>
          {this.renderAuthorBooks(authorBooks)}
        </View>
      </View>
    );
  }

  render() {
    const book = this.state.book;
    return (
      <Page containerStyle={styles.page}>
        <ParallaxView
          style={{ flex: 1, paddingTop: 60, }}
          onScroll={(e) => {
            this.onScrollOverTitle(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={3}
          backgroundSource={{uri: 'https://img6.bdstatic.com/img/image/public/bizhi112.png'}}
          header={this.renderBookInfo(book)}
          windowHeight={styles.info.container.height}
          backgroundHeight={styles.info.container.height + 360}
        >
          {this.renderBookStatistics(book)}
          {this.renderBookDetail(book)}
          {this.renderBookHonor(book)}
          {this.renderBookComment(book)}
          {this.renderAuthorInfo(book)}
        </ParallaxView>
      </Page>
    );
  }
}

export default BookScreen;

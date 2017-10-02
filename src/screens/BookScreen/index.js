import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';

import { Icon, Button, Rating } from 'react-native-elements';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import Toast from '../../components/Toast';

import { theme } from '../../theme';
import styles from './index.style';

import { item } from '../../services/book';

class BookScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerStyle: {
        backgroundColor: theme.styles.variables.colors.transparent,
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

  renderBookInfo(book) {
    return (
      <View style={styles.info.container}>
        <Image source={{ uri: `https://qidian.qpic.cn/qdbimg/349573/${book.BookId}/180` }} style={styles.info.preview} />
        <View style={styles.info.text.container}>
          <Text style={styles.info.text.title}>{book.BookName}</Text>
          <Text style={styles.info.text.author}>{book.Author}</Text>
          <View style={[styles.info.text.inline]}>
            <Rating style={styles.info.text.rating} ratingCount={5} startingValue={+book.BookStar} readonly={true} imageSize={theme.styles.variables.size.md} />
            <Text style={styles.info.text.others}>{book.BssReadTotal}人读过</Text>
          </View>
          <Text style={styles.info.text.others}>{book.CategoryName} | {book.SubCategoryName}</Text>
          <Text style={styles.info.text.others}>{book.WordsCnt}字 | {book.BookStatus}</Text>
        </View>
      </View>
    )
  }

  renderBookDetail() {

  }

  renderBookHonor() {

  }

  renderBookComment() {

  }

  renderAuthorInfo() {

  }

  render() {
    const book = this.state.book;
    return (
      <Page>
        {this.renderBookInfo(book)}
      </Page>
    );
  }
}

export default BookScreen;

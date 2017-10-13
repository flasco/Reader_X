import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Page from '../../components/Page';
import Toast from '../../components/Toast';
import BookList, { BookListType } from '../../components/BookList';

import { list } from '../../services/book';


import { theme } from '../../theme';
import styles from './index.style';

class ShelfScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: '古意流苏',
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='magnifying-glass'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => {
              screenProps.router.navigate(navigation, 'Search');
            }}
          />
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='dots-three-horizontal'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarLabel: '书架',
    };
  };
  constructor(props) {
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.bookLst;
    // AsyncStorage.clear();
  }

  async onFetch() {
    try {
      this.bookLst = await JSON.parse(await AsyncStorage.getItem('@Reader_X:bookLst'));
      if (this.bookLst && this.bookLst.data && this.bookLst.data.length) return this.bookLst;

      const { data, err } = await list();
      if (err) {
        return ({ err });
      }

      this.bookLst = { data };
      await AsyncStorage.setItem('@Reader_X:bookLst', JSON.stringify(this.bookLst));
      return this.bookLst;
    } catch (err) {
      return ({ err });
    }
  }

  renderFooter() {
    return (
      <View style={styles.readMore.container}>
        <Button
          containerViewStyle={styles.readMore.button.wrapper}
          borderRadius={styles.readMore.button.borderRadius}
          buttonStyle={[styles.readMore.button.button, { borderColor: theme.styles.variables.colors.main }]}
          color={theme.styles.variables.colors.main}
          title='浏览记录'
          fontSize={styles.readMore.button.fontSize}
          rightIcon={{ name: 'chevron-right', color: theme.styles.variables.colors.main, style: styles.readMore.button.chevron }}
          onPress={() => {
            this.props.screenProps.router.navigate(this.props.navigation, 'History');
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <Page>
        <Toast
          ref="toast"
          position='center'
          bot={30} />
        <BookList
          type={BookListType.Simple}
          datasource={this.onFetch}
          ListFooterComponent={this.renderFooter}
          extraData={theme.styles.variables.colors.main}  // 设置主题色（如果不设置则无法触发list刷新DOM）
          onItemClicked={(index) => {
            let item = {
              fir: index,
              sec: this.bookLst
            }
            this.props.screenProps.router.navigate(this.props.navigation, 'Book', item, NavigationActions.navigate({ routeName: 'Read', params: item }));
          }}
          keyExtractor={(item, index) => item.BookId}
        />
      </Page>
    );
  }
}

export default ShelfScreen;

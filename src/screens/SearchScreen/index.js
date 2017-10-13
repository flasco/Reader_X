import React, { Component, PureComponent } from 'react';
import { Text, View, FlatList, Image } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Button, Divider, ListItem, List, SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// import styles from './index.style';
import { theme } from '../../theme';

import Page from '../../components/Page';
import { RefreshState } from '../../components/RefreshFlatList';
import BookList, { BookListType } from '../../components/BookList';

import { list } from '../../services/book';

import styles from './index.style';

class SearchX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={[{ flexDirection: 'row' }, theme.styles.navContainer]}>
        <SearchBar
          lightTheme
          containerStyle={[theme.styles.navContainer, { flex: 7, borderBottomWidth: 0, borderTopWidth: 0 }]}
          inputStyle={{ backgroundColor: '#fff' }}
          icon={{ color: '#86939e', name: 'search' }}
          autoCorrect={false}
          returnKeyType='search'
          placeholder='输入关键字'
          showLoadingIcon={this.props.loading}

          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={() => {
            this.props.textSearch(this.state.text);
          }}
        />
        <Button style={{ flex: 1, width: 20, justifyContent: 'center', marginLeft: 12, alignItems: 'center' }}
          title='取消'
          containerViewStyle={theme.styles.navContainer}
          buttonStyle={{ backgroundColor: 'transparent' }}

          onPress={() => {
            this.props.screenProps.router.goBack(this.props.navigation);
          }}
        />
      </View>
    );
  }
}

class SearchScreen extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      result: [],
      loading: false,
      loadFlag: RefreshState.Idle,
      pageIndex: 1,
    };

    this.fetchData = this.fetchData.bind(this);
    this.bookSearch = this.bookSearch.bind(this);
  }

  async fetchData(text, pageIndex) {
    this.state.loadFlag === RefreshState.Idle && this.setState({
      searchText: text,
      loading: true,
    }, async () => {
      const { data, err } = await list(text, pageIndex);

      if (err) {
        // 搜索失败
        this.setState({
          searchText: '',
          loading: false,
          loadFlag: RefreshState.Failure,
        });
        return false;
      }

      this.setState({
        searchText: '',
        result: [...this.state.result, ...data],
        loading: false,
        loadFlag: RefreshState.Idle,
        pageIndex: this.state.pageIndex + 1,
      });
    });
  }

  async bookSearch(text) {
    this.setState({
      result: [],
      loading: false,
      loadFlag: RefreshState.Idle,
      pageIndex: 1,
    }, () => {
      this.fetchData(text, this.state.pageIndex);
    });
  }

  render() {
    return (
      <Page>
        <View style={[{ height: 16, backgroundColor: '#fff' }, theme.styles.navContainer]} />
        <SearchX
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          textSearch={this.bookSearch}
          loading={this.state.loading}
        />
        <BookList
          keyExtractor={(item, index) => item.BookId}
          dynamic={false}
          type={BookListType.Complete}
          booklist={this.state.result}
          ListFooterComponent={this.renderFooter}

          onItemClicked={(item, index) => {
            this.props.screenProps.router.navigate(this.props.navigation, 'Book', item, NavigationActions.navigate({ routeName: 'Info', params: item }));
          }}
          onEndReached={() => {
            this.state.pageIndex > 1 && this.fetchData(this.state.searchText, this.state.pageIndex);
          }}
        />
      </Page>
    );
  }
}

export default SearchScreen;

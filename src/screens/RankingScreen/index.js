import React, { Component } from 'react';
import { Text } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';
import { RefreshState } from '../../components/RefreshFlatList';
import BookList, { BookListType } from '../../components/BookList';

import { list } from '../../services/book'

class RankingScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let toEnd = true;
    return {
      title: '起点排行',
      tabBarLabel: '排行',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='layers'
          type='entypo'
          color={tintColor}
        />
      ),
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      pageIndex: 1,
      loadFlag: RefreshState.Idle,
    }

    this.fetchData = this.fetchData.bind(this);

  }

  async fetchData(text, pageIndex) {
    const { data, err } = await list(text, pageIndex);
    if (err) {
      // 搜索失败
      this.setState({
        loadFlag: RefreshState.Failure,
      });
      return false;
    }

    this.setState({
      result: [...this.state.result, ...data],
      loadFlag: RefreshState.Idle,
      pageIndex: this.state.pageIndex + 1,
    });
  }

  componentDidMount() {
    this.fetchData('网络', this.state.pageIndex);
  }

  render() {
    return (
      <Page>
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
            this.state.pageIndex > 1 && this.fetchData('网络', this.state.pageIndex);
          }}
        />
      </Page>
    );
  }
}

export default RankingScreen;

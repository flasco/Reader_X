
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, List, ListItem } from 'react-native-elements';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import BookComment from '../../components/BookComment';

import { list } from '../../services/comment';

import styles from './index.style';

class BookForum extends Component {
  static navigationOptions = {
    title: '书评',
  }

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      fetchFlag: RefreshState.Idle,
    };

    this.onFetch = this.onFetch.bind(this);
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.onFetch();
  }

  onFetch() {
    this.setState({ fetchFlag: RefreshState.HeaderRefreshing }, async () => {
      const { err, data } = await list();
      if (err) {
        this.setState({
          fetchFlag: RefreshState.Failure,
        });
        return;
      }
      if (!data || !data.length) {
        this.setState({
          fetchFlag: RefreshState.NoMoreData,
        });
        return;
      }

      this.setState({
        comments: data,
        fetchFlag: RefreshState.Idle,
      });
    });
  }

  onHeaderRefresh() {
    this.onFetch();
  }

  renderRow({ item, index }) {
    return <BookComment item={item} itemContainerStyle={styles.item} />;
  }

  render() {
    return (
      <Page style={styles.page}>
        <List style={styles.container}>
          <RefreshFlatList
            data={this.state.comments}
            renderItem={this.renderRow}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.Id}
            refreshState={this.state.fetchFlag}
            onHeaderRefresh={this.onHeaderRefresh}
          />
        </List>
      </Page>
    );
  }
}

export default BookForum;

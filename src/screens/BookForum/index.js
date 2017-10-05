
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, List, ListItem } from 'react-native-elements';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import BookComment from '../../components/BookComment';

class BookForum extends Component {
  constructor(props) {
    super(props);
  }

  renderRow(item) {
    const rowData = item.item;
    return <BookComment item={item} />;
  }

  render() {
    <Page>
      <List style={styles.list.container}>
        <RefreshFlatList
          data={this.state.booklist}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item.bookId}
          refreshState={this.state.fetchFlag}
          onHeaderRefresh={this.onHeaderRefresh}
          ListFooterComponent={this.renderFooter}
          extraData={theme.styles.variables.colors.main}  // 设置主题色（如果不设置则无法触发list刷新DOM）
        />
      </List>
    </Page>
  }
}

export default BookForum;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';

import { Icon, Button, List, ListItem, Divider } from 'react-native-elements';

import Page from '../Page';
import RefreshFlatList, { RefreshState } from '../RefreshFlatList';
import Toast from '../Toast';

import { theme } from '../../theme';
import styles from './index.style';

import { list } from '../../services/book';
import { mergeDeep } from '../../utils/object';

export const BookListType = {
  Simple: 1,
  Complete: 2,
  Custom: 3,
};

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booklist: [],
      type: BookListType.Complete,
      loadingFlag: true,
      fetchFlag: RefreshState.Idle,
    }

    this.onFetch = this.onFetch.bind(this);
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
    this.renderSimpleInfo = this.renderSimpleInfo.bind(this);
    this.renderCompleteInfo = this.renderCompleteInfo.bind(this);
    this.renderSimpleRow = this.renderSimpleRow.bind(this);
    this.renderCompleteRow = this.renderCompleteRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
  }

  componentDidMount() {
    this.onFetch();
  }

  get styles() {
    if (this.currentstyle) return this.currentstyle;
    switch (this.props.type) {
      case BookListType.Simple:
        return (this.currentstyle = mergeDeep({}, styles.common, styles.simple));
      case BookListType.Complete:
        return (this.currentstyle = mergeDeep({}, styles.common, styles.complete));
      case BookListType.Custom:
        return (this.currentstyle = mergeDeep({}, styles.common, this.props.style));
      default:
        throw 'error book list type specified.';
    }
  }

  onFetch() {
    this.setState({ fetchFlag: RefreshState.HeaderRefreshing }, async () => {
      const { err, data } = await this.props.datasource();
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
        booklist: data,
        fetchFlag: RefreshState.Idle,
      });
    });
  }

  onHeaderRefresh() {
    this.onFetch();
  }

  renderSimpleInfo(item) {
    return (
      <View style={this.styles.item.info.container}>
        <View style={this.styles.item.info.text.container}>
          <Text style={this.styles.item.info.text.text}>
            {item.author}
          </Text>
        </View>
        <View style={this.styles.item.info.text.container}>
          <Text style={this.styles.item.info.text.text}>
            {item.lastUpdateChapterName}
          </Text>
        </View>
      </View>
    );
  }

  renderCompleteInfo(item) {
    return (
      <View style={this.styles.item.info.container}>
        <View style={[this.styles.item.info.text.container, this.styles.item.info.description.container]}>
          <Text style={[this.styles.item.info.text.text]} numberOfLines={2} ellipsizeMode='tail'>
            {item.description}
          </Text>
        </View>
        <View style={[this.styles.item.info.text.container, this.styles.item.info.authors.container]}>
          <Text style={this.styles.item.info.text.text}>
            {item.author}
          </Text>
          <Text>

          </Text>
        </View>
      </View>
    );
  }

  renderSimpleRow({ item: rowData, index, onPress }) {
    return (
      <ListItem
        containerStyle={this.styles.item.container}
        hideChevron={ true }
        leftIcon={<Image source={{uri: `https://qidian.qpic.cn/qdbimg/349573/${rowData.bookId}/180`}} style={this.styles.item.preview} />}
        title={rowData.bookName}
        titleStyle={this.styles.item.title.text}
        titleContainerStyle={this.styles.item.title.container}
        subtitle={this.renderSimpleInfo(rowData)} 
        onPress={() => onPress(rowData)}
      />
    );
  }
  
  renderCompleteRow({ item: rowData, index, onPress }) {
    return (
      <ListItem
        containerStyle={this.styles.item.container}
        hideChevron={ true }
        leftIcon={<Image source={{uri: `https://qidian.qpic.cn/qdbimg/349573/${rowData.bookId}/180`}} style={this.styles.item.preview} />}
        title={rowData.bookName}
        titleStyle={this.styles.item.title.text}
        titleContainerStyle={this.styles.item.title.container}
        subtitle={this.renderCompleteInfo(rowData)} 
        onPress={() => onPress(rowData)}
      />
    );
  }

  renderRow({ item: rowData, index }) {
    const onPress = this.props.onItemClicked;
    switch(this.props.type) {
      case BookListType.Simple:
        return this.renderSimpleRow({item: rowData, index, onPress});
      case BookListType.Complete:
        return this.renderCompleteRow({item: rowData, index, onPress});
      case BookListType.Custom:
        return this.props.renderRow({item: rowData, index, onPress});
      default:
        throw 'error book list type specified.';
    }
  }

  renderSeparator() {
    return <Divider style={this.styles.divider} />;
  }

  render() {
    return (
      <List style={this.styles.list.container}>
        <RefreshFlatList
          {...this.props}
          data={this.state.booklist}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item.bookId}
          refreshState={this.state.fetchFlag}
          onHeaderRefresh={this.onHeaderRefresh}
        />
      </List>
    );
  }
}

BookList.propTypes = {
  datasource: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(BookListType)).isRequired,
  style: PropTypes.object,
  renderRow: PropTypes.func,
  onItemClicked: PropTypes.func.isRequired,
}

BookList.defaultProps = {
  datasource: list,
  type: BookListType.Complete,
  onItemClicked: () => {},
}

export default BookList;

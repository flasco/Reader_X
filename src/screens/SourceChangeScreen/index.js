import React, { Component, PureComponent } from 'react';
import { Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Button, Divider, List, ListItem } from 'react-native-elements';

import styles from './index.style';
import { theme } from '../../theme';

import RefreshFlatList from '../../components/RefreshFlatList';
import { chapterList } from '../../services/book';

let tht;

class SourceChangeScreen extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    let toEnd = true;
    return {
      title:'书源切换',
      tabBarVisible: false,
    };
  }
  constructor(props) {
    super(props);
    tht = this;
    // console.log(this.props.navigation.state.params.bookNum);

    this.currentChapterIndex = this.props.navigation.state.params.bookNum || 0;

    this.state = {
      bookList: [],
      fetchFlag: 0,
    };

    this.props.navigation.state.params.that = this;

    this.renderSeparator = this.renderSeparator.bind(this);
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    let data = this.props.navigation.state.params.chapterList;
    this.setState({
      bookList: data,
    });
    setTimeout(() => {
      tht.refs.lst1.refs.lst2.scrollToIndex({ viewPosition: 0.5, index: this.currentChapterIndex });
    }, 250);
  }

  async fetchChapterLst(bookId, direct) {
    const { err, data } = await chapterList(bookId);
    this.setState({
      bookList: data,
    });

  }

  renderSeparator() {
    return (
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
      </View>
    );
  }

  onHeaderRefresh() {
    return;
  }

  renderRow(item) {
    const itemColor = item.index === this.currentChapterIndex ? styles.Catalogcolors.selectedColor : (item.item.isDownload ? styles.Catalogcolors.loadedChapterColor : styles.Catalogcolors.noLoadChapterColor);
    return (
      <ListItem
        key={item.item.chapterId}
        hideChevron={true}
        title={item.item.Title}
        onPress = {()=>{
          this.props.navigation.state.params.callback(item.item.ChapterId,item.index);
          this.props.screenProps.router.goBack(this.props.navigation);
        }}
        titleStyle={[itemColor, { fontSize: 15 }]}
        containerStyle={styles.itemContainerStyle}
      />
    );
  }

  render() {
    return (
      <List style={{ flex: 1 }} >
        <RefreshFlatList
          style={{ backgroundColor: '#eeeeee' }}
          data={this.state.bookList}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item.ChapterId}
          refreshState={this.state.fetchFlag}
          getItemLayout={(data, index) => ({ length: 50, offset: 51 * index, index })}//行高38，分割线1，所以offset=39
          onHeaderRefresh={this.onHeaderRefresh} />
      </List>
    );
  }
}


export default SourceChangeScreen;
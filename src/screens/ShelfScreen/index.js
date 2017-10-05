import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Icon, Button, List, ListItem, Divider } from 'react-native-elements';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import Toast from '../../components/Toast';
import IconTouch from '../../components/IconTouch';

import { theme } from '../../theme';
import styles from './index.style';

import { list } from '../../services/book';

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
            onPress={() => { }}
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

    this.state = {
      booklist: [],
      loadingFlag: true,
      fetchFlag: RefreshState.Idle,
    }

    this.onFetch = this.onFetch.bind(this);
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
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
        booklist: data,
        fetchFlag: RefreshState.Idle,
      });
    });
  }

  onHeaderRefresh() {
    this.onFetch();
  }

  renderInfo(item) {
    return (
      <View style={styles.item.info.container}>
        <View style={styles.item.info.text.container}>
          <Text style={styles.item.info.text.text}>
            {item.author}
          </Text>
        </View>
        <View style={styles.item.info.text.container}>
          <Text style={styles.item.info.text.text}>
            {item.lastUpdateChapterName}
          </Text>
        </View>
      </View>
    );
  }

  renderRow(item) {
    const rowData = item.item;
    return (
      <ListItem
        containerStyle={styles.item.container}
        hideChevron={ true }
        leftIcon={<Image source={{uri: `https://qidian.qpic.cn/qdbimg/349573/${rowData.bookId}/180`}} style={styles.item.icon} />}
        title={rowData.bookName}
        titleStyle={styles.item.title.text}
        titleContainerStyle={styles.item.title.container}
        subtitle={this.renderInfo(rowData)} 
        onPress={() => {
          // this.props.navigation.navigate('Book', {...rowData});
          this.props.screenProps.router.navigate(this.props.navigation, 'Book', {...rowData});
        }}
      />
    );
  }

  renderSeparator() {
    return <Divider style={styles.divider} />;
  }

  renderFooter() {
    return (
      <View style={styles.readMore.container}>
        <Button
          containerViewStyle={styles.readMore.button.wrapper}
          borderRadius={styles.readMore.button.borderRadius}
          buttonStyle={[styles.readMore.button.button, {borderColor: theme.styles.variables.colors.main}]}
          color={theme.styles.variables.colors.main}
          title='浏览记录'
          fontSize={styles.readMore.button.fontSize}
          rightIcon={{ name: 'chevron-right', color: theme.styles.variables.colors.main, style: styles.readMore.button.chevron }}
          onPress={() => {
            this.props.screenProps.activeTheme('black');
          }}
        />
      </View>
    );
  }

  render() {
    return (// toast 的bot 是为了针对 使用了导航之后导致window的高度变小而导致的位置变化
      <Page>
        <Toast
          ref="toast"
          position='center'
          bot={30} />
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
    );
  }
}

export default ShelfScreen;
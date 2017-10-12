import React, { Component,PureComponent } from 'react';
import {  Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Button,Divider,List,ListItem } from 'react-native-elements';

import styles from './index.style';
import { theme } from '../../theme';

import RefreshFlatList from '../../components/RefreshFlatList'; 
import { chapterList } from '../../services/book';

class CatalogScreen extends PureComponent {  
    static navigationOptions = ({ navigation, screenProps }) => {
      let toEnd = true;
      return {
        title: `${navigation.state.params.bookName}`,
        headerRight: (
          <View style={styles.navRightContainer}>
            <Button
              buttonStyle={styles.button}
              color={'#fff'}
              title='顶底直达'
              fontSize={16}
              onPress={() => {
                let flatLst = navigation.state.params.that.refs.lst1.refs.lst2;
                toEnd?flatLst.scrollToEnd():flatLst.scrollToIndex({ viewPosition: 0.5, index: 0 });
                toEnd = !toEnd;
                

              }}
            />
          </View>
        ),
        tabBarVisible: false,
      };
    }
    constructor(props) {
      super(props);
      this.currentChapterId = this.props.navigation.state.params.bookNum || 1;
      this.state = {
        bookList:[],
        fetchFlag:0,
      };

      this.props.navigation.state.params.that = this;

      this.renderSeparator = this.renderSeparator.bind(this);
      this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount(){
      let data = this.props.navigation.state.params.chapterList;
      this.setState({
        bookList:data,
      });
    }

    async fetchContent(bookId, direct) {
      const { err, data } = await chapterList(bookId);
      console.log(data);
      for(let i = 0,j = data.length;i<j;i++){
        data[i].isDownload = i % 2 ;//测试句
      }
      
      this.setState({
        bookList:data,
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
      const itemColor = item.item.id === this.currentChapterId ? styles.Catalogcolors.selectedColor: (item.item.isDownload ? styles.Catalogcolors.loadedChapterColor : styles.Catalogcolors.noLoadChapterColor);
      return(
        <ListItem
          key={item.item.id}
          hideChevron={ true }
          title={item.item.title}
          titleStyle = {[itemColor,{fontSize:15}]}
          containerStyle={styles.itemContainerStyle}
        />
      );
    }

    render() {
      return (
        <List style={{flex:1}} >
          <RefreshFlatList
            style={{backgroundColor:'#eeeeee'}}
            ref={'lst1'}
            listRef={'lst2'}
            data = {this.state.bookList}
            renderItem={this.renderRow}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.id}
            refreshState={this.state.fetchFlag}
            getItemLayout={(data, index) => ({ length: 50, offset: 51 * index, index })}//行高38，分割线1，所以offset=39
            onHeaderRefresh={this.onHeaderRefresh} />
        </List>
      );
    }
}



export default CatalogScreen;
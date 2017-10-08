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
      const callback = () => {
        alert('sort');
      };
      return {
        title: `${navigation.state.params.bookName}`,

        headerRight: (
          <View style={styles.navRightContainer}>
            <Button
              containerViewStyle={styles.wrapper}
              buttonStyle={styles.button}
              color={'#fff'}
              title='正序'
              fontSize={16}
              leftIcon={{ name: 'swap-vert', type:'MaterialIcons', color: '#fff', style: styles.chevron }}
              onPress={() => {
                screenProps.a();
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
      // console.log(this.currentChapterId);
      this.state = {
        bookList:[],
        fetchFlag:0,
      };

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
            data = {this.state.bookList}
            renderItem={this.renderRow}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.id}
            refreshState={this.state.fetchFlag}
            onHeaderRefresh={this.onHeaderRefresh} />
        </List>
      );
    }
}



export default CatalogScreen;
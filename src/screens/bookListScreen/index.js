import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { Icon } from 'react-native-elements'
import ax from 'axios';

import RefreshListView , {RefreshState} from '../../components/RefreshFlatList'
import getNet from '../../utils/getNet';
import BookItem from '../../components/bookItemComp'
import IconTouch from '../../components/IconTouch'

import styles from './index.style';

var RefreshCount = 0;

class BookList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '古意流苏',
            headerBackTitle: ' ',
            headerStyle: styles.theme.RedTheme,
            headerRight: (
                <View style={styles.test.nav}>
                    <IconTouch
                    iconName='magnifying-glass'
                    iconType='entypo'
                    onPress={()=>{ }}
                    />
                    <IconTouch
                    iconName='dots-three-horizontal'
                    iconType='entypo'
                    onPress={()=>{ }}
                    />
                </View>
            ),
            headerTitleStyle: {
                color: '#fff',
                alignSelf: 'center'
            }
        };
    };
    constructor(props){
        super(props);
        let mockList = [{
            bookName: '飞剑问道',
            author: '我吃西红柿',
            url: 'http://www.xs.la/34_34495/',
            recordChapter: 'http://www.xs.la/34_34495/2266828.html',
            latestChapter: '待检测',
            recordPage: 1,
            plantformId: 5,
        }]

        this._renderRow = this._renderRow.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);

        this.state = {
            booklist:mockList,
            loadingFlag:true,
            fetchFlag:false,
            HeaderText:'下拉刷新',
        }
    }

    _renderRow(item) {
        let rowData = item.item;
        return (
            <BookItem
                imgSrc={require('../../assets/testPic.jpeg')}
                bookName={rowData.bookName}
                author={rowData.author}
                latestChapter={rowData.latestChapter} />
        );
    }

    _keyExtractor(item,index){
        return item.url;
    }

    _renderSeparator() {
        return (<View style={styles.test.solid} />);
    }

    onHeaderRefresh = () => {
        this.setState({fetchFlag: RefreshState.HeaderRefreshing})
        let listlength = this.state.booklist.length;
        getNet.refreshChapter(this.state.booklist, () => {
            RefreshCount++;
            if (RefreshCount != listlength) return;
            this.setState({
                booklist: this.state.booklist,
                fetchFlag: RefreshState.Idle,
            }, () => {
                RefreshCount = 0;
            });
        });
    }

    render() {
        return (
        <View style={styles.test.container}>
            <StatusBar barStyle="light-content"></StatusBar>
            <RefreshListView
                style={{ flex: 1 }}
                data={this.state.booklist}
                renderItem={this._renderRow}
                ItemSeparatorComponent={this._renderSeparator}
                getItemLayout={(data, index) => ({ length: 90, offset: 91 * index, index })}//行高38，分割线1，所以offset=39
                keyExtractor={this._keyExtractor}
                refreshState={this.state.fetchFlag}
                onHeaderRefresh={this.onHeaderRefresh}
                />
        </View>
        );
    }
}

export default BookList;
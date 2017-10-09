import React, { Component,PureComponent } from 'react';
import {  Text, View ,FlatList,Image } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Button,Divider,ListItem,List,SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// import styles from './index.style';
import { theme } from '../../theme';

import RefreshFlatList from '../../components/RefreshFlatList'; 
import { chapterList } from '../../services/book';
import BookList , { BookListType } from '../../components/BookList';
import { history } from '../../services/book';

import styles from './index.style';

class OrginChangeScreen extends PureComponent {  
    static navigationOptions = ({ navigation, screenProps }) => {
      return {
        header:null,
      };
    }
    constructor(props) {
      super(props);
      
      this.state = {
        dataSource: '',
      };

      this.TextSearch = this.TextSearch.bind(this);
      this.renderCompleteInfo = this.renderCompleteInfo.bind(this);
      this.renderCompleteRow = this.renderCompleteRow.bind(this);
      this.renderSeparator = this.renderSeparator.bind(this);
      this.styles = styles;
    }

    componentDidMount(){
    }

    async TextSearch(text){
      const { err, data } = await history();
      this.setState({
        dataSource:data,
      },()=>{ console.log(this.state.dataSource); });
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
          </View>
        </View>
      );
    }
  
    renderCompleteRow({ item: rowData, index }) {
      return (
        <ListItem
          containerStyle={this.styles.item.container}
          hideChevron={ true }
          leftIcon={<Image source={{uri: `https://qidian.qpic.cn/qdbimg/349573/${rowData.bookId}/180`}} style={this.styles.item.preview} />}
          title={rowData.bookName}
          titleStyle={this.styles.item.title.text}
          titleContainerStyle={this.styles.item.title.container}
          subtitle={this.renderCompleteInfo(rowData)} 
          onPress={() => this.props.screenProps.router.navigate(this.props.navigation, 'Book', rowData, NavigationActions.navigate({ routeName: 'Info', params: rowData }))}
        />
      );
    }
  
    renderSeparator() {
      return <Divider style={this.styles.divider} />;
    }

    render() {
      return (
        <View style={{flex:1}}>
          <View style={[{height:16,backgroundColor:'#fff'},theme.styles.navContainer]}/>
          <SearchX
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            TextSearch={this.TextSearch}/>
          <FlatList
            data={this.state.dataSource}
            style={{backgroundColor:'#fff',flex:1}}
            renderItem={this.renderCompleteRow}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.bookId} />
        </View>
      );
    }
}

class SearchX extends Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
    };
  }
  render(){
    return(
      <View style={[{flexDirection: 'row',},theme.styles.navContainer]}>
        <SearchBar
          onChangeText={(text) => this.setState({ text })}
          containerStyle={[theme.styles.navContainer,{flex:7}]}
          inputStyle={{backgroundColor:'#fff'}}
          autoCorrect={false}
          icon={{ color: '#86939e', name: 'search' }}
          onSubmitEditing={()=>{
            this.props.TextSearch(this.state.text);
          }}
          returnKeyType='search'
          placeholder='输入关键字' />
        <Button style={{flex:1,width:20,justifyContent:'center',marginLeft:12,alignItems:'center'}}
          title='取消'
          containerViewStyle={theme.styles.navContainer}
          buttonStyle={{backgroundColor:'transparent'}}
          onPress={()=>{
            this.props.screenProps.router.goBack(this.props.navigation);
          }}
        />
      </View>
    );
  }
}




export default OrginChangeScreen;
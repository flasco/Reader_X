import React, { Component,PureComponent } from 'react';
import {  Text, View } from 'react-native';

import { Button,ButtonGroup } from 'react-native-elements';

import styles from './index.style';
import { theme } from '../../theme';

let selected = 0,tht;


/**
 * 
 * swap-vert MaterialIcons
 * 
 * @class CatalogScreen
 * @extends {PureComponent}
 */
class CatalogScreen extends PureComponent {  
    static navigationOptions = ({ navigation }) => {
      return {
        title: `${navigation.state.params.name}`,

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
                
              }}
            />
          </View>
        ),
        tabBarVisible: false,
      };
    }
    constructor(props) {
      super(props);
      tht = this;
      
    }

    render() {
      return (
        <View style={styles.SunnyModeContainer}>
          <Text>asdasdas</Text>
        </View>
      );
    }
}


export default CatalogScreen;
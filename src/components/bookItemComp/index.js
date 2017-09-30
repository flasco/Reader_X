import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './index.style'


class BookItem extends Component{
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <View style={{
                    height: 90,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                }}>
                    <Image source={this.props.imgSrc} style={{width: 48, height: 64}} />
                    <View style={{
                        justifyContent: 'space-around',
                        height: 64
                    }}>
                        <Text style={styles.test.BookItem1}>
                            {this.props.bookName}
                        </Text>
                        <Text style={styles.test.BookItem2}>
                            {this.props.author}
                        </Text>
                        <Text style={styles.test.BookItem2}>
                            {this.props.latestChapter}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default BookItem;
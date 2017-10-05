import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './index.style';

const subword = (str) => {
  if (str.length > 100) {
    return `${str.substring(0, 100)}...`;
  }
  return str;
}

export default ({item}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: `https://qidian.qpic.cn/qd_face/349573/${item.UserId}/100` }} />
      <View style={styles.textContainer}>
        <View style={styles.name.container}>
          <Text>{item.UserName}</Text>
        </View>
        <Text style={styles.info}>{`${item.PostDate}：${item.From}`}</Text>
        <Text style={styles.text}>{subword(item.Body)}</Text>
      </View>
    </View>
  );
}

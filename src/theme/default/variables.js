
import { Dimensions } from 'react-native';

export const weight = {
  bold: '500',
  bolder: '700',
};

export const size = {
  xs: 10,
  sm: 12,
  md: 14,
  ml: 17,
  lg: 20,
  xlg: 24,
};

export const colors = {
  main: '#D70016',    // 主题色
  contrast: 'white',    // 针对于主题色的对比色
  title: 'black',          // 标题色（基于对比色）
  text: 'black',           // 文本色（基于对比色）
  info: '#999',           // 信息色（基于对比色）
  transparent: 'transparent',   // 透明
}

export const { width, height } = Dimensions.get('window');

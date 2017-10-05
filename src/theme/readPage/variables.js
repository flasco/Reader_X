
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

export const containerColors = {
  zhuishuGreen:'#a2cda6',
  zhuishuX:'#a0a088',
  zhuishuY:'#c4c4c4',
  qidianwhite:'#fff',
  qidianRockYellow:'#e8e1b7',
  qidianGreen:'#cde9d3',
  qidianPink:'#ffc4c7',
  qidianX:'#e4d2a1',
  qidianY:'#f3deae',

};

export const fontColors = {
  qidianGreen:'#2e3e23',
  zhuishuGreen:'#0d2a0f',
};

export const bottomColors = {
  qidianGreen:'#7b9480',
  zhuishuGreen:'#6e8975',
};

export const darkColor = {
  darkConColor:'#1c1c1c',
  darkFontColor:'#707070',
  darkBottomColor:'#575757',

};

export const { width, height } = Dimensions.get('window');

export default {
  weight,
  size,
  containerColors,
  darkColor,
  bottomColors,
  fontColors,
  width,
  height,
};

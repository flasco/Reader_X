import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const containerColors = {
  zhuishuGreen: '#a2cda6',
  zhuishuX: '#a0a088',
  zhuishuY: '#c4c4c4',
  qidianwhite: '#fff',
  qidianRockYellow: '#e8e1b7',
  qidianGreen: '#cde9d3',
  qidianPink: '#ffc4c7',
  qidianX: '#e4d2a1',
  qidianY: '#f3deae',
};

export default {
  Fotter: {
    height: 50,
    paddingTop: 6,
    backgroundColor: '#000',
    zIndex: 2,
    width: width,
    position: 'absolute',
    opacity: 0.75,
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  Setting:{
    height: 80,
    backgroundColor: '#000',
    zIndex: 2,
    opacity: 0.75,
    position: 'absolute',
    width: width,
    bottom: 50,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    right:0,
  },
  roundx:{
    width:30,
    height:30,
    zIndex: 4,
    borderRadius:30,
    opacity:1,
  },
  
  FotterItems: {
    color: '#fff', textAlign: 'center', fontSize: 12,
  },

};
import { Dimensions } from 'react-native';

const { height,width } = Dimensions.get('window');

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

export default {
  width : width,
  height : height,
  navRightContainer:{
    marginRight: 10,
    flexDirection: 'row',
  },
  navButtonContainer: {
    width: 40,
  },
  navButton: {
    color: 'white',
    underlayColor: 'transparent',
  },
  SunnyModeContainer : {
    flex: 1,
    backgroundColor: containerColors.zhuishuGreen,
  },
  MoonModeContainer : {
    flex: 1,
    backgroundColor: darkColor.darkConColor,
  },
  SunnyMode:{
    Title:{
      color: bottomColors.zhuishuGreen,
    },
    Text:{
      color: fontColors.zhuishuGreen,
    }
  },

  MoonMode:{
    Title:{
      color: darkColor.darkFontColor,
    },
    Text:{
      color: darkColor.darkFontColor,
    },
    Bottom:{
      color: darkColor.darkBottomColor,
    }
  },




  title : {
    marginTop: 8,
    paddingLeft: 20
  },
  bottom1 : {
    flex: 1,
    textAlign: 'left',
    marginLeft: 25
  },
  bottom2 : {
    flex: 1,
    textAlign: 'right',
    marginRight: 25
  },
  bottView : {
    flexDirection: 'row',
    marginBottom: 21
  },
  textsize : {
    textAlign:'justify',
    flex: 1,
    marginTop: 12,
    marginLeft: 18,
    fontSize: 23,//lineHeight =  fontSize * 1.5 +1 >>0
    fontStyle: 'normal',
    lineHeight: 35,
  },
  bookCont:{
    marginRight:14,
  },
};

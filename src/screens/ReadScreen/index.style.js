import styles from '../../theme/readPage';

export default {
  width : styles.width,
  height : styles.height,
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
    backgroundColor: styles.containerColors.zhuishuGreen,
  },
  MoonModeContainer : {
    flex: 1,
    backgroundColor: styles.darkColor.darkConColor,
  },
  SunnyMode:{
    Title:{
      color: styles.bottomColors.zhuishuGreen,
    },
    Text:{
      color: styles.fontColors.zhuishuGreen,
    }
  },

  MoonMode:{
    Title:{
      color: styles.darkColor.darkFontColor,
    },
    Text:{
      color: styles.darkColor.darkFontColor,
    },
    Bottom:{
      color: styles.darkColor.darkBottomColor,
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
    marginTop: 8,
    marginLeft: 18,
    fontSize: 23,
    fontStyle: 'normal',
    lineHeight: 37
  },
  bookCont:{
    marginRight:14,
  },
};

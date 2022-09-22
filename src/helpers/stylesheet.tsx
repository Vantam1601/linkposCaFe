 
import {Platform,StyleSheet } from 'react-native';
import { COLOR } from "src/theme/color";


export const style_base = { 
  bg:{
     width:'100%',
    height:'100%'
  },
  avatar :{
    width:45,height:45,borderRadius:50
  },
   center : {
     alignItems: 'center',justifyContent: 'center',display:'flex'
   },
   row : {
     display:'flex',flexDirection:'row',justifyContent:'space-between'
   },
   white_view: {
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    padding: 8,
    backgroundColor: COLOR.bgWhite, 
    borderRadius: 6,
  },
  loading:{
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    zIndex:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
};
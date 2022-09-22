import React, { memo,useEffect,useState} from 'react';
import {StyleSheet, View,} from 'react-native';

const LR = memo((props: any) => {
  const { left,right} = props;

  return 
  <View style={styles.vImage}>
     
      {left?left():null}
      {right?right():null}
  </View>

});

const styles = StyleSheet.create({
  
  vImage: { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } 
});

export default LR;

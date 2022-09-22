import React, { memo } from 'react';
import { StyleSheet, View  } from 'react-native'; 
import ViewAdsInline from 'src/components/ViewAds/inline';

interface RowItemProps {
  show:any;
}
const AdsOverlay = memo((props: RowItemProps) => { 
  const { show} = props;
  return show? <View style={styles.container}>
       <ViewAdsInline />
    </View>:null
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex:1000000,
    bottom:0,
    left:0,
    width:"100%"
  } 
});

export default AdsOverlay;

import React, { memo } from 'react';
import {StyleSheet, View } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { COLOR } from "src/theme/color";

interface RowItemProps {
  title?: any; 
  size?: any; 
}
const TextHeaderSimple = memo((props: RowItemProps) => {
 
  const { title,size} = props;

  return  <View {...props} style={[styles.vTextTitle]}>
    <AppText fontSize={size?size:14}>{title} </AppText>
  </View>;
});

const styles = StyleSheet.create({
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.main_color,
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 10
  },
});

export default TextHeaderSimple;

import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faEye,faBrowser,faStar } from "nvquang-font-icon/pro-solid-svg-icons";

interface RowItemProps {
  num?: any; 
}
const Rate = memo((props: RowItemProps) => {
  const intl = useTranslate();
  const { num} = props;
  return (<View style={{ flexDirection: "row" }}>
    {'a'.repeat(4).split('a').map((n,i)=>{
       return  <FontAwesomeIcon
                      color={i<num?"#ffc107":"gray"}
                      icon={faStar}
                      style={{ marginRight:4}}
                      size={18}
                    />

    })}
    </View>)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default Rate;

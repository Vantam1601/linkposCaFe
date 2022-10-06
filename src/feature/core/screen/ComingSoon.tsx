import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,StyleSheet,
  SafeAreaView,Image,
  View,TouchableOpacity,
} from "react-native";
import Button from "src/components/Button"; 
import { COLOR } from "src/theme/color"; 
 
const DEVICE_WIDTH = Dimensions.get("window").width;

const ComingSoon = memo((props) => {
 
  
  const show_empty=()=>{
    return <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
      <Image style={{
   
    width: 128,
    height: 128
  }} resizeMode="cover"
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/1149/1149208.png",
        }}
      />
      <Text>Đang cập nhật</Text>
      <Button
              style={{}}
              onPress={()=>{
                props.navigation.goBack();
              }}
              textStyle={{
                color: COLOR.textWhite,
                 width: '49%',
                textAlign: "center",
              }}
              text={"Về trang trước"}
            />
    </View>
  }
  
  return (
    <View style={styles.container}>
 
    
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        {show_empty()}
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  }
});

export default ComingSoon;

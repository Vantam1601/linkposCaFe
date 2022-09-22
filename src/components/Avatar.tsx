/*
Slide animation
@type Componet

 */
import React, { useState, useEffect, memo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import FastImage from "react-native-fast-image";

const Avatar = memo((props) => {
  const { width, height, item, onlick } = props;

  let w = width ? width : 55;
  let h = height ? height : 55;
  // console.log(JSON.stringify(item));
  return (
    <TouchableOpacity
      style={[styles.boxWithShadow, { width: w + 12 }]}
      onPress={onlick}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        {/* <FastImage style={{width: w,height:h,borderRadius:50}}
            source={{
              uri: item.image,
              priority: FastImage.priority.high,
            }}
          /> */}
      </View>
      <View style={{}}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 18, marginBottom: 4, color: "black" }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  boxWithShadow: {
    marginRight: 16,
  },
});
export default Avatar;

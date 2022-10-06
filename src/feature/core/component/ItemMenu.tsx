import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import { navigate, push } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { coreRoutes } from "../router/CoreRouter";
import { ItemMenuInterface } from "../screen/Dashboard";
import { cafeRoutes } from 'src/feature/cafe/router/CafeRouter';

interface Props {
  item: ItemMenuInterface;
}
const ItemMenu = ({ item,width}: Props) => {
  const {  name } = item;
  const onPress = () => {
    navigate(coreRoutes.CAFE, {
      screen: cafeRoutes.Loader,
      params: {
        screen: item.screen
      }
    });
  };
  return (
    <View style={{flexDirection:'row', justifyContent:'center',width:width?width:'48%',}}>
      <TouchableOpacity
      onPress={item.onPress?item.onPress:onPress}
      style={{
        minHeight: 100,
        backgroundColor: COLOR.white,
        borderRadius: 10,
        padding: 10,
        flexDirection: "column",
        width:'100%', alignItems:'center',
        marginBottom:16
      }}
    >
      <Image
        style={{
          width: 24,
          height: 24,
        }}
        resizeMode="contain"
        source={item.icon}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <AppText fontSize={20} fontWeight="bold" >
          {name}
        </AppText>
      </View>
      
    </TouchableOpacity>
    </View>
  );
};

export default ItemMenu;

const styles = StyleSheet.create({});

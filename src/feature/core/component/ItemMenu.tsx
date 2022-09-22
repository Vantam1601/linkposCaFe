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
const ItemMenu = ({ item }: Props) => {
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
    <View style={{flexDirection:'row', justifyContent:'center'}}>
      <TouchableOpacity
      onPress={onPress}
      style={{
        minHeight: 100,
        backgroundColor: COLOR.white,
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        width:'70%', alignItems:'center'
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        resizeMode="contain"
        source={item.icon}
      />
      <View style={{ flex: 1, alignItems:'flex-start', justifyContent:'center', paddingHorizontal: 20 }}>
        <AppText  fontSize={20} fontWeight="bold">
          {name}
        </AppText>
      </View>
      
    </TouchableOpacity>
    </View>
  );
};

export default ItemMenu;

const styles = StyleSheet.create({});

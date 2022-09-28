import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import { ShopModal } from "src/feature/auth/model.tsx/common";
import { SET_CURRENT_STORE } from "src/feature/auth/store/constants";
import { LOAD_TOKEN_SHOP } from "src/feature/cafe/store/constants";
import { push } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { coreRoutes } from "../router/CoreRouter";

interface Props {
  item: ShopModal;
}
const ItemShop = ({ item }: Props) => {
  const dispatch = useDispatch();
  const { server, url, name_outlet, status, shop, type } = item;
  const onPress = () => {
    dispatch({
      type: SET_CURRENT_STORE,
      payload: item,
    });

    getTokenShop();
  };
  const getTokenShop = () => {
    dispatch({
      type: LOAD_TOKEN_SHOP,
      callback: () => {
        push(coreRoutes.DASH_BOARD);
      },
    });
    // ?session_id={access_token}
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        minHeight: 70,
        backgroundColor: COLOR.main_color,
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <AppText color="white" fontSize={20} fontWeight="bold">
          {shop}
        </AppText>
        <AppText color="white" fontSize={16}>
          {type}
        </AppText>
      </View>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        resizeMode="contain"
        source={images.shop}
      />
    </TouchableOpacity>
  );
};

export default ItemShop;

const styles = StyleSheet.create({});

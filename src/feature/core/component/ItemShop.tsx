import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text,TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import { ShopModal } from "src/feature/auth/model.tsx/common";
import { SET_CURRENT_STORE } from "src/feature/auth/store/constants";
import { LOAD_TOKEN_SHOP } from "src/feature/cafe/store/constants";
import { push } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { coreRoutes } from "../router/CoreRouter";
import { RefObject } from "./loadingPage/LoadingPage";

 
const ItemShop = ({ item, loading,choose}) => {
  const dispatch = useDispatch();
  const { server, url, name_outlet, status, shop, type } = item;
  const onPress = () => {
    loading?.current?.toggleState(true);
    dispatch({
      type: SET_CURRENT_STORE,
      payload: item,
    });

    getTokenShop(item);
  };


  const getTokenShop = (item) => {
    dispatch({
      type: LOAD_TOKEN_SHOP,
      callback: () => {
        loading?.current?.toggleState(false);
        push(coreRoutes.DASH_BOARD, item);
      },
    });
    // ?session_id={access_token}
  };

  console.log(item.status);
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
      <View style={{ flex: 1,alignItems:'center'}}>
        <AppText color="white" fontSize={20} fontWeight="bold">
          {shop}
        </AppText>
        <AppText color="white" fontSize={16}>
          {type}
        </AppText>
      </View>
      {choose=="shoper"?<View>
         <Text style={{color:"#fff",opacity:0.8,fontSize:14}}>Tình trạng: {item.status.status=="1"?"Kích hoạt":"Chưa kích hoạt"}</Text>
         <Text style={{color:"#fff",opacity:0.8,fontSize:14}}>Quảng bá {item.status.access==1?"Đã liên kết":"Chưa liên kết"}</Text>
         <Text style={{color:"#fff",opacity:0.8,fontSize:14}}>Thanh toán: {item.status.pay==1?"Đã liên kết":"Chưa liên kết"}</Text>
      </View>:<View>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        resizeMode="contain"
        source={images.shop}
      />
      </View>}
    </TouchableOpacity>
  );
};

export default ItemShop;

const styles = StyleSheet.create({});

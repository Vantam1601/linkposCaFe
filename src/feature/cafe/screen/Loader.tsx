import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch } from "react-redux";
import { images } from "src/assets/images";
import { replace } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { useNavigation } from "@react-navigation/native";

import {
  LOAD_CART,
  LOAD_CONFIG,
  LOAD_TABLE,
  LOAD_TOKEN_SHOP,
} from "../store/constants";

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Loader> {}

const Loader = (props: Props) => {
  const { screen } = props.route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const callBack = () => {
    dispatch({
      type: LOAD_CONFIG,
      callback: callbackNavigate,
    });
    dispatch({
      type: LOAD_TABLE,
    });
    dispatch({
      type: LOAD_CART,
    });
  };

  const callbackNavigate = () => {
    if (!screen) {
      navigation.goBack();
      return Alert.alert("Thông báo", "Chức năng đang ohast triển");
    }
    replace(screen);
  };

  return (
    <ImageBackground
      source={images.background}
      style={{ flex: 1, paddingTop: getStatusBarHeight() }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>loading data ...</Text>
        <ActivityIndicator size={"large"} color={COLOR.main_color} />
      </View>
    </ImageBackground>
  );
};

export default Loader;

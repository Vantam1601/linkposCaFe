import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AppText } from "src/components/Apptext";
import { images } from "src/assets/images";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { cafeRoutes } from "./CafeRouter";
import { navigate } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { useNavigation } from "@react-navigation/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface TabItem {
  title: string;
  image: string;
  activeIndex: number;
  index: number;
  screen: string;
  params?: any;
}
const ItemTab = (props: TabItem) => {
  const onPress = () => {
    navigate(props.screen, props.params ?? {});
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      key={props.index}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Image
        style={{
          width: 20,
          height: 30,
          tintColor:
            props.activeIndex === props.index ? COLOR.main_color : COLOR.gray,
        }}
        resizeMode={"contain"}
        source={props.image}
      ></Image>
      <AppText fontSize={12}>{props.title}</AppText>
    </TouchableOpacity>
  );
};
const BottomTabLayoutKitchenCashier = (props: BottomTabBarProps) => {
  const navigation = useNavigation();
  const {
    state: { index },
  } = props;
  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        backgroundColor: COLOR.bgWhite,
        paddingBottom: getBottomSpace(),
      }}
    >
      <ItemTab
        screen={cafeRoutes.Kitchen}
        index={0}
        title="Home"
        image={images.home}
        activeIndex={index}
      />
      <ItemTab
        screen={cafeRoutes.Report}
        index={3}
        title="Report"
        image={images.report}
        activeIndex={index}
      />
    </View>
  );
};

export default BottomTabLayoutKitchenCashier;

const styles = StyleSheet.create({});

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLOR } from "src/theme/color";
import HeaderBack from "src/components/HeaderBack";
import { AppText } from "src/components/Apptext";
import { images } from "src/assets/images";
import { cafeRoutes } from "src/feature/cafe/router/CafeRouter";
import { push } from "src/navigator/RootNavigation";
interface ItemMenuProps {
  name: string;
  screen?: string;
  icon?: string;
}

const ItemMenu = (props: ItemMenuProps) => {
  const onPress = () => {
    if (props.screen) {
      push(props.screen);
    }
  };
  return (
    <View
      key={props.name}
      style={{ height: 100, padding: 10, flexDirection: "row" }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: COLOR.bgWhite,
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          alignItems: "center",
          flex: 1,
          paddingTop: 10,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: COLOR.txtGreen,
          }}
          resizeMode="contain"
          source={images.report}
        />
        <AppText
          fontSize={15}
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          {props.name}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};
const Report = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Report`} />
      <View style={{ flex: 1 }}>
        <ItemMenu name={"Lịch sử đơn hàng"} />
        <ItemMenu name={"Chấm công"} />
        <ItemMenu screen={cafeRoutes.ConfigMenu} name={"Config menu"} />
      </View>
    </View>
  );
};

export default Report;

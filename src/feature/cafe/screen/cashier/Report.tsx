import { View, Text, TouchableOpacity, Image,ScrollView} from "react-native";
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
    <View key={props.name} style={{ height: 100, padding: 10 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: COLOR.bgWhite,
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          alignItems: "center",
          flex: 1,
          padding: 10,
          flexDirection: "row",
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
        <View style={{ flex: 1 }}>
          <AppText
            fontSize={15}
            fontWeight="bold"
            style={{ paddingHorizontal: 10 }}
          >
            {props.name}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const Report = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Thông tin`} />
      <ScrollView style={{ flex: 1 }}>
        <ItemMenu screen={cafeRoutes.CashierToday} name={"Lịch sử đơn hàng"} />
        <ItemMenu screen={"FingerQrcode"} name={"Mã Chấm công"} />
        <ItemMenu screen={"FingerHistory"} name={"Lịch sử chấm công"} />
        <ItemMenu screen={"CashierConfig"} name={"Tắt thực đơn"} />
      </ScrollView>
    </View>
  );
};

export default Report;

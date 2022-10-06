import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLOR } from "src/theme/color";
import HeaderBack from "src/components/HeaderBack";
import { AppText } from "src/components/Apptext";
import { images } from "src/assets/images";
import { cafeRoutes } from "src/feature/cafe/router/CafeRouter";
import { push } from "src/navigator/RootNavigation";
 
const Report = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Cài đặt`} />
      <View style={{ flex: 1 }}>
        
      </View>
    </View>
  );
};

export default Report;

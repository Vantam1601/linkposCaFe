import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import { cafeRoutes } from "src/feature/cafe/router/CafeRouter";
import normalize from "src/helpers/normalize";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { GET_MYSTORE, LOGOUT } from "../../auth/store/constants";
import ItemMenu from "../component/ItemMenu";

export interface ItemMenuInterface {
  name?: string;
  icon?: any;
  id: number;
  role: string[];
  screen?: string;
}

const listMenu = [
  {
    id: 1,
    name: "Thu Ngân",
    icon: images.thungan,
    role: ["admin"],
    screen: cafeRoutes.HomeCashier,
  },
  {
    id: 1,
    name: "Bán hàng",
    icon: images.banhang,
    role: ["admin"],
    screen: cafeRoutes.Home,
  },
  {
    id: 1,
    name: "Nhà bếp",
    icon: images.bep,
    role: ["admin"],
    screen: cafeRoutes.HomeKitChen,
  },
];
const Dashboard = () => {
  const user = useCurrentUser();
  const store = useSelector<RootStateReducer>((state) => state.auth.myStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_MYSTORE,
    });
  }, []);

  const LogOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const renderItem = ({ item, index }) => {
    return <ItemMenu key={index} item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: normalize(15),
              paddingVertical: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <AppText color={COLOR.main_color} fontSize={16}>
                {"Xin Chào"}
              </AppText>
              <AppText color={COLOR.main_color} fontSize={20} fontWeight="bold">
                {user?.username_user}
              </AppText>
            </View>
            <TouchableOpacity onPress={LogOut}>
              <AppText fontWeight="bold" color={COLOR.main_color} fontSize={16}>
                {"Logout"}
              </AppText>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
                source={images.logo}
              />
            </View>
            <FlatList
              style={{ paddingHorizontal: 10 }}
              data={listMenu}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});

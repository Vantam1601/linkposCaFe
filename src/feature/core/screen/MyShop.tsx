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
import normalize from "src/helpers/normalize";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { GET_MYSTORE, LOGOUT } from "../../auth/store/constants";
import ItemShop from "../component/ItemShop";
import { coreRoutes } from "../router/CoreRouter";

const MyShop = () => {
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
    return <ItemShop key={index} item={item} />;
  };

  const createStore = () => {
    push(coreRoutes.RegisterStepOne);
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
              {/* <Image
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
                source={images.logo}
              /> */}
              <TouchableOpacity
                style={{ marginVertical: 10 }}
                onPress={createStore}
              >
                <AppText fontWeight="bold" color={COLOR.black} fontSize={20}>
                  {"Đăng ký cửa hàng"}
                </AppText>
              </TouchableOpacity>
            </View>

            <FlatList
              style={{ paddingHorizontal: 10 }}
              data={store ? store : []}
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

export default MyShop;

const styles = StyleSheet.create({});

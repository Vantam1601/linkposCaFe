import React, { useEffect, useRef } from "react";
import {
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
import LoadingOverlay, {
  RefObject,
} from "../component/loadingPage/LoadingPage";
import { coreRoutes } from "../router/CoreRouter";

import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOut } from "nvquang-font-icon/pro-solid-svg-icons";

const MyShop = () => {
  const loading = useRef<RefObject>(null);
  const user = useCurrentUser();
  const store = useSelector<RootStateReducer>((state) => state.auth.myStore);
  const dispatch = useDispatch();
  useEffect(() => {
    loading.current?.toggleState(true);
    dispatch({
      type: GET_MYSTORE,
      callback: () => {
        loading.current?.toggleState(false);
      },
    });
  }, []);

  const LogOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const createStore = () => {
    push(coreRoutes.RegisterStepOne);
  };

  const onPress = (key: string) => {
    push(coreRoutes.ChooseShop, {
      key: key,
    });
  };

  const onPressProfile = () => {
    push(coreRoutes.Profile);
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
              <AppText
                onPress={onPressProfile}
                color={COLOR.main_color}
                fontSize={20}
                fontWeight="bold"
              >
                {user?.username_user}
              </AppText>
            </View>
            <TouchableOpacity onPress={LogOut}>
              <FontAwesomeIcon icon={faSignOut} size={20} color={COLOR.main_color} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ padding: 10 }}>
              {store?.staff?.staff?.length ? (
                <TouchableOpacity
                  onPress={() => onPress("staff")}
                  style={styles.buttonShop}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      resizeMode="contain"
                      source={images.user}
                    />
                    <AppText
                      style={{ marginTop: 10 }}
                      color="white"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {"Bắt đầu làm việc"}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => onPress("staff")}>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: 145,
                      }}
                      resizeMode="contain"
                      source={images.ads}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={styles.tinyLogo}
                  resizeMode="contain"
                  source={images.logo}
                />
              </View>

              {store?.staff?.shoper?.length ? (
                <TouchableOpacity
                  onPress={() => onPress("shoper")}
                  style={styles.buttonShop}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      resizeMode="contain"
                      source={images.shop}
                    />
                    <AppText
                      style={{ marginTop: 10 }}
                      color="white"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {"Của hàng của tôi"}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={createStore}
                  style={styles.buttonShop}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      resizeMode="contain"
                      source={images.shop}
                    />
                    <AppText
                      style={{ marginTop: 10 }}
                      color="white"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {"Đăng ký cửa hàng"}
                    </AppText>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      <LoadingOverlay ref={loading} />

      <TouchableOpacity onPress={createStore} style={[styles.container_icon]}>
        <Icon name="md-add" style={styles.icon2}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default MyShop;

const styles = StyleSheet.create({
  buttonShop: {
    backgroundColor: COLOR.main_color,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 125,
    height: 80,
    borderRadius: 12,
  },
  container_icon: {
    position: "absolute",
    right: 20,
    bottom: 44,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    width: 40,
    height: 40,
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    alignSelf: "center",
  },
});

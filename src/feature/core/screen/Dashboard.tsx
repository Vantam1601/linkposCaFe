import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
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
import LoadingOverlay, {
  RefObject,
} from "../component/loadingPage/LoadingPage";

import { httpClient } from "src/helpers/httpClient";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQrcode } from "nvquang-font-icon/pro-solid-svg-icons";

import { site_url, postAsync } from "src/helpers/config";
import Button from "src/components/Button";

export interface ItemMenuInterface {
  name?: string;
  icon?: any;
  id: number;
  role: string[];
  screen?: string;
}

const Dashboard = (props) => {
  const user = useCurrentUser();
  const loading = useRef<RefObject>(null);
  const store = useSelector<RootStateReducer>((state) => state.auth.myStore);
  const tokenStore = useSelector<RootStateReducer>(
    (state) => state.auth.tokenStore
  );
  const dispatch = useDispatch();
  const params = props.route.params;
  // alert(JSON.stringify(params));

  const [listMenu, setListMenu] = useState({
    checkin: 0,
  });
  //   [
  //   {
  //     id: 1,
  //     name: "Thu Ngân",
  //     icon: images.thungan,
  //     role: ["admin"],
  //     screen: cafeRoutes.HomeCashier,
  //   },
  //   {
  //     id: 2,
  //     name: "Bán hàng",
  //     icon: images.banhang,
  //     role: ["admin"],
  //     screen: cafeRoutes.Home,
  //   },
  //   {
  //     id: 3,
  //     name: "Nhà bếp",
  //     icon: images.bep,
  //     role: ["admin"],
  //     screen: cafeRoutes.HomeKitChen,
  //   },
  // ]

  // console.log(params);

  useEffect(() => {
    init();

    // alert(JSON.stringify(user));

    //load  role
    // loading.current?.toggleState(true);
    // dispatch({
    //   type: GET_MYSTORE,
    //   callback: () => loading.current?.toggleState(false),
    // });
  }, []);

  const init = async () => {
    loading.current?.toggleState(true);

    // let url = params.server+"/session_id.php?session_id="+params.access_token;
    // let url =
    //   "https://access.linkpos.top/session_id.php?session_id=" +
    //   params.access_token;
    // //

    // let res = await postAsync(url, {});

    let headers = { headers: {} };
    headers.headers["auth-token"] = tokenStore;
    // headers["auth-token"] = httpClient.mytoken;
    const res1 = await postAsync(
      "https://access.linkpos.top/action.php?a=client&confirm=permission_checkin",
      {},
      headers
    );
    console.log(res1.data);

    if (res1.data) {
      setListMenu(res1.data);

      loading.current?.toggleState(false);
    }
  };

  const onScan = () => {
    props.navigation.navigate("QRcode", {
      title: "Scan QR Code",
      lang: "en",
      handleDataQR: (code) => {},
    });
  };

  const renderItem = ({ item, index }) => {
    return <ItemMenu key={index} item={item} />;
  };

  const show_qrcode = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/5628/5628131.png",
          }}
          style={{ width: 125, height: 125 }}
        />
        <Text>Vui lòng quét mã để truy cập làm việc</Text>
        <Button
          style={{}}
          onPress={onScan}
          textStyle={{
            color: COLOR.textWhite,
            width: 215,
            textAlign: "center",
          }}
          text={"Quét mã"}
        />
      </View>
    );
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
                {"Cửa hàng"}
              </AppText>
              <AppText color={COLOR.main_color} fontSize={20} fontWeight="bold">
                {params?.shop}
              </AppText>
            </View>
            <TouchableOpacity onPress={onScan}>
              <FontAwesomeIcon icon={faQrcode} color={COLOR.main_color} />
            </TouchableOpacity>
          </View>
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
          <View style={{ flex: 1, justifyContent: "center" }}>
            {listMenu?.checkin ? (
              <FlatList
                style={{ paddingHorizontal: 10 }}
                data={listMenu?.menu}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, index) => `${index}`}
              />
            ) : (
              show_qrcode()
            )}
          </View>
        </View>
      </ImageBackground>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});

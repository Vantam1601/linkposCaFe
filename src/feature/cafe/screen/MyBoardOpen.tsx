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
import ItemMenu from "../../core/component/ItemMenu";
import LoadingOverlay, {
  RefObject,
} from "../../core/component/loadingPage/LoadingPage";

import { httpClient } from "src/helpers/httpClient";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQrcode } from "nvquang-font-icon/pro-solid-svg-icons";
import HeaderBack from "src/components/HeaderBack";
import { site_url, postAsync } from "src/helpers/config";
import Button from "src/components/Button";

export interface ItemMenuInterface {
  name?: string;
  icon?: any;
  id: number;
  role: string[];
  screen?: string;
}

const MyBoardOpen = (props) => {
  const user = useCurrentUser();
  const loading = useRef<RefObject>(null);
  const store = useSelector<RootStateReducer>((state) => state.auth.myStore);
  const tokenStore = useSelector<RootStateReducer>(
    (state) => state.auth.tokenStore
  );
  const dispatch = useDispatch();
  const params = props.route.params;
  //alert(JSON.stringify(params));

  const [listMenu, setListMenu] = useState([]);
 
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

    let server = user?.server?.linkpos?user?.server?.linkpos:"https://access.linkpos.top/";
     
    let headers = { headers: {} };
    headers.headers["auth-token"] = tokenStore; 
    const res1 = await postAsync(
      server+"/action.php?a=store&confirm=infomenu",
      {},
      headers
    );
    console.log(res1.data);

    if (res1.data) {
 
      let menu = Object.values(res1.data.list);
      menu.map((v,i)=>{
        v.onPress = function(){

           alert(JSON.stringify(v));
             props.navigation.navigate("QRcode", {
              title: "Quét mã QR Code để mở board làm việc",
              lang: "en",
              handleDataQR: (code) => {
                
                alert("Đang cập nhật");
              }
            });   
            
        };
      }); 

      setListMenu(menu);

      loading.current?.toggleState(false);
    }
  };

  const onScan = (item) => {
    alert(JSON.stringify(item));
    props.navigation.navigate("QRcode", {
      title: "Scan QR Code",
      lang: "en",
      handleDataQR: (code) => {

      },
    });
  };

  const renderItem = ({ item, index }) => {
    return <ItemMenu key={index} width={((index+1)%2==1 && listMenu.length-1==index?'100%':'48%')} item={item} />;
  };

  const show_qrcode = () => {
    return (
      <View style={{ alignItems: "center",marginBottom:16,padding:24 }}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/5628/5628131.png",
          }}
          style={{ width: 155, height: 155 }}
        />
        <Text>Bằng cách mở board làm việc đồng nghĩa là bạn đã chấm công vào ca thành công.</Text>
         
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <HeaderBack
        title={"Mở board làm việc"}
        
      />
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
         <View style={{ flex: 1, justifyContent: "center" }}>

          
         
          {show_qrcode()}
         
            {listMenu ? (
              <FlatList
                style={{ paddingHorizontal: 10 }}
                data={listMenu}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, index) => `${index}`}
              />
            ) : null}
     
        </View>
      </ImageBackground>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default MyBoardOpen;

const styles = StyleSheet.create({});

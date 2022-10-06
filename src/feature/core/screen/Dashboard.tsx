import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,SafeAreaView,
  TouchableOpacity,
  View,
  Text,Dimensions,ScrollView
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import FastImage from "src/components/FastImage";

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
import Geolocation from '@react-native-community/geolocation';

import { httpClient } from "src/helpers/httpClient";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQrcode } from "nvquang-font-icon/pro-solid-svg-icons";

import { site_url, postAsync } from "src/helpers/config";
import Button from "src/components/Button";
import { show_money } from "src/helpers/config";

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
  //alert(JSON.stringify(params));

  const [listMenu, setListMenu] = useState({
    checkin: 0,
    sell_total:0
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


    let headers = { headers: {} };
    headers.headers["auth-token"] = tokenStore; 
    const res1 = await postAsync(
      params.server+"/action.php?a=client&confirm=permission_checkin",
      {},
      headers
    );
    // console.log(res1.data);

    if (res1.data) {
      // alert(res1.data.type);

      res1.data.menu.map((v,i)=>{
        if(v.screen.match(/^https?:/ig)){
           v.onPress = function(){
              let a = v.screen+(v.screen.includes("?")?"?":"&")+"auth-token="+tokenStore;
      
                props.navigation.navigate("Webview", {
                  title:"Scan QR Code",
                  url:a,
                   
                });
            };
        }else if(v.screen=="ComingSoon"){
          v.icon = images.board;
          
          v.onPress = function(){
             props.navigation.navigate("ComingSoon");   
          };
        }
      });

      res1.data.report.map((v,i)=>{
        if(v.screen.match(/^https?:/ig)){
           v.onPress = function(){
              let a = v.screen+(v.screen.includes("?")?"?":"&")+"auth-token="+tokenStore;
      
                props.navigation.navigate("Webview", {
                  title:"Scan QR Code",
                  url:a,
                   
                });
            };
        }else if(v.screen=="ComingSoon"){
          v.icon = images.board;
          
          v.onPress = function(){
             props.navigation.navigate("ComingSoon");   
          };
        }
      });

      res1.data.manager.map((v,i)=>{
        if(v.screen.match(/^https?:/ig)){
           v.onPress = function(){
              let a = v.screen+(v.screen.includes("?")?"?":"&")+"auth-token="+tokenStore;
      
                props.navigation.navigate("Webview", {
                  title:"Scan QR Code",
                  url:a,
                   
                });
            };
        }else if(v.screen=="ComingSoon"){
          v.icon = images.board;
          
          v.onPress = function(){
             props.navigation.navigate("ComingSoon");   
          };
        }
      });

     
      setListMenu(res1.data); 

      loading.current?.toggleState(false);
    }
  };


  const go_scan = (gps)=>{
     props.navigation.navigate("QRcode", {
      title: "Quét mã chấm công ca làm việc",
      lang: "vi",
      handleDataQR: async(code) => {
          var items =  action =  data = null;
        try{
          items = JSON.parse(decodeURIComponent(code));
          action = code.action;
          data = code.token;
        }catch(e){
           var items = code.split(";");
           var action = items[0];
           var data = items[1];
        }
        
        
        // alert(action);
         let headers = { headers: {} };
         headers.headers["auth-token"] = tokenStore; 

        switch(action){
            
            case "FINGER":
 
              gps.qrcode = data;
              const res = await postAsync(
                params.server+"/action.php?a=finger&confirm=qrcode_check",
                gps,
                headers
              ); 

                  if (typeof res.data === "object") {
               
                      init(); 
                  } else {
                      alert(res.data);
                  }
         
            break;
            default :
              alert("Không tìm thấy yêu cầu.");
                
            break;
        }
      },
    });
  }

  const onScan = () => {
    Geolocation.getCurrentPosition((position) => {
      go_scan({lat:position.coords.latitude,lng:position.coords.longitude});
      
   }, (error) => alert("Vui lòng bật GPS"), { 
     enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
   }
);


    
  };

  const renderItem = ({ item, index }) => {
    // console.log(((index+1)%2==1 && listMenu?.menu.length-1==index?'100%':'48%'));
    return <ItemMenu key={index} width={((index+1)%2==1 && listMenu?.menu.length-1==index?'100%':'48%')} item={item} />;
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

  const show_action = ()=>{
    return <ScrollView style={{flex:1,paddingHorizontal: 10,marginVertical:10}}>
      <View style={{minHeight:100}}>
      <AppText style={{marginVertical: 8}} color={COLOR.main_color} fontSize={20} fontWeight="bold">
         Truy cập nhanh
      </AppText>
        <View style={{justifyContent: "space-around",alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
        {listMenu?.access?.map((v,index)=>{
           const w = Dimensions.get('window').width;
           const l = listMenu?.access.length>3?3:listMenu?.access.length;
           return <ItemMenu key={index} width={(w/l)-16} item={v} />;
        })}
        </View>
      </View>
      {listMenu?.isadmin?<>
        <AppText style={{marginVertical: 8}} color={COLOR.main_color} fontSize={20} fontWeight="bold">
         Báo cáo
      </AppText>
      <View style={{justifyContent: "space-around",alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
        {listMenu?.report?.map((v,index)=>{
           const w = Dimensions.get('window').width;
           const l = listMenu?.report.length>3?3:listMenu?.report.length;
           return <ItemMenu key={index} width={(w/l)-16} item={v} />;
        })}
        </View>
      <AppText style={{marginVertical: 8}} color={COLOR.main_color} fontSize={20} fontWeight="bold">
         Quản lý
      </AppText>
      <View style={{justifyContent: "space-around",alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
        {listMenu?.manager?.map((v,index)=>{
           const w = Dimensions.get('window').width;
           const l = listMenu?.manager.length>3?3:listMenu?.manager.length;
           return <ItemMenu key={index} width={(w/l)-16} item={v} />;
        })}
        </View>
       
      
      </>:<View style={{padding:16,justifyContent: "space-around",alignItems: "center",flexDirection: 'row' }}><Image resizeMode={"contain"} source={{uri:"https://dautu.giaiphap.xyz/public/images/landingpage/desktop/slide5.png"}} style={{marginTop:24,height:315,width:'95%'}} /></View>}
      
    </ScrollView>
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
        <View style={{ flex: 1}}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              
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
              <FontAwesomeIcon icon={faQrcode} size={20} color={COLOR.main_color} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center",marginTop:20,marginBottom:48}}>
             <AppText color={COLOR.main_color} fontSize={24}>
                {"Bảng điều khiển"}
              </AppText>
          </View>

          {listMenu?.isadmin?<View style={{  alignItems:'center',justifyContent: "center" }}>
              <View style={{ 
          backgroundColor: COLOR.white,
          borderRadius: 10,
          padding: 10,  alignItems:'center',justifyContent: "center" }}>
                <Text>Doanh thu hôm nay</Text>
                <Text style={{fontSize:14,fontWeight:'bold'}}>{show_money(listMenu?.sell_total?listMenu?.sell_total:0)}</Text>
            </View>
          </View>:null}

          <View style={{ flex: 1, justifyContent: "center" }}>
            {listMenu?.checkin ? show_action() : show_qrcode() }


          </View>
          <View style={{padding:16,justifyContent: "space-around",alignItems: "center",flexDirection: 'row' }}>
              <Button
              style={{}}
              onPress={()=>{
                props.navigation.goBack();
              }}
              textStyle={{
                color: COLOR.textWhite,
                width: '49%',
                textAlign: "center",
              }}
              text={"Về trang chủ"}
            />

            {listMenu?.permissions?.boardopen?<Button
              style={{}}
              onPress={()=>{
                props.navigation.navigate("MyBoardOpenAdmin");
              }}
              textStyle={{
                color: COLOR.textWhite,
                 width: '49%',
                textAlign: "center",
              }}
              text={"Mở board làm việc"}
            />:null}
          </View>
        </View>
      <SafeAreaView/>
      </ImageBackground>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});

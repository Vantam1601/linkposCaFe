import React, { memo, useRef,useEffect,useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,TouchableOpacity,
} from "react-native";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { COLOR } from "src/theme/color";
import InformationItem from "src/components/InformationItem";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
import BottomSheet from "src/components/BottomSheet";
import BottomShare from "src/components/BottomShare";
import HeaderBack from "src/components/HeaderBack";

import * as MyConfig from "src/helpers/config";


const { height } = Dimensions.get("window");

const InformationScreen = memo(() => {
  const sheetRefPersion = React.createRef<BottomSheet>();
  const user = useCurrentUser();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState<string>(user?.avatar?user?.avatar:"https://static.thenounproject.com/png/210732-200.png");
  console.log(user);
 

  const onNaviagter = (name: string) => {
    switch (name) {
      case "UpdateInformation":
        navigation.navigate(AppRoutes.UPDATE_INFORMATION);
        break;
      case "KYC":
        navigation.navigate(AppRoutes.VERIFICATION_KYC);
        break;
      case "VerificationPhone":
        navigation.navigate(AppRoutes.VERIFICATION_PHONE);
        break;
      case "VerificationEmail":
        navigation.navigate(AppRoutes.VERIFICATION_EMAIL);
        break;
      default:
        return;
    }
  };

  const onShare = () => {
    sheetRefPersion?.current?.open();
  };


  useEffect(() => {
   

  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack title={"label:information"} />
        <ScrollView style={{ backgroundColor: COLOR.white, flex: 1 }}>
          <View style={styles.viewMain}>
            <View style={styles.viewImageUser}>
              <TouchableOpacity onPress={()=>{ 

                MyConfig.upload({url:MyConfig.site_ajax_url("user.php?a=update_avatar"),before:function(img:any){
                  setAvatar(img);
                }}).then((res:any)=>{
                    console.log(res);
                    // setAvatar(res);    
                    
                });
              }}>
              <FastImagePlaceholder
                  needProgress
                  source={avatar}
                  // resizeMode="contain"
                  style={[styles.image]}
                />
               
              </TouchableOpacity>
            </View>
            <View style={styles.viewItem}>
              <InformationItem
                title={"label:referral_code"}
                stylesProps={{ backgroundColor: COLOR.bgDark_blue }}
                badeCode={user?.barcode}
                onPress={onShare}
              />
              <InformationItem
                title={"label:personal_information"}
                txtRight={
                  user?.verified ? "label:verification" : "label:unconfimred"
                }
                stylesProps={{ backgroundColor: COLOR.bgDark_blue }}
                onPress={() => onNaviagter("UpdateInformation")}
              />
              <InformationItem
                title={"label:kyc"}
                txtRight={
                  user?.cmnd ? "label:verification" : "label:unconfimred"
                }
                stylesProps={{ backgroundColor: COLOR.bgGreen }}
                onPress={() => onNaviagter("KYC")}
              />
              <InformationItem
                title={"label:phone"}
                txtRight={
                  user?.otp ? "label:verification" : "label:unconfimred"
                }
                stylesProps={{ backgroundColor: COLOR.bgPurple }}
                onPress={() => onNaviagter("VerificationPhone")}
              />
              <InformationItem
                title={"label:email"}
                // txtRight={user?.otp ? "translation:verification" : "translation:unconfimred"}
                txtRight={"label:unconfimred"}
                stylesProps={{ backgroundColor: COLOR.bgBlue }}
                onPress={() => onNaviagter("VerificationEmail")}
              />
            {/*
              <InformationItem
                title={"label:social_network"}
                // txtRight={user?.otp ? "translation:verification" : "translation:unconfimred"}
                txtRight={"label:unconfimred"}
                stylesProps={{ backgroundColor: COLOR.bgSilver_Gray }}
              />*/}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomShare sheetRefPersion={sheetRefPersion} heightProps={height / 2} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  viewText: {
    marginLeft: 20,
    justifyContent: "center",
  },
  viewMain: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  viewImageUser: {
    width: 80,
    height: 80,
    backgroundColor: "#CECECE",
    borderRadius: 80 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  viewItem: {
    marginTop: 12,
    marginHorizontal: 12,
  },
});

export default InformationScreen;

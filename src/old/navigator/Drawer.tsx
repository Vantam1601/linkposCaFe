import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { COLOR } from "src/theme/color";
import { AppText } from "src/components/Apptext";
import { useTranslate } from "src/hooks/useTranslate";
import { HOT_LINE,LOGO } from "src/helpers/constants";
import { AppRoutes } from "./app-routes";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck } from "nvquang-font-icon/pro-light-svg-icons";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import i18next from 'i18next';
import { checkUrlSvg } from "src/helpers/constants";
 import { useCurrentUser } from "src/hooks/useCurrentUser";
import {site_url} from "src/helpers/config";

export const CustomDrawerContent = (props: any) => {
  const user = useCurrentUser();

  // alert(user.username);
  const width = useWindowDimensions().width * 0.3;
  const intl = useTranslate();
  const navigation = useNavigation();
  const config: any = useTypedSelector((state) => state.app.appJson);
  
  var abc = config?config.menu.drawer:[];
  const onCallSupport = () => {
    Linking.openURL(`tel:${HOT_LINE}`);
  };

 
  const onCallbackMenu = (item:any) => {
    var page = item.page;
    var lang = i18next.language;
    if(page=="website"){
      // alert(JSON.stringify(item.params));
      navigation.navigate(AppRoutes.MYWEBVIEW, item.params);
    }else{
      navigation.navigate(item.page,item?.params);
    }
    // alert(item.page);
  };

  const allmenus= function(){
    // 
    var lang = i18next.language;

    return  abc.map((item:any,i:number)=>{
        return (
          <TouchableOpacity key={i.toString()} style={styles.vButton} onPress={() => onCallbackMenu(item)}
           >
           {checkUrlSvg(item.icon) ? ( <SvgUri width={25} height={25} uri={item?.icon} /> ) : (
              <Image
                style={styles.imgIcon}
                source={{ uri: item.icon }}
              />
            )}
            <AppText color={COLOR.textWhite} fontSize={15}>
              {
                item["title_"+lang]?item["title_"+lang]:item["title"]
              }
            </AppText>
          </TouchableOpacity>
        )
     })      
  };
  const menu_special = ()=>{

    if(user&& user?.username=="demo") return null;
    if(!config?.functions)return null;
        
    return <View>
      <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.WIFI)}
            >
              <Image
                style={styles.imgIcon}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/748/748151.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:wifi_free",
                })}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vButton}
              onPress={() =>{
                 navigation.navigate("Chat");
              }}
            >
              <Image
                style={{ width: 25, height: 25, marginRight: 15 }}
                source={{
                  uri:
                    "https://cdn-icons-png.flaticon.com/512/3069/3069058.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:chat",
                })}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vButton}
              onPress={() =>{
                 navigation.navigate("RootChat");
              }}
            >
              <Image
                style={{ width: 25, height: 25, marginRight: 15 }}
                source={{
                  uri:
                    "https://cdn-icons-png.flaticon.com/512/3069/3069058.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:chat App",
                })}
              </AppText>
            </TouchableOpacity>

    </View>
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: COLOR.bgDrawer }}
    >
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.bgDrawer, flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: COLOR.bgDrawer, flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.vLogo}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: LOGO,
              }}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <AppText fontSize={15} color={COLOR.textWhite} fontWeight={"500"}>
                {intl.formatMessage({ id: "label:hotline", })}
                {`: `}
              </AppText>
              <TouchableOpacity onPress={onCallSupport}>
                <AppText
                  fontSize={15}
                  color={COLOR.textWhite}
                  fontWeight={"600"}
                >
                  {`+${HOT_LINE}`}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.vListScreen}>

            <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.CHECK_IN)}
            >
              {/* <Image
                style={styles.imgIcon}
                source={{
                  uri: "https://cdn-icons.flaticon.com/png/512/3044/premium/3044391.png?token=exp=1635937292~hmac=cc27e21183c858d983edba613e41dea6",
                }}
              /> */}

              <FontAwesomeIcon
                icon={faCalendarCheck}
                color={COLOR.white}
                size={24}
                style={{ marginRight: 15}}
              ></FontAwesomeIcon>

              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:check_in",
                })}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.FEED_BACK)}
            >
              <Image
                style={styles.imgIcon}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/271/271045.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:feedback",
                })}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.FAQ)}
            >
              <Image
                style={styles.imgIcon}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/651/651009.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:faq",
                })}
              </AppText>
            </TouchableOpacity>
            
          
            <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.GAME)}
            >
              <Image
                style={{ width: 25, height: 25, marginRight: 15 }}
                source={{
                  uri:
                    "https://cdn-icons-png.flaticon.com/512/3069/3069058.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:game",
                })}
              </AppText>
            </TouchableOpacity>
            {menu_special()}
            {
              allmenus()
            }

            <TouchableOpacity
              style={styles.vButton}
              onPress={() => navigation.navigate(AppRoutes.CONTACT)}
            >
              <Image
                style={styles.imgIcon}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/88/88277.png",
                }}
              />
              <AppText color={COLOR.textWhite} fontSize={15}>
                {intl.formatMessage({
                  id: "label:contact",
                })}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vMain: {
    marginHorizontal: 10,
  },
  tinyLogo: {
    width: 95,
    height: 95,
    borderRadius: 12,
  },
  vLogo: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  vListScreen: {
    margin: 15,
  },
  imgIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
    tintColor: COLOR.white,
  },
  vButton: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});

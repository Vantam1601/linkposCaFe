import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,TouchableOpacity,Image
} from "react-native";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { AppRoutes } from "src/navigator/app-routes";
import { logoutAction } from "src/old/stores/auth/auth.actions";
import { COLOR } from "src/theme/color";
import ProfileItem from "./component/ProfileItem";
import AccountInfo from "./AccountInfo";
import AccountPoint from "./AccountPoint";
import {site_url} from "src/helpers/config";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import i18next from 'i18next';
import { useTranslate } from "src/hooks/useTranslate";
import { AppText } from 'src/components/Apptext';
import TextHeaderSimple from "src/components/TextHeader";

const { width } = Dimensions.get("window");

const ProfileScreen = memo(() => {
  const intl = useTranslate();

  const [enableNotification, setEnableNotification] = useState(false);

  const user = useCurrentUser();

  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  

  const logOut = () => {

    Alert.alert(intl.formatMessage({ id: "label:logout?", }), intl.formatMessage({ id: "label:Do you want to sign out?", }), [
      { text:   intl.formatMessage({ id: "label:Cancel", })},
      { text: intl.formatMessage({ id: "label:Confirm", }), onPress: () => handleLogout() },
    ]);
  };
  
  const handleLogout = () => {
    dispatch(logoutAction());
    navigation.reset({
      index: 0,
      routes: [{ name: AppRoutes.APP }],
    });
  };

  const onNaviagter = (name: string) => {
    switch (name) {
      case "Member":
        navigation.navigate(AppRoutes.MEMBER)
        break;
      case "Information":
        navigation.navigate(AppRoutes.INFORMATION)
        break;
      case "MemberGroup":
        navigation.navigate(AppRoutes.MEMBER_GROUP)
        break;
      case "WalletPoint":
        navigation.navigate(AppRoutes.WALLET_POINT)
        break;
      case "ChangePassword":
        navigation.navigate(AppRoutes.CHANGE_PASSWORD)
        break;
      case "Gift":
        navigation.navigate(AppRoutes.GIFT)
        break;
      case "ChangeOTP":
        navigation.navigate(AppRoutes.CHANGE_OTP)
        break;
      case "Language":
        navigation.navigate(AppRoutes.LANGUAGE)
        break;
      case "DeleteAccount":
        navigation.navigate(AppRoutes.DELETE_ACCOUNT)
        break;
      case "Login":
        navigation.navigate(AppRoutes.AUTH)
        break;

      case "history":
        navigation.navigate(AppRoutes.HISTORY_WORK)
        break;
      default:
        return;
    }

  }
  const onCallbackMenu = (item:any) => {
    var page = item.page;
    var lang = i18next.language;
    if(page=="website"){
      navigation.navigate("WebViewOpen", item.params);
    }else{
      navigation.navigate(item.page,item?.params);
    }
    // alert(item.page);
  };

  // var myaccount = [
  
  //     {
  //         "menu":[
  //             {
  //                 "icon":"",
  //                 "title":"",
  //                 "badge":"",
  //                 "page":""
  //             }
  //         ],
  //         "desc":"Desc",
  //         "desc_vi":"Mo ta"
  //     }
  // ];

  const config: any = useTypedSelector((state) => state.app.appJson);
  const menu_item = (v:any,lang:any)=>{
    return <View>
        
       
         <ProfileItem
                icon={v.icon}
                title={v["title_"+lang]?v["title_"+lang]:v["title"]}
                onPress={() => onCallbackMenu(v)} />
        </View>
      
  }
  const more_menu =()=>{
    var lang = i18next.language;
    
    if(config.menu && config.menu.myaccount){

     

           return  config.menu.myaccount.map((item:any)=>{
  

            if(item?.menu){
              
              let title = item["desc_"+lang]?item["desc_"+lang]:item["desc"];
               
               return  <View style={styles.viewItem}>
                 <View style={{paddingLeft:8}}>
                   <TextHeaderSimple size={15} title={title} /> 
                 </View>
                 {
                   item?.menu.map((n:any)=>{
                      return menu_item(n,lang);
                   })
                 } 
               </View>;
            }

            return 
               <View style={styles.viewItem}>{menu_item(item,lang)}</View>;
            
         })     
     }
    
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <AccountInfo />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          {user ?
            <View>
              <AccountPoint styleContainer={styles.itemContent} onPress={() => onNaviagter('Member')} />
              <View style={styles.viewItem}>
                <ProfileItem
                  icon={site_url("svg/info.png")}
                  title={"label:information"}
                  isBottom
                  onPress={() => onNaviagter('Information')}
                />
                <ProfileItem
                  icon={site_url("svg/members.png")}
                  title={"label:member_group"}
                  onPress={() => onNaviagter('MemberGroup')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/handshake.png")}
                  title={"label:invite_friends"}
                  isBottom
                />
                
              </View>
              <View style={styles.viewItem}>
                <ProfileItem
                  icon={site_url("svg/wallet.png")}
                  title={"label:point_wallet"}
                  onPress={() => onNaviagter('WalletPoint')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/discount.png")}
                  title={"label:promo_code"}
                  isBottom
                />
                <ProfileItem
                  icon={"https://cdn-icons-png.flaticon.com/512/2743/2743307.png"}
                  title={"label:gift"}
                  onPress={() => onNaviagter('Gift')}
                  isBottom
                />
                 <ProfileItem
                  icon={site_url("svg/saved.png")}
                  title={"history:saved"}
                  onPress={() => onNaviagter('history')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/liked.png")}
                  title={"history:liked"}
                  onPress={() => onNaviagter('history')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/viewed.png")}
                  title={"history:viewed"}
                  onPress={() => onNaviagter('history')}
                  isBottom
                />
              </View>
              {/*
                <ProfileItem
                  icon={site_url("svg/contracts.png"}
                  title={"label:friends_list"}
                />
<ProfileItem
                  icon={"https://cdn-icons-png.flaticon.com/128/743/743007.png"}
                  title={"label:my_ship"}
                />
              <View style={styles.viewItem}>
                
                <ProfileItem
                  icon={site_url("svg/otp.png"}
                  title={"label:code_otp"}
                  onPress={() => onNaviagter('ChangeOTP')}
                />
              </View>
  <View style={styles.viewItem}>
                <ProfileItem
                  icon={site_url("svg/beta.png"}
                  title={"label:test_beta"}
                />
              </View>
            */}
              <View style={styles.viewItem}>
                <ProfileItem
                  icon={site_url("svg/language.png")}
                  title={"label:language"}
                  onPress={() => onNaviagter('Language')}
                />
               
                <ProfileItem
                  icon={"https://cdn-icons-png.flaticon.com/128/1827/1827314.png"}
                  title={"label:notification"}
                  isSwitch={true}
                  switchValue={enableNotification}
                  onSwitch={() => setEnableNotification(!enableNotification)}
                />
              </View>
              
              {more_menu()}
              <View style={styles.viewItem}>
              <ProfileItem
                  icon={site_url("svg/password.png")}
                  title={"label:change_password"}
                  onPress={() => onNaviagter('ChangePassword')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/deleteacc.png")}
                  title={"label:delete_account"}
                  onPress={() => onNaviagter('DeleteAccount')}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/logout.png")}
                  title={"label:logout"}
                  onPress={logOut}
                />
              </View>
              
              <View style={{ height: 50 }} />
            </View>
            :
            <View>
              <View style={styles.viewItem}>
                <ProfileItem
                  icon={site_url("svg/language.png")}
                  title={"label:language"}
                  isBottom
                />
                <ProfileItem
                  icon={site_url("svg/logout.png")}
                  title={"label:login"}
                  onPress={() => onNaviagter('Login')}
                />
              </View>
              <View style={{ height: 50 }} />
            </View>

          }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContent: {
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    padding: 12,
    backgroundColor: COLOR.white,
    margin: 12,
    marginBottom: 0,
    borderRadius: 8
  },
  itemContentRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    padding: 12,
    backgroundColor: COLOR.white,
    margin: 12,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    backgroundColor: COLOR.white,
    margin: 12,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  viewBorderBottom: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 5,
    paddingVertical: 5,
    borderBottomColor: COLOR.borderGray
  },
  txtTitle: {
    marginLeft: 10,
    flex: 1,
    alignSelf: "center",
    marginBottom: 8
  },
  viewItem: {
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
  },
  vNoLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonLogin: {
    width: 100,
    marginTop: 10,
  },
});

export default ProfileScreen;

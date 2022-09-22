import { faArrowLeft } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
// import { BrandText } from "src/components/Text/BrandText";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import {
  faBars,
  faBell,
  faQrcode,
  faRing,
  faSearch,
} from "nvquang-font-icon/pro-solid-svg-icons";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { AppRoutes } from "src/navigator/app-routes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {statusBarHeight} from 'src/helpers/config';

type Props = {
  title?: String;
  noBack?: Boolean;
  isReady?: Boolean;
  titleRight?: String;
  hasShaddow?: Boolean;
  rightPress?: () => void;
  goBackFuntion?: () => void;
};
const HeaderHome = React.memo<Props>(
  ({ title, noBack, goBackFuntion, isReady, rightPress, titleRight }) => {
    const intl = useTranslate();
    const user = useCurrentUser();

    const navigation = useNavigation();

    const goToSearch = () => {
      navigation.navigate(AppRoutes.SEARCH);
    };

    const goToNotification = () => {
      navigation.navigate(AppRoutes.NOTIFICATION);
    };

    const goToQR = () => {
      navigation.navigate(AppRoutes.QRCODE);
    };

    const notification = useTypedSelector((state) => state.auth.notification);
    let H = statusBarHeight();
    let HH=0;
    if(Platform.OS === 'android'){
      //when full screen
      // H+=16;
       HH+=24;
    }
    return (
      <Animated.View
        style={[
          styles.topHeader,
          {
            height: normalize(48),
            ...Platform.select({
              ios: {
                shadowColor: COLOR.textGray,
                shadowOffset: {
                  height: normalize(2),
                  width: 0,
                },
                shadowRadius: normalize(2),
                shadowOpacity: normalize(0.5),
              },
              android: {
                elevation: normalize(0.5),
              },
            }),
          },
        ]}
      >
        <View style={{ flexDirection: "row",marginTop:H,marginBottom:HH }}>
          {!noBack ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.viewBack}
                onPress={() => navigation.openDrawer()}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  size={20}
                  style={{ color: COLOR.white, marginRight: normalize(6) }}
                />
              </TouchableOpacity>
              {user?.username ? (
                <View style={{ marginLeft: 7 }}>
                  <AppText
                    fontSize={normalize(12)}
                    fontWeight="600"
                    numberOfLines={1}
                    color={COLOR.white}
                  >
                    {intl.formatMessage({
                      id: "home:hello",
                    })}
                  </AppText>
                  <AppText
                    fontSize={normalize(16)}
                    fontWeight="600"
                    numberOfLines={1}
                    color={COLOR.white}
                  >
                    {user?.username}
                  </AppText>
                </View>
              ) : null}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            />
          )}
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText
              fontSize={normalize(18)}
              fontWeight="600"
              numberOfLines={1}
              color={COLOR.white}
            >
              {intl.formatMessage({
                id: title,
              })}
            </AppText>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.viewBack,
              {
                paddingLeft: 0,
                paddingRight: normalize(12),
                justifyContent: "flex-end",
              },
            ]}
            onPress={goToSearch}
          >
            <FontAwesomeIcon
              icon={faSearch}
              size={20}
              style={{ color: COLOR.white, marginRight: normalize(6) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.viewBack,
              {
                paddingLeft: 0,
                paddingRight: normalize(12),
                justifyContent: "flex-end",
              },
            ]}
            onPress={goToNotification}
          >
            <FontAwesomeIcon
              icon={faBell}
              size={20}
              style={{ color: COLOR.white, marginRight: normalize(6) }}
            />
            {notification?.new ? (
              <View
                style={{
                  backgroundColor: COLOR.blue,
                  position: "absolute",
                  width: 20,
                  height: 20,
                  left: 10,
                  top: 0,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppText color={COLOR.white} fontSize={12}>
                  {notification?.new}
                </AppText>
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.viewBack,
              {
                paddingLeft: 0,
                paddingRight: normalize(4),
                justifyContent: "center",
              },
            ]}
            onPress={goToQR}
          >
            <FontAwesomeIcon
              icon={faQrcode}
              size={20}
              style={{ color: COLOR.white, marginRight: normalize(6) }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      // </View>
    );
  }
);
const styles = StyleSheet.create({
  topHeader: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: COLOR.main_color,
    borderTopWidth: 0,
    // borderBottomRightRadius: 35
  },
  viewBack: {
    paddingTop: normalize(4),
    paddingBottom: normalize(4),
    borderRadius: normalize(14),
    alignItems: "center",
    paddingLeft: normalize(16),
    flexDirection: "row",
  },
  txtLabel: {
    color: COLOR.white,
    fontSize: 15,
    textAlignVertical: "center",
    fontWeight: "600",
    // marginLeft: 8,
    marginTop: statusBarHeight(),
  },
});
export default HeaderHome;

import { faArrowLeft, faShareAlt } from "nvquang-font-icon/pro-light-svg-icons";
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
import { AppText } from "./Apptext";
import {statusBarHeight} from 'src/helpers/config';

type Props = {
  title?: String;
  left?: any;
  icons?: any;
  goBack?: any;
};
const HeaderCommon = React.memo<Props>(
  ({ left,title, icons,goBack }) => {
    const intl = useTranslate();
    const navigation = useNavigation();
    const [widthVal] = React.useState(new Animated.Value(150));
    const [heightVal] = React.useState(new Animated.Value(40));

    //   React.useEffect(() => {
    //     Animated.timing(widthVal, {
    //       toValue: 116,
    //       duration: 600,
    //     }).start();
    //   }, [widthVal]);

    //   React.useEffect(() => {
    //     Animated.timing(heightVal, {
    //       toValue: 4,
    //       duration: 500,
    //     }).start();
    //   }, [heightVal]);
    const icons_render = ()=>{
      if(icons){
        return icons.map((v:any)=>{
           return <TouchableOpacity activeOpacity={0.6}
                style={[styles.viewBack,v.styles?v.styles:{}]}
                onPress={v.onPress?v.onPress:null}
              >
                {v.icon?v.icon:null}
              </TouchableOpacity>
        });
      }
    };
    const goToBack = () => {
      if (goBack) {
        goBack();
      } else {
        navigation.goBack();
      }
    };
    const left_icon = ()=>{
      return <View><TouchableOpacity activeOpacity={0.6} style={styles.viewBack} onPress={goToBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} style={{ color: COLOR.white, marginRight: normalize(6) }} />
        </TouchableOpacity></View>;
    }
    return (
      // <View>
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
        <View style={{ flexDirection: "row" }}>
          {left ? left_icon(): null}
          <View style={{
              flex:1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText fontSize={normalize(18)} fontWeight="600" numberOfLines={1} color={COLOR.white} >
              {intl.formatMessage({ id: title, })}
            </AppText>
          </View>
          <View style={{
              flex: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {icons_render()}
          </View>
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
    flex: 1,
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
export default HeaderCommon;

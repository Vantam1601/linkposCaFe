import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SvgUri } from "react-native-svg";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "src/components/Apptext";
import * as constants from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { checkUrlSvg } from "src/helpers/constants";
import { COLOR } from "src/theme/color";
import { AppRoutes } from "src/navigator/app-routes";
const widthS = Dimensions.get("window").width;
const widthContent = widthS - 0;

type Props = {
    data: any; 
};
const HomeCategory = React.memo<Props>(
    ({ data }) => {

  const intl = useTranslate();
  const navigation = useNavigation();

  const LIST_CATEGORY = data?data:[
  {
    id: 1,
    label: "category:short_term",
    icon: constants.URL+"svg/outside.svg",
    type: '1'
  },
  {
    id: 2,
    label: "category:flea_marker",
    icon: constants.URL+"svg/shop_outside.svg",
    type: '2'
  },
  {
    id: 3,
    label: "category:services",
    icon: constants.URL+"svg/service.svg",
    type: '3'
  },
  {
    id: 4,
    label: "category:store",
    icon: constants.URL+"svg/shop.svg",
    type: '4'
  },
  {
    id: 5,
    label: "category:eat",
    icon: constants.URL+"svg/fastfood.svg",
    type: '5'
  },
  {
    id: 6,
    label: "category:job",
    icon: constants.URL+"svg/job.png",
    type: '6'
  },
  {
    id: 7,
    label: "category:news",
    icon: constants.URL+"svg/event.svg",
    type: '7'
  },
  {
    id: 8,
    label: "category:sos",
    icon: constants.URL+"svg/emergency.svg",
    type: '8'
  },
];


  const onNavigater = (item: any) => {
    

    switch (item?.type) {
      case '1':
        navigation.navigate(AppRoutes.NEED_SHORT_TERM, {
          titleDad: item?.label,
          typeCategory: 'short-term',
        })
        break;
      case '2':
        navigation.navigate(AppRoutes.NEED_OUTSITE_MARKET, {
          titleDad: item?.label,
          typeCategory: 'flea_marker',
          lisVertical: true
        })
        break;
      
      case '5':
        navigation.navigate(AppRoutes.NEED_EAT, {
          titleDad: item?.label,
          typeCategory: 'eat',
          listHorizontal: true
        })
        break;
      case '6':
        navigation.navigate(AppRoutes.NEEDJOB, {})
        break
      case '3':
        navigation.navigate(AppRoutes.SERVICE_CATEGORY_VERTICAL, {
          titleDad: item?.label,
          typeCategory: 'services'
        })
        break;
      case '4':

        navigation.navigate(AppRoutes.STORE_CATEGORY, {
          titleDad: item?.label,
          typeCategory: 'flea_marker'
        })
        break;
      case '7':
        navigation.navigate(AppRoutes.LIST_NEW_EVENT, {
          titleDad: item?.label,
          typeCategory: 'news',
          listHorizontal: true
        })
        break
      case '8':
        navigation.navigate(AppRoutes.LIST_EMERGENCY, {
          titleDad: item?.label,
          typeCategory: 'sos',
          listHorizontal: true
        })
        break
      default:
        return;
    }
  };
  return (
    <View style={[styles.container]}>
      <FlatList
        numColumns={4}
        data={LIST_CATEGORY}
        renderItem={({ item, index }) => {
          let a:any = {};
          let color:any = {};

          switch (item.id) {
            case 1:
            case 2:
            case 5:
            case 6:
              a.borderWidth=4;
              a.borderColor=COLOR.main_color;
              a.borderRadius=50;

              color.color =COLOR.main_color;
            break;
          }
          return (
            <TouchableOpacity activeOpacity={0.6} style={styles.item} onPress={() => onNavigater(item)}>
               {checkUrlSvg(item.icon) ? (
                <View><SvgUri width={50} height={50} uri={item?.icon} /></View>
              ) : (
                <Image style={[{ width: 50, height: 50 }]} source={{ uri: item.icon }} />
              )}

              <AppText style={color}>
                {intl.formatMessage({
                  id: item.label,
                })}
              </AppText>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item?.id.toString()}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: COLOR.white,
    marginTop: 8,
  },
  item: {
    width: widthContent / 4,
    height: widthContent / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeCategory;

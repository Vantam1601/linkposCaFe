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
import { useTranslate } from "src/hooks/useTranslate";
import { checkUrlSvg } from "src/helpers/constants";
import { COLOR } from "src/theme/color";
import { AppRoutes } from "src/navigator/app-routes";
import {site_url} from "src/helpers/config";

const widthS = Dimensions.get("window").width;
const widthContent = widthS - 0;
const LIST_CATEGORY = [
  {
    id: 1,
    title: "home:lease",
    image: site_url("images/cate/cho-thue"),
    type: '1'
  },
  {
    id: 2,
    title: "home:repair",
    image: site_url("images/cate/sua-chua"),
    type: '2'
  },
  {
    id: 3,
    title: "home:design_drawings",
    image: site_url("images/cate/thiet-ke-ban-ve"),
    type: '3'
  },
  {
    id: 4,
    title: "home:education'",
    image: site_url("images/cate/giao-duc"),
    type: '4'
  },
  {
    id: 5,
    title: "home:media",
    image: site_url("images/cate/truyen-thong"),
    type: '5'
  },
  {
    id: 6,
    title: "home:finance_bankink",
    image: site_url("images/cate/tai-chinh-ngan-hang"),
    type: '6'
  },
  {
    id: 7,
    title: "home:job",
    image: site_url("images/cate/viec-lam"),
    type: '7'
  },
  {
    id: 8,
    title: "home:information_technology",
    image: site_url("images/cate/cong-nghe-thong-tin"),
    type: '8'
  },
  {
    id: 9,
    title: "home:advise",
    image: site_url("images/cate/tu-van"),
    type: '9'
  },
  {
    id: 10,
    title: "home:beautify",
    image: site_url("images/cate/lam-dep"),
    type: '10'
  },
  {
    id: 11,
    title: "home:entertain",
    image: site_url("images/cate/giai-tri"),
    type: '11'
  },
  {
    id: 12,
    title: "home:construct",
    image: site_url("images/cate/xay-dung"),
    type: '12'
  },
  {
    id: 13,
    title: "home:hire_transportation",
    image: site_url("images/cate/van-chuyen-thue"),
    type: '13'
  },
  {
    id: 14,
    title: "home:health",
    image: site_url("images/cate/suc-khoe"),
    type: '14'
  },
  {
    id: 15,
    title: "home:travel",
    image: site_url("images/cate/du-lich"),
    type: '15'
  },
  {
    id: 16,
    title: "home:other_services",
    image: site_url("images/cate/dich-vu-khac"),
    type: '16'
  },
];

interface Props {
  data?: any,
  onPress?: any
}
const ListCastHorizontal = React.memo((props: Props) => {
  const { data, onPress } = props;
  const intl = useTranslate();
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        // data={data?.cate}
        data={LIST_CATEGORY}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity activeOpacity={0.6} style={[styles.item, { marginLeft: index === 0 ? 10: 0,  marginRight: 10 }]} onPress={() => onPress(item)}>
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: item.image }}
                resizeMode="stretch"
              />
              <AppText style={{ marginTop: 15, fontSize: 15, textAlign: 'center', position: 'absolute', bottom: 5 }}>
                {intl.formatMessage({
                  id: item?.title,
                })}
              </AppText>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 8,
    marginTop: 8,
  },
  item: {
    borderRadius:12,
    borderWidth:1,
    borderColor: COLOR.borderWhiteGray,
    // borderTopWidth:1, 
    // borderLeftWidth:1,
    // borderRightWidth:1,
    paddingVertical: 20,

    width: widthContent / 3,
    height: widthContent / 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ListCastHorizontal;

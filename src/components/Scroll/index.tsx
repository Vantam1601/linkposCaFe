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
import {
  checkUrlSvg,
  sortListItemByDate,
  TypeItem,
} from "src/helpers/constants";
import { COLOR } from "src/theme/color";
import BoxItem from "src/screens/need/component/Box";
import { AppRoutes } from "src/navigator/app-routes";

import { time } from "src/helpers/config";

const widthS = Dimensions.get("window").width;
const widthContent = widthS - 20;
/*
<ScrollDemo 
                data={data?.relatives?.reverse()} title={"Liên quan"} renderItem={(item:any)=>{

                   return <AppText>{item?.title}</AppText>;
                }} />
 */
const Scroll = React.memo((props:any) => {
    const { data, renderItem, viewMore = false, title } = props;

    const intl = useTranslate();
    const navigation = useNavigation();
  
    return (
      <View style={[styles.container]}>
        <View style={styles.viewTitle}>
          <View style={styles.viewLeftLable}></View>
          <AppText style={styles.title}>{title}</AppText>
        </View>

         <FlatList
          data={sortListItemByDate(data)}
          horizontal
          renderItem={({ item, index }: any) => {
            return renderItem(item);
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={true}
        />
        
      </View>
    );
  }
);
const styles = StyleSheet.create({
  viewLeftLable: {
    backgroundColor: COLOR.main_color,
    width: 4,
    height: 16,
    marginRight: 4,
  },
  viewTitle: {
    marginBottom: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    width: widthContent,
marginBottom:10,
    marginTop:10,
    borderRadius: 6,
  }
   
});
export default Scroll;
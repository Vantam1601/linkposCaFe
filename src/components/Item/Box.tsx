import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { renderPrice, renderTextTypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { FeatureNeed } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage";
const widthS = Dimensions.get("window").width;

const WIDTH_ITEM = (widthS - 40) / 1.8;
interface Props {
  item?: FeatureNeed;
  index: number;
  onPress?: any; 
}
const BoxItem = memo(({ item, index, onPress }: Props) => {
  const intl = useTranslate();
  const formatArrayImage = () => {
    try {
      if (item?.gallery) {
        const arr = JSON.parse(item?.gallery)
        if (arr && arr.length) {
          return arr[0]
        }
      }
  
      return item?.image
    } catch (error) {
      return item?.image
    }
  }
  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.container, { marginLeft: index !== 0 ? 10 : 0 }]} onPress={() => onPress(item)}>
      <FastImagePlaceholder style={styles.image} source={formatArrayImage()} />
      
      <View style={styles.content}>
        <AppText numberOfLines={1} style={styles.title}>
          {item?.title}
        </AppText>
        <AppText style={styles.price}>Giá: {renderPrice(item)}</AppText>
        <AppText style={styles.address}>
          {item?.district + ", " + item?.province}
        </AppText>
      </View>
      <View
        style={[
          styles.viewType,
          { backgroundColor: renderTextTypeItem(item)?.color },
        ]}
      >
        <AppText fontSize={11} color={COLOR.white}>{renderTextTypeItem(item)?.label}</AppText>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  viewType: {
    padding: 2,
    position: "absolute",
    top: 10,
    left: 15,
  },
  content: {
    margin: 10,
    marginTop: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    width: WIDTH_ITEM - 20,
  },
  price: {
    fontSize: 12,
    width: WIDTH_ITEM - 20,
  },
  address: {
    fontSize: 12,
    width: WIDTH_ITEM - 20,
    color: COLOR.gray,
  },
  container: {
    width: WIDTH_ITEM,
    height: WIDTH_ITEM + 60,
    backgroundColor: COLOR.white,
    alignItems: "center",
    borderRadius: 8,
    paddingTop: 10,
  },
  image: {
    width: WIDTH_ITEM - 20,
    height: WIDTH_ITEM - 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default BoxItem;

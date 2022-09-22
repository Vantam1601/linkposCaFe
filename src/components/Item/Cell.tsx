import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { renderPrice, renderTextTypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { FeatureNeed } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage"; 

const widthS = Dimensions.get("window").width;

const WIDTH_ITEM = widthS - 20;
interface Props {
  item?: FeatureNeed;
  index: number;
  onPress?: any;
  length?: number
}
const CellItem = memo(({ item, index, onPress,length }: Props) => {
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
    <TouchableOpacity activeOpacity={0.6} style={[styles.container]} onPress={() => onPress(item)}>
      <FastImagePlaceholder
        style={styles.image}
        source={formatArrayImage()}
      />
      <View style={styles.content}>
        <AppText numberOfLines={1} style={styles.title}>
          {item?.title}
        </AppText>
        {item?.description?<Text numberOfLines={3} style={[styles.address,{flex:1}]}>
          {decodeURIComponent(item?.description)}
        </Text>:null}
      </View>
      <View style={[
          styles.viewType,
          { backgroundColor: renderTextTypeItem(item)?.color },
        ]}
      >
        <AppText fontSize={11} color={COLOR.white}>
          {renderTextTypeItem(item)?.label}
        </AppText>
      </View>
      <FontAwesomeIcon
        color={COLOR.gray}
        icon={faChevronRight}
        size={14}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  viewType: {
    padding: 2,
    position: "absolute",
    top: 4,
    left: 6,
  },
  content: {
    margin: 10,
    marginTop: 6,
    flex: 1,
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
    height: 70,
    backgroundColor: COLOR.white,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 6,
    marginBottom: 5,
    borderRadius: 6
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default CellItem;

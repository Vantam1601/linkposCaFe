import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { renderPrice, renderTextTypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { ListPromotion } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage";
const widthS = Dimensions.get("window").width;

const WIDTH_ITEM = widthS - 20;
interface Props {
  item?: ListPromotion;
  index: number;
  onPress?: any
}
const CellHorizontalItem = memo(({ item, index, onPress }: Props) => {
  const intl = useTranslate();
  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.container]} onPress={() => onPress(item)}>
      <View style={styles.vTxtPromotion}>
        <AppText fontSize={13} fontWeight={'500'} color={COLOR.textWhite}>
          {item?.percent}{'%'}
        </AppText>
      </View>
      <View style={styles.vMain}>
        <FastImagePlaceholder
          style={styles.image}
          source={item?.image}
        />
        <View style={styles.content}>
          <AppText numberOfLines={3} style={styles.title}>
            {item?.title}
          </AppText>
          <AppText style={styles.address}>
            {'Hiệu lưc: '} {item?.timer}
          </AppText>
        </View>
        <FontAwesomeIcon
          color={COLOR.gray}
          icon={faChevronRight}
          size={14}
          style={{ marginRight: 10 }}
        />
      </View>
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
    width: WIDTH_ITEM - 130,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    // width: WIDTH_ITEM - 20,
  },
  price: {
    fontSize: 12,
    width: WIDTH_ITEM - 20,
  },
  address: {
    fontSize: 12,
    width: WIDTH_ITEM - 20,
    color: COLOR.black,
  },
  container: {
    width: WIDTH_ITEM,
    height: 70,
    backgroundColor: COLOR.white,
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: 6,
    marginVertical: 4,
    borderRadius: 8,
  },
  vMain: {
    alignItems: "center",
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 8,
    zIndex: 0
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
  vTxtPromotion: {
    padding: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.bgOrange,
    zIndex: 1,
  }
});

export default CellHorizontalItem;

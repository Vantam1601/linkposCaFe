import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR } from "src/theme/color";
import { AppText } from "src/components/Apptext";
import { show_money } from "src/helpers/config";

interface Props {
  data: any[];
  total: number;
}
const ProductOrder = ({ data, total }: Props) => {
  const renderProduct = (item, index) => {
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{index}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{item.title}</AppText>
        </View>
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{item.quantity ?? 1}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{show_money(item.price)}</AppText>
        </View>
      </View>
    );
  };
  const renderRowTitle = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{"STT"}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{"Menu"}</AppText>
        </View>
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{"Số lượng"}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{"Thành tiền"}</AppText>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: COLOR.bgWhite,
        borderRadius: 10,
      }}
    >
      <ScrollView>
        {renderRowTitle()}
        {data?.map(renderProduct)}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <AppText fontWeight="bold">{"Thành tiền"}</AppText>
        <AppText fontWeight="bold">{show_money(total)}</AppText>
      </View>
    </View>
  );
};

export default ProductOrder;
const styles = StyleSheet.create({
  itemRow: {
    minWidth: 50,
    alignItems: "center",
  },
  itemRow2: {
    minWidth: 100,
    alignItems: "center",
  },
});

import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import { navigate, push, replace } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CafeStackParamList } from "../../router/CafeNavigator";
import { cafeRoutes } from "../../router/CafeRouter";
import { DELETE_BILL_ORDER, LOAD_CART_TABLE } from "../../store/constants";
import { useNavigation } from "@react-navigation/native";
import { show_money } from "src/helpers/config";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Detail> {}
const DetailOrder = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);

  const dataOrder = useSelector<RootStateReducer>(
    (state) => state.cafe.cart?.[`tb_${props.route.params.id}`]
  );

  React.useEffect(() => {
    loading.current?.toggleState(true);
    dispatch({
      type: LOAD_CART_TABLE,
      payload: props.route.params.id,
      callback: () => loading.current?.toggleState(false),
    });
  }, []);

  const renderCaller = (caller: any) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText fontWeight="bold" fontSize={16}>
          {"Người gọi: "}
          <AppText fontSize={16} fontWeight="bold">
            {caller?.fullname}
          </AppText>
        </AppText>
        <AppText>
          {"Giờ: "}
          {caller.track?.[0]?.date.split(" ")?.[1] || ""}
        </AppText>
      </View>
    );
  };

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
          <AppText fontWeight="bold">{index + 1}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{item.title}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{show_money(item.price)}</AppText>
        </View>
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{item.quantity ?? 1}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{item?.note ?? ""}</AppText>
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
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{"Giá"}</AppText>
        </View>
        <View style={[styles.itemRow]}>
          <AppText fontWeight="bold">{"Số lượng"}</AppText>
        </View>
        <View style={[styles.itemRow2]}>
          <AppText fontWeight="bold">{"Ghi chú"}</AppText>
        </View>
      </View>
    );
  };

  const renderTrackOrder = ({ item, index }: { item: any; index: number }) => {
    const { products } = item;
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 10,
          borderColor: COLOR.borderGray,
          padding: 5,
        }}
      >
        {renderCaller(item)}
        <ScrollView horizontal>
          <View>
            {renderRowTitle()}
            {products?.map(renderProduct)}
          </View>
        </ScrollView>
      </View>
    );
  };

  const data = Object.values(dataOrder?.track_order ?? {});

  const onPressOrder = () => {
    navigation.goBack();
    push(cafeRoutes.Order, {
      item: {
        id: dataOrder.id,
        name: dataOrder.name,
        id_region: dataOrder.id_region,
      },
    });
  };

  const onPressChangeTableOrder = () => {
    replace(cafeRoutes.ChangeTable, {
      item: {
        id: dataOrder.id,
        name: dataOrder.name,
        id_region: dataOrder.id_region,
      },
    });
  };

  const onPressDeleteBillOrder = () => {
    dispatch({
      type: DELETE_BILL_ORDER,
      payload: {
        id: dataOrder.id,
      },
      callback: navigation.goBack(),
    });
  };

  const onPressBill = () => {
    push(cafeRoutes.Bill, {
      item: dataOrder,
    });
  };

  const renderFooter = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View style={{ paddingHorizontal: 5, width: "50%" }}>
            <Button
              onPress={onPressChangeTableOrder}
              textStyle={{ color: COLOR.textWhite }}
              text={"Chuyển bàn"}
            />
          </View>
          <View style={{ paddingHorizontal: 5, width: "50%" }}>
            <Button
              type={"danger"}
              onPress={onPressDeleteBillOrder}
              textStyle={{ color: COLOR.textWhite }}
              text={"Huỷ bàn"}
            />
          </View>
          <View style={{ paddingHorizontal: 5, width: "50%" }}>
            <Button
              onPress={onPressOrder}
              type={"info"}
              textStyle={{ color: COLOR.textWhite }}
              text={"Thêm món"}
            />
          </View>
          <View style={{ paddingHorizontal: 5, width: "50%" }}>
            <Button
              type={"success"}
              onPress={onPressBill}
              textStyle={{ color: COLOR.textWhite }}
              text={"Thanh toán"}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Chi tiết`} />

      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLOR.borderGray,
            backgroundColor: COLOR.white,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <FlatList
            data={data || []}
            renderItem={renderTrackOrder}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View
            style={{
              padding: 10,
              backgroundColor: COLOR.white,
              borderWidth: 1,
              borderColor: COLOR.borderGray,
            }}
          >
            <AppText fontSize={20}>
              {"Thành tiền : "}
              <AppText fontSize={20} fontWeight="bold">
                {show_money(dataOrder?.total)}
              </AppText>
            </AppText>
          </View>
          {renderFooter()}
        </View>
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default DetailOrder;

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

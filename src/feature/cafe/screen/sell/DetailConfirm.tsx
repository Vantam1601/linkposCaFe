import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import ToggleSwitch from "toggle-switch-react-native";
import { CafeStackParamList } from "../../router/CafeNavigator";
import { cafeRoutes } from "../../router/CafeRouter";
import {
  KITCHEN_CONFIRM_BEFORE_OK,
  KITCHEN_CONFIRM_DELETE_ITEM,
  KITCHEN_CONFIRM_ITEM,
  KITCHEN_CONFIRM_OK,
} from "../../store/constants";

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.DetailConfirm> {}
const DetailConfirm = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);
  const tables =
    useSelector<RootStateReducer>((state) => state.cafe.cartKitchen) || [];
  const dataOrder = tables.find((item) => item.id === props.route.params.id);

  const onConfirmItem = (index) => {
    loading.current?.toggleState(true);
    dispatch({
      type: KITCHEN_CONFIRM_ITEM,
      payload: {
        id: dataOrder.id,
        id_table: dataOrder.id_table,
        index,
      },
      callback: () => {
        loading.current?.toggleState(false);
      },
    });
  };

  const onDeleteItem = (index) => {
    loading.current?.toggleState(true);
    dispatch({
      type: KITCHEN_CONFIRM_DELETE_ITEM,
      payload: {
        id: dataOrder.id,
        id_table: dataOrder.id_table,
        index: index,
        note: "",
      },
      callback: () => {
        loading.current?.toggleState(false);
      },
    });
  };

  const renderProduct = ({ item, index }) => {
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
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{index+1}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.title}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.note}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.quantity ?? 1}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          {item && item?.confirmed === 1 ? (
            <AppText>{"Xác nhận"}</AppText>
          ) : (
            <ToggleSwitch
              isOn={item && item?.confirmed === 1}
              onColor={COLOR.main_color}
              offColor={COLOR.gray}
              size="medium"
              onToggle={() => onConfirmItem(index)}
            />
          )}
        </View>
        <View style={[styles.itemColumn]}>
          <TouchableOpacity onPress={() => onDeleteItem(index)}>
            <AppText fontWeight="bold" color={COLOR.error}>
              {"Xoá"}
            </AppText>
          </TouchableOpacity>
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
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"STT"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Menu"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Ghi chú"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"SL"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Xong?"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Action"}</AppText>
        </View>
      </View>
    );
  };

  const onPressBeforeOk = () => {
    loading.current?.toggleState(true);
    dispatch({
      type: KITCHEN_CONFIRM_BEFORE_OK,
      payload: {
        id: dataOrder.id,
        id_table: dataOrder.id_table,
      },
      callback: () => {
        loading.current?.toggleState(false);
      },
    });
  };

  const onPressOk = () => {
    loading.current?.toggleState(true);
    dispatch({
      type: KITCHEN_CONFIRM_OK,
      payload: {
        id: dataOrder.id,
        id_table: dataOrder.id_table,
        tray: 3,
      },
      callback: () => {
        props.navigation.goBack();
        loading.current?.toggleState(false);
      },
    });
  };

  const renderFooter = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dataOrder?.status === "kitchen" && (
            <View style={{ paddingHorizontal: 5, width: "50%" }}>
              <Button
                onPress={onPressBeforeOk}
                type={"info"}
                textStyle={{ color: COLOR.textWhite }}
                text={"Xác nhận"}
              />
            </View>
          )}

          <View style={{ paddingHorizontal: 5, width: "50%" }}>
            <Button
              type={"success"}
              onPress={onPressOk}
              textStyle={{ color: COLOR.textWhite }}
              text={"Hoàn thành"}
            />
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Chi tiết - ${dataOrder.name}`} />

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
            data={
              Array.isArray(dataOrder?.products)
                ? dataOrder?.products
                : Object.values(dataOrder?.products) || []
            }
            ListHeaderComponent={renderRowTitle}
            renderItem={renderProduct}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>{renderFooter()}</View>
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default DetailConfirm;

const styles = StyleSheet.create({
  itemColumn: {
    alignItems: "center",
    flex: 1,
    minHeight: 50,
  },
  itemRow: {
    minWidth: 50,
    alignItems: "center",
  },
  itemRow2: {
    minWidth: 100,
    alignItems: "center",
  },
});

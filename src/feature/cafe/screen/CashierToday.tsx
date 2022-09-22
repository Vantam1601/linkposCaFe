import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import ToggleSwitch from "toggle-switch-react-native";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";

import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { format_money, show_money } from "src/helpers/config";
import {
  CASHIER_CONFIRM_OUTLET_GENARE,
  GET_CASHIER_TODAY,
} from "../store/constants";

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Cashier> {}
const CashierToday = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);
  const data =
    useSelector<RootStateReducer>((state) => state.cafe.listToday) || [];

  const price = React.useMemo(() => {
    let total = 0;
    if (data.length > 0) {
      data.map((item) => {
        total += Number(item.total);
      });
    }
    return total;
  }, []);

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    loading.current?.toggleState(true),
      dispatch({
        type: GET_CASHIER_TODAY,
        callback: () => loading.current?.toggleState(false),
      });
  };

  const onConfirmItem = (item) => {
    loading.current?.toggleState(true),
      dispatch({
        type: CASHIER_CONFIRM_OUTLET_GENARE,
        payload: {
          id_inv: item.id_inv,
        },
        callback: () => {
          onRefresh();
          loading.current?.toggleState(false);
        },
      });
  };

  const onPressItem = (item) => {
    push(cafeRoutes.DetailCashierOutlet, {
      id: item.id_inv,
    });
  };

  const renderProduct = ({ item, index }) => {
    const log = JSON.stringify(item?.log ?? "{}");
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
          <AppText fontWeight="bold">{index}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText
            onPress={() => onPressItem(item)}
            color={COLOR.txtGreen}
            fontWeight="bold"
          >
            #{item.barcode}
            {`\n${item.status}`}
          </AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.name}</AppText>
        </View>

        <View style={[styles.itemColumn]}>
          {item && item?.confirmed ? (
            <AppText fontWeight="bold">{item.confirmed}</AppText>
          ) : (
            <ToggleSwitch
              isOn={item && item?.confirmed === 1}
              onColor={COLOR.main_color}
              offColor={COLOR.gray}
              size="medium"
              onToggle={() => onConfirmItem(item)}
            />
          )}
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.fullname}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.completed_date}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.total)}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.note}</AppText>
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
          <AppText fontWeight="bold">{"Mã ĐH"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Vị trí"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Xác nhận thu tiền"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Nhân viên"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Ngày"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Tổng tiền"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Ghi chú"}</AppText>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return <View>{renderRowTitle()}</View>;
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Cashier`} />
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
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={[styles.itemMenu]}>
              <AppText fontWeight="bold">{"Tiền mặt"}</AppText>
              <AppText color={COLOR.txtGreen} fontWeight="bold">
                {show_money(price)}
              </AppText>
            </View>
            <View style={[styles.itemMenu]}>
              <AppText fontWeight="bold">{"Doanh thu"}</AppText>
            </View>
            <View style={[styles.itemMenu]}>
              <AppText fontWeight="bold">{"Phụ thu"}</AppText>
            </View>
          </View>
          <ScrollView horizontal>
            <FlatList
              data={data || []}
              ListHeaderComponent={renderHeader}
              renderItem={renderProduct}
              keyExtractor={(item) => `${item.barcode}`}
              ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
            />
          </ScrollView>
        </View>
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default CashierToday;

const styles = StyleSheet.create({
  itemColumn: {
    alignItems: "center",
    minHeight: 50,
    width: 100,
  },
  itemRow: {
    minWidth: 50,
    alignItems: "center",
  },
  itemRow2: {
    minWidth: 100,
    alignItems: "center",
  },
  itemMenu: {
    alignItems: "center",
    minHeight: 50,
    flex: 1,
  },
});

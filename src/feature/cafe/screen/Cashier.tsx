import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
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
import {
  CASHIER_CONFIRM_OUTLET_GENARE,
  CASHIER_OUTLET_GENARE,
  KITCHEN_CONFIRM_ITEM,
} from "../store/constants";
import { show_money } from "src/helpers/config";

interface ItemMenuProps {
  name: string;
  screen: string;
  icon: string;
}

const ItemMenu = (props: ItemMenuProps) => {
  const onPress = () => {
    push(props.screen);
  };
  return (
    <View key={props.name} style={{ width: "33.3%", height: 100, padding: 10 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: COLOR.bgWhite,
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          alignItems: "center",
          flex: 1,
          paddingTop: 10,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: COLOR.txtGreen,
          }}
          resizeMode="contain"
          source={props.icon}
        />
        <AppText
          fontSize={15}
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          {props.name}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Cashier> {}
const Cashier = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);
  const outlet =
    useSelector<RootStateReducer>((state) => state.cafe.config.outlet) || [];
  const tables =
    useSelector<RootStateReducer>((state) => state.cafe.outletCashier) || [];

  React.useEffect(() => {
    onRefresh();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: CASHIER_OUTLET_GENARE,
        payload: {
          id_outlet: outlet?.id_outlet,
        },
      });
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({
      type: CASHIER_OUTLET_GENARE,
      callback: setRefreshing(false),
      payload: {
        id_outlet: outlet?.id_outlet,
      },
    });
  };

  const onConfirmItem = (item) => {
    loading.current?.toggleState(true),
      dispatch({
        type: CASHIER_CONFIRM_OUTLET_GENARE,
        payload: {
          id_inv: item.id_inv,
        },
        callback: () => loading.current?.toggleState(false),
      });
  };

  const onPressItem = (item) => {
    push(cafeRoutes.DetailCashierOutlet, {
      id: item.id_inv,
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
          <AppText fontWeight="bold">{index}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText
            onPress={() => onPressItem(item)}
            color={COLOR.txtGreen}
            fontWeight="bold"
          >
            {item.barcode}
          </AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.name}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.total)}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.completed_date}</AppText>
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
              onToggle={() => onConfirmItem(item)}
            />
          )}
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
          <AppText fontWeight="bold">{"Bàn"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Tổng tiền"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Thời gian"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Xác nhận thu tiền"}</AppText>
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
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <ItemMenu
              name={"TẮT MENU BÁN"}
              icon={images.report}
              screen={cafeRoutes.ConfigMenu}
            />
            <ItemMenu
              name={"ĐƠN HÀNG"}
              icon={images.report}
              screen={cafeRoutes.CashierToday}
            />
            <ItemMenu
              name={"GỌI NHÂN VIÊN"}
              icon={images.report}
              screen={cafeRoutes.CallStaff}
            />
          </View>
          <ScrollView horizontal>
            <FlatList
              data={tables?.most_recent_inv_paid || []}
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

export default Cashier;

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
});

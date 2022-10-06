import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef,useState } from "react";
import { FlatList, ScrollView, StyleSheet, View,Text,SafeAreaView} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import ToggleSwitch from "toggle-switch-react-native";
import { CafeStackParamList } from "../../router/CafeNavigator";
import { cafeRoutes } from "../../router/CafeRouter";
import moment from "moment";

import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { show_money } from "src/helpers/config";
import {
  CASHIER_CONFIRM_OUTLET_GENARE,
  GET_CASHIER_TODAY,
} from "../../store/constants";

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Cashier> {}
const CashierToday = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);
  const data =
    useSelector<RootStateReducer>((state) => state.cafe.listToday) || [];
  const [price,setPrice] = useState(0);
 

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    loading.current?.toggleState(true),
      dispatch({
        type: GET_CASHIER_TODAY,
        callback: () => {
          loading.current?.toggleState(false);

          let total = 0;
          if (data.length > 0) {
            data.map((item) => {
              total += (item.after_total?item.after_total:item.total)*1;
            });
          }

          setPrice(total);
        }
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
 
    push("DetailOrder", {
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
          <AppText fontWeight="bold">{index+1}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText
            onPress={() => onPressItem(item)}
            color={COLOR.txtGreen}
            fontWeight="bold"
          >
            {`#${item.barcode}\n${(item.status=="complete"?"Hoàn thành":"Đang xử lý")}`}
             
          </AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.name?item.name:"Takeaway"}</AppText>
        </View>

        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.confirmed}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.fullname}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.completed_date?item.completed_date:"Chưa thu tiền"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.after_total?item.after_total:item.total)}</AppText>
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
      <HeaderBack title={`Doanh thu  - ${moment().format('DD/MM/YYYY')}`} />
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
              <AppText fontWeight="bold">{"Doanh thu"}</AppText>
              <AppText color={COLOR.txtGreen} fontWeight="bold">
                {show_money(price)}
              </AppText>
            </View> 
            <View style={[styles.itemMenu]}>
              <AppText fontWeight="bold">{"Điểm"}</AppText>
              <AppText fontWeight="bold">{show_money(0)}</AppText>
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
      <SafeAreaView/>
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

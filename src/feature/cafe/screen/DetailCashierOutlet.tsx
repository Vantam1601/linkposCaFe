import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { FlatList, StyleSheet, View,TouchableOpacity,Alert} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { show_money } from "src/helpers/config";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { GET_INVOICE } from "../store/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPrint,faBarcode} from "nvquang-font-icon/pro-solid-svg-icons";
import { site_url, postAsync } from "src/helpers/config";

interface Props
  extends StackScreenProps<
    CafeStackParamList,
    cafeRoutes.DetailCashierOutlet
  > {}

interface ItemRowProps {
  label: string;
  value: string;
  color?: string;
}
const ItemRow = (props: ItemRowProps) => {
  const { label, value, color } = props;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        },
      ]}
    >
      <AppText fontWeight="bold">{label} :</AppText>
      <AppText color={color}>{value}</AppText>
    </View>
  );
};
const DetailCashierOutlet = (props: Props) => {
  const dispatch = useDispatch();
  const loading = useRef<RefObject>(null);

  const tokenStore = useSelector<RootStateReducer>(
    (state) => state.auth.tokenStore
  );


  const data = useSelector<RootStateReducer>(
    (state) => state.cafe.currentInvoice
  );

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    loading.current?.toggleState(true);
    dispatch({
      type: GET_INVOICE,
      payload: {
        id_inv: props.route.params.id,
      },
      callback: () => loading.current?.toggleState(false),
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
          backgroundColor: COLOR.bgWhite,
        }}
      >
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{index}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.menuname}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{item.quantity}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.price)}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.price_discount)}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{show_money(item.subtotal)}</AppText>
        </View>
      </View>
    );
  };

  const renderRowTitle = () => {
    return (
      <View
        style={{
          borderWidth: 0,
          borderColor: COLOR.borderGray,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderTopWidth: 1,
        }}
      >
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"STT"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Sản phẩm"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"SL"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Giá"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Giảm giá"}</AppText>
        </View>
        <View style={[styles.itemColumn]}>
          <AppText fontWeight="bold">{"Thành tiền"}</AppText>
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          backgroundColor: COLOR.white,
          borderColor: COLOR.borderGray,
          padding: 10,
        }}
      >
        
        <View style={{alignItems:'center'}}>
          <AppText fontSize={18} fontWeight="bold">
            {data?.name}
          </AppText>
        </View>
        <ItemRow label="Barcode" value={data?.barcode} />
        <ItemRow label="Tổng tiền" value={show_money(data?.after_total?data?.after_total:data?.total)} />
        <ItemRow label="Tình trạng" value={data?.status=="complete"?"Đã thanh toán":data?.status} />
        <ItemRow label="Thanh toán" value={data?.payment=="cash"?"Tiền mặt":data?.payment} />
        <ItemRow label="Nhân viên gọi" value={data?.fullname || ""} />
        <ItemRow label="Nhân viên thanh toán" value={data?.fullname} />
        <ItemRow label="Giờ vào" value={data?.created_date} />
        <ItemRow label="Giờ ra" value={data?.completed_date} />
        {renderRowTitle()}


      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Chi tiết`}  hasRight={true} titleRight={ <FontAwesomeIcon
        onPress={()=>{
                  let headers = { headers: {} };
                    headers.headers["auth-token"] = tokenStore;
                    let body = { data: data };
                    body.type = "json";
                    body.name = Date.now();
                     postAsync(
                      "https://access.linkpos.top/action.php?a=print&confirm=add",
                      body,
                      headers
                    );

                     Alert.alert("Đã gởi đến máy in");
                }}
                size={20}
                icon={faBarcode}
                color={COLOR.contentColor}
              />} />
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={data?.listmenu || []}
          ListHeaderComponent={renderInfo}
          renderItem={renderProduct}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        />

        {data?.discount?<ItemRow label="Giảm giá" value={show_money(data?.discount?data?.discount:0)} />:null}
      </View>
      <LoadingOverlay ref={loading} />

    </View>
  );
};

export default DetailCashierOutlet;

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

import { StackScreenProps } from "@react-navigation/stack";
import { produce } from "immer";
import React, { useState,useRef } from "react"; 
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector} from "react-redux";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import { navigate } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { ResponseBase } from "src/types/Response";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { COMPLETE_ORDER, COMPLETE_TAKEAWAY_ORDER } from "../store/constants";
import BillCustomer from "./component/BillCustomer";
import BillDiscount from "./component/BillDiscount";
import BillVoucher from "./component/BillVoucher";
import MonneyView from "./component/MonneyView";
import ProductOrder from "./component/ProductOrder";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { debounce } from "lodash";
import { amountFormat } from "src/helpers/constants";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { site_url, postAsync } from "src/helpers/config";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";

interface Props extends StackScreenProps<CafeStackParamList, cafeRoutes.Bill> {}
const Bill = (props: Props) => {
  const loading = useRef<RefObject>(null);
  const user = useCurrentUser();

  const tokenStore = useSelector<RootStateReducer>(
    (state) => state.auth.tokenStore
  );

  const item = props.route.params.item;
  // alert(JSON.stringify(item));

  const dispatch = useDispatch();
  const [state, setstate] = useState({
    monney: "0",
    username: undefined,
    user: undefined,
    codeVoucher: "",
    voucher: undefined,
    discount: undefined,
  });

  const setData = (key, value) => {
    setstate(
      produce((draft) => {
        draft[key] = value;
      })
    );
  };

  const dataBill = React.useMemo(() => {
    let dataOrder: any = {};
    Object.values(item?.track_order ?? {}).map((track) => {
      track.products.map((product) => {
        dataOrder[product.id_product] = {
          ...product,
          quantity:
            (dataOrder[product.id_product]
              ? Number(dataOrder[product.id_product].quantity)
              : 0) + Number(product.quantity),
        };
      });
    });
    return dataOrder;
  }, [item]);
 
  const onSubmit = async (print) => {
    let body: any = {
      id: item.id,
      name: item.name,
      id_region: item.id_region,
      payment: "cash",
      customer_give: state.monney,
      money_left: 0,
      id_customer: "",
      phone_customer: "",
      fullname_customer: "",
      id_coupon: state.codeVoucher,
      discount: state.discount,
    };

    Object.values(item.track_order ?? {}).map((track) => {
      track?.products?.map?.((product) => {
        
        body = {
          ...body,
          [`track_order[${track.track[0].date}][products][0][id_product`]: (product.id_product||product.id),
          [`track_order[${track.track[0].date}][products][0][title]`]: product.title,
          [`track_order[${track.track[0].date}][products][0][quantity]`]: product.quantity,
          [`track_order[${track.track[0].date}][products][0][price]`]: product.price,
          [`track_order[${track.track[0].date}][products][0][subtotal]`]: product.subtotal,
          [`track_order[${track.track[0].date}][products][0][note]`]: product.note,
        };
      });
    });

    loading.current?.toggleState(true);

    if (item.takeawayId) {
      body = {
        ...item,
        ...body,
        id: item.takeawayId,
      };

      

      return dispatch({
        type: COMPLETE_TAKEAWAY_ORDER,
        payload: body,
        callback: ()=>{
          onCallback(print);
        },
      });
    } else {
      dispatch({
        type: COMPLETE_ORDER,
        payload: body,
        callback: ()=>{
          

          onCallback(print);
        },
      });
    }

    
  };


  const onCallback = async(print)=>{

     if (print == true) {
        let headers = { headers: {} };
        headers.headers["auth-token"] = tokenStore;
        body = { data: body };
        body.type = "json";
        body.name = Date.now();
        const res1 = await postAsync(
          "https://access.linkpos.top/action.php?a=print&confirm=add",
          body,
          headers
        );

        // console.log(res1.data);
     }

     loading.current?.toggleState(false);
     navigate(cafeRoutes.Home)
  }

  const handleChangeCustomer = React.useRef(
    debounce((val) => {
      getDataCustomer(val);
    }, 1000)
  ).current;

  const getDataCustomer = async (text: string) => {
    const res = await httpClient.postStore<ResponseBase<any>>(
      API_ENDPOINT.find_local,
      {
        username: text,
      },
      true
    );

    if (res.status === 200 && res.data) {
      setstate(
        produce((draft) => {
          draft.user = res.data;
        })
      );
    } else {
      Toast.show({
        type: "error",
        text2: res?.data ? res.data.error : "Không tìm thấy khách hàng!",
      });
    }
  };

  const getVoucher = async (text: string) => {
    const res = await httpClient.post<ResponseBase<any>>(
      API_ENDPOINT.check_voucher,
      {
        username: text,
      },
      true
    );
    if (res.status === 200 && res.data.code === 1) {
      // alert(JSON.stringify(res.data));
    } else {
      Toast.show({
        type: "error",
        text2: res?.data ? res.data.error : "Không tìm thấy mã voucher!",
      });
    }
  };

  const totalMoney = React.useMemo(() => {
    return Number(item.total) - Number(state.discount ?? 0);
  }, [item.total, state.discount]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.bg,
        paddingBottom: getBottomSpace(),
      }}
    >
      <HeaderBack title={`Thanh toán - ${item.name}`} />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <ProductOrder total={item.total} data={Object.values(dataBill)} />
        <View style={{ paddingHorizontal: 10 }}>
          <MonneyView
            value={state.monney}
            onSetValue={(val) => setData("monney", val)}
            total={totalMoney}
          />
          <BillCustomer
            value={state.username}
            onSetValue={(val) => {
              handleChangeCustomer(val);
              setData("username", val);
            }}
            onSetFullname={(val) => {
              // handleChangeCustomer(val);
              // setData("username", val);
            }}
            user={state.user}
          />
          {/* <BillVoucher
            value={state.codeVoucher}
            onSetValue={(val) => {
              setData("codeVoucher", val);
              getVoucher(val);
            }}
          /> */}
          <BillDiscount
            total={Number(item.total)}
            value={state.discount}
            onSetValue={(val) => setData("discount", val)}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText fontWeight="bold">{"Tổng tiền : "}</AppText>
        <AppText fontWeight="bold" fontSize={20}>
          {amountFormat(`${totalMoney}`)}
        </AppText>
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          type={"success"}
           onPress={()=>{
            onSubmit(true);
          }}
          textStyle={{ color: COLOR.textWhite, paddingHorizontal: 16 }}
          text={"Thanh toán & In bill"}
        />

        <Button
          type={"success"}
          onPress={()=>{
            onSubmit(false);
          }}
          textStyle={{ color: COLOR.textWhite, paddingHorizontal: 16 }}
          text={"Thanh toán"}
        />
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default Bill;

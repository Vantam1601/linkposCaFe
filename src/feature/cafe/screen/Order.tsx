import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { produce } from "immer";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBackCustom from "src/components/HeaderBackCustom";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { SUBMIT_ORDER } from "../store/constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { show_money } from "src/helpers/config";
import normalize from "src/helpers/normalize";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Order> {}

interface PropsList {
  onPressItem: () => void;
}
const ListProduct = (props: PropsList) => {
  const data = useSelector<RootStateReducer>(
    (state) => state.cafe.tableAndMenu.products
  );

  const renderProductItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => props.onPressItem(item)}
        style={{
          flex: 1,
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          margin: 10,
          padding: 5,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
          source={{
            uri: item.image,
          }}
        />
        <AppText fontWeight="bold" fontSize={20}>
          {item.title}
        </AppText>
        <AppText fontWeight="bold" color={COLOR.main_color} fontSize={20}>
          {show_money(item.price)}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={data ?? []}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

interface PropsListOrder {
  data: any[];
  onPressAdd: (item: any) => void;
  onPressDelete: (item: any) => void;
  onChangeNote: (item: any, val: string) => void;
  onSubmit: () => void;
}
const ListOrder = (props: PropsListOrder) => {
  const { data, onChangeNote, onPressDelete, onPressAdd, onSubmit } = props;

  const renderProductItem = ({ item, index }) => {
    const data = item.item;
    return (
      <TouchableOpacity
        key={index}
        style={{
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 6,
              }}
              resizeMode="cover"
              source={{
                uri: data.image,
              }}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <AppText fontWeight="bold" fontSize={20}>
              {data.title}
            </AppText>
            <AppText fontWeight="bold" color={COLOR.main_color} fontSize={20}>
              {show_money(data.price)}
            </AppText>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => onPressDelete(data)}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{ flex: 1, height: 40 }}
                text={"-"}
              />
              <Button
                onPress={() => {}}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{
                  flex: 1,
                  backgroundColor: COLOR.bgRedFresh,
                  height: 40,
                }}
                text={item.number}
              />
              <Button
                onPress={() => onPressAdd(data)}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{ flex: 1, height: 40 }}
                text={"+"}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Input
            autoCapitalize="none"
            placeholder={"Ghi chú..."}
            errorStyle={styles.textError}
            multiline={false}
            onChangeText={(val: any) => onChangeNote(data, val)}
            value={item.note}
            containerStyle={[styles.input]}
            style={styles.textInput}
            autoBorder={true}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingBottom: 20, paddingTop: 10 }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
        <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
          <FontAwesome
            name={"remove"}
            size={30}
            color={COLOR.main_color}
            style={{ color: COLOR.main_color, marginRight: normalize(6) }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 50,
            flex: 1,
          }}
        >
          <AppText
            fontSize={20}
            fontWeight="bold"
            style={{ textAlign: "center" }}
          >
            {"Danh sách"}
          </AppText>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ?? []}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${index}`}
      />
      <View
        style={{
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          buttonStyle={{ width: "45%" }}
          onPress={() => {
            onSubmit(true);
          }}
          textStyle={{ color: COLOR.textWhite }}
          text={"Xác nhận & In bill"}
        />

        <Button
          buttonStyle={{ width: "45%" }}
          onPress={() => {
            onSubmit();
          }}
          textStyle={{ color: COLOR.textWhite }}
          text={"Xác nhận"}
        />
      </View>
    </View>
  );
};
const Order = (props: Props) => {
  const tokenStore = useSelector<RootStateReducer>(
    (state) => state.auth.tokenStore
  );

  const { item = {} } = props.route?.params;
  const [cartLocal, setCartLocal] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useRef<RefObject>(null);

  const renderCart = () => {
    let total = 0;
    Object.values(cartLocal).map((it: any) => {
      total = total + it.number;
    });
    //
    return (
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: COLOR.white,
          }}
          resizeMode="contain"
          source={images.cart}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: COLOR.bgRedFresh,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 30,
          }}
        >
          <AppText fontSize={14} fontWeight="bold" color={COLOR.white}>
            {total ?? 0}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressItem = (item, trig = 1) => {
    setCartLocal(
      produce((draft) => {
        draft[`${item.id}`] = {
          item: item,
          number: (cartLocal[`${item.id}`]?.number ?? 0) + trig,
        };
      })
    );
  };

  const onPressEditItem = (item, trig = 1) => {
    const number = (cartLocal[`${item.id}`]?.number ?? 0) + trig;
    setCartLocal(
      produce((draft) => {
        if ((cartLocal[`${item.id}`]?.number ?? 0) + trig > 0) {
          draft[`${item.id}`].number =
            (cartLocal[`${item.id}`]?.number ?? 0) + trig;
        } else {
          delete draft[`${item.id}`];
        }
      })
    );
  };

  const onChangeNote = (item, val) => {
    setCartLocal(
      produce((draft) => {
        draft[`${item.id}`].note = val;
      })
    );
  };

  const onSubmitTakeAway = async (print) => {
    let totalMonney = 0;
    const products = Object.values(cartLocal).map((item, index) => {
      totalMonney = totalMonney + item.item.price * item.number;
      return {
        id_product: item.item.id,
        quantity: item.number,
        price: item.item.price ?? "0",
        subtotal: item.item.price * item.number ?? "",
        note: item.note ?? "",
      };
    });
    const currentDate = new Date();
    const trackDate = `${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;
    const track = [
      {
        a: "Staff confirm new order",
        date: trackDate,
      },
    ];
    //
    let dataOrder: any = {
      ...item,
      takeawayId: `takeaway.${currentDate.getTime()}`,
      status: "kitchen",
      subtotal: totalMonney,
      total: totalMonney,
      track_order: {
        [trackDate]: {
          products,
          track,
        },
      },
    };
    //

    Object.values(cartLocal).map((item, index) => {
      dataOrder[`products[${index}][id_product]`] = item.item.id;
      dataOrder[`products[${index}][title]`] = item.title;
      dataOrder[`products[${index}][quantity]`] = item.number;
      dataOrder[`products[${index}][price]`] = item.item.price;
      dataOrder[`products[${index}][subtotal]`] = item.item.price * item.number;
      dataOrder[`products[${index}][note]`] = item.note;
    });
    setIsVisible(false);
    setCartLocal({});
    push(cafeRoutes.Bill, {
      item: dataOrder,
    });

    if (print == true) {
      let headers = { headers: {} };
      headers.headers["auth-token"] = tokenStore;
      body = { data: dataOrder.products };
      body.type = "json";
      body.name = Date.now();
      const res1 = await postAsync(
        "https://access.linkpos.top/action.php?a=print&confirm=add",
        body,
        headers
      );

      console.log(res1.data);
    }
  };

  const onSubmit = async (print) => {
    loading.current?.toggleState(true);
    if (item.id === -1) {
      return onSubmitTakeAway(print);
    }
    const body: any = { ...item };
    Object.values(cartLocal).map((item, index) => {
      body[`products[${index}][id_product]`] = item.item.id;
      body[`products[${index}][title]`] = item.item.title;
      body[`products[${index}][quantity]`] = item.number ?? "1";
      body[`products[${index}][price]`] = item.item.price ?? "0";
      body[`products[${index}][subtotal]`] =
        item.item.price * item.number ?? "0";
      body[`products[${index}][note]`] = item.note ?? "";
    });

    dispatch({
      type: SUBMIT_ORDER,
      payload: body,
      callback: () => {
        setCartLocal({});
        navigation.goBack();
        loading.current?.toggleState(false);
      },
    });

    if (print == true) {
      let headers = { headers: {} };
      headers.headers["auth-token"] = tokenStore;
      body = { data: body.products };
      body.type = "json";
      body.name = Date.now();
      const res1 = await postAsync(
        "https://access.linkpos.top/action.php?a=print&confirm=add",
        body,
        headers
      );

      // console.log(res1.data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBackCustom
        title={`Gọi món - ${item.name}`}
        rightComponent={renderCart()}
      />
      <ListProduct onPressItem={onPressItem} />
      <Modal
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{ margin: 0, paddingBottom: getBottomSpace() }}
      >
        <View
          style={{
            backgroundColor: COLOR.bgWhite,
            flex: 1,
            marginTop: 80,
            width: "100%",
            borderRadius: 20,
          }}
        >
          <ListOrder
            onPressAdd={(item) => onPressEditItem(item, 1)}
            onPressDelete={(item) => onPressEditItem(item, -1)}
            onChangeNote={(item, val) => onChangeNote(item, val)}
            onSubmit={onSubmit}
            data={Object.values(cartLocal)}
          />
        </View>
        <LoadingOverlay ref={loading} />
      </Modal>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  btnRegister: {},
  txtLogin: { fontWeight: "bold", fontSize: 14, color: COLOR.white },
  btnSkip: {
    borderWidth: 1,
    borderColor: COLOR.blue,
    padding: 4,
    marginTop: 20,
    borderRadius: 12,
  },
  viewRegister: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    paddingHorizontal: 10,
  },
  btnForgot: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  textForgot: {
    fontSize: 13,
  },
  textRegister: {
    fontSize: 13,
    fontWeight: "500",
    width: 200,
    textAlign: "center",
  },
  textSkip: {
    fontSize: 13,
    fontWeight: "500",
  },
  textError: {
    position: "absolute",
    color: COLOR.error,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "right",
    bottom: -25,
    right: 0,
  },
  buttonLogin: {
    marginTop: 20,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    marginBottom: 6,
    fontWeight: "600",
  },
  viewInput: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    height: 46,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  txtLogo: {
    fontSize: 26,
    marginTop: 30,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "500",
  },
  viewLogo: {
    alignSelf: "center",
    alignItems: "center",
  },
  coverTop: {},
  container: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
});

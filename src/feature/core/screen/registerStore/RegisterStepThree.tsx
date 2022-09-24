import React, { memo, useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { images } from "src/assets/images";

import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { AppInput } from "src/components/AppInput";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import DropdownButton from "src/components/DropdownButton";
import HeaderBack from "src/components/HeaderBack";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { GPS } from "src/helpers/config";
import { httpClient } from "src/helpers/httpClient";
import { useTranslate } from "src/hooks/useTranslate";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { ResponseBase } from "src/types/Response";
import ToggleSwitch from "toggle-switch-react-native";
import LoadingOverlay, {
  RefObject,
} from "../../component/loadingPage/LoadingPage";
import { CoreStackParamList } from "../../router/core.navigator";
import { coreRoutes } from "../../router/CoreRouter";
import { navigate } from "src/navigator/RootNavigation";
import { GET_MYSTORE } from "src/feature/auth/store/constants";

const { width, height } = Dimensions.get("window");

interface Props
  extends StackScreenProps<CoreStackParamList, coreRoutes.RegisterStepThree> {}

const RegisterStepThree = memo((props: Props) => {
  const { data } = props.route.params;
  const user = useSelector<RootStateReducer>((state) => state.auth.user);

  const intl = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [isAcceptPrivacy, setIsAcceptPrivacy] = useState(false);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(undefined);
  const loadingRef = useRef<RefObject>(null);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    province: undefined,
    district: undefined,
    ward: undefined,
  });

  const handleSubmit = async () => {
    if (
      !state.province?.id ||
      !state.district?.id ||
      !state.ward?.id ||
      !address
    ) {
      return Toast.show({
        type: "error",
        text2: "Vui lòng điền đầy đủ thông tin",
      });
    }

    try {
      data.append("registerPOS", "");
      data.append("bussiness", "shop");
      data.append("staff", "");
      data.append("table", "1");
      data.append("lat", location?.lat);
      data.append("lng", location?.lng);
      data.append("street", address);
      data.append("province_id", state?.province?.id);
      data.append("province", state?.province?.name);
      data.append("district_id", state?.district?.id);
      data.append("district", state?.district?.name);
      data.append("ward_id", state?.ward?.id);
      data.append("ward", state?.ward?.name);
      data.append("cc", "on");
      data.append("ID", "12654");
      data.append("fullname", user?.username_user);
      data.append("my_phone", user?.phone_user);
      data.append("email", user?.email_user);

      const res = await httpClient.post<ResponseBase<{ data: any }>>(
        API_ENDPOINT.check_user,
        data,
        false
      );

      Toast.show({
        type: "success",
        text2: "Đăng ký thành công!",
      });

      navigate(coreRoutes.MY_STORE);
      dispatch({
        type: GET_MYSTORE,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text2: "Đăng ký thông tin thất bại!",
      });
    }
  };
  const getGPS = async () => {
    loadingRef.current?.toggleState(true);
    const pos = await GPS();
    loadingRef.current?.toggleState(false);
    setLocation(pos);
    // alert(JSON.stringify(pos));
  };

  useEffect(() => {
    getGPS();
    getData(0);
  }, []);

  useEffect(() => {
    if (state.province) {
      setListDistrict([]);
      getData(1);
    }
  }, [state.province]);

  useEffect(() => {
    if (state.district) {
      setListWard([]);
      getData(2);
    }
  }, [state.district]);

  const getData = async (index?: number) => {
    loadingRef.current?.toggleState(true);
    if (loading) {
      loadingRef.current?.toggleState(false);
      return;
    }
    setLoading(true);

    let body = {};

    if (index == 1) {
      body.province_id = state.province.id;
    }
    if (index == 2) {
      body.province_id = state.province?.id;
      body.district_id = state.district?.id;
    }

    const res = await httpClient.post<ResponseBase<{ data: any[] }>>(
      API_ENDPOINT.country,
      body,
      index > 0 ? true : false
    );
    loadingRef.current?.toggleState(false);
    setLoading(false);

    if (res.status === 200 && res.data) {
      const values = Object.keys(res.data).map((item) => {
        return {
          name: item,
          id: res.data?.[item],
        };
      });
      if (index === 0) {
        setListProvince(values);
      }
      if (index === 1) {
        setListDistrict(values);
      }
      if (index === 2) {
        setListWard(values);
      }
    } else {
      Toast.show({
        type: "error",
        text2: res?.data ? res.data.error : "Lấy thông tin thất bại!",
      });
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={`Đăng ký cửa hàng`} />
      <ImageBackground source={images.background} style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {!!location && (
              <View style={{}}>
                <AppText
                  fontWeight="bold"
                  style={[
                    styles.txtLabel,
                    {
                      paddingVertical: 20,
                    },
                  ]}
                >
                  {"Đã lấy được vị trí :"}
                </AppText>
              </View>
            )}
            <View
              style={{
                flex: 1,
                backgroundColor: COLOR.bgWhite,
                paddingVertical: 10,
                borderRadius: 20,
              }}
            >
              <View style={{}}>
                <AppText
                  fontWeight="bold"
                  style={[
                    styles.txtLabel,
                    {
                      paddingVertical: 10,
                    },
                  ]}
                >
                  {"Địa chỉ :"}
                </AppText>
              </View>
              <AppInput
                onChangeText={setAddress}
                placeholder={intl.formatMessage({ id: "label:address" })}
                style={[styles.input]}
                inputContainerStyle={{
                  width: "100%",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: COLOR.borderGray,
                  minHeight: 60,
                }}
                value={address}
                autoFocus={true}
                multiline={true}
                numberOfLines={3}
              />
              <View style={{}}>
                <AppText fontWeight="bold" style={styles.txtLabel}>
                  {"Chọn tỉnh :"}
                </AppText>
              </View>
              <DropdownButton
                keyView="name"
                autoBack={true}
                idProps={state.province?.id}
                title={state.province?.name || "-- Chọn tỉnh --"}
                data={listProvince}
                stylesProps={{
                  margin: 10,
                  backgroundColor: COLOR.bgWhite,
                  borderRadius: 5,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: COLOR.borderGray,
                }}
                onChange={(val) => {
                  setState({
                    ...state,
                    province: val,
                    district: undefined,
                    ward: undefined,
                  });
                }}
              />
              <View style={{}}>
                <AppText fontWeight="bold" style={styles.txtLabel}>
                  {"Chọn huyện :"}
                </AppText>
              </View>
              <DropdownButton
                keyView="name"
                autoBack={true}
                idProps={state.district?.id}
                title={state.district?.name || "-- Chọn Quận huyện --"}
                data={listDistrict}
                stylesProps={{
                  margin: 10,
                  backgroundColor: COLOR.bgWhite,
                  borderRadius: 5,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: COLOR.borderGray,
                }}
                onChange={(val) => {
                  setState({ ...state, district: val, ward: undefined });
                }}
              />
              <View style={{}}>
                <AppText fontWeight="bold" style={styles.txtLabel}>
                  {"Chọn xã :"}
                </AppText>
              </View>
              <DropdownButton
                keyView="name"
                autoBack={true}
                idProps={state.ward?.id}
                title={state.ward?.name || "-- Chọn xã --"}
                data={listWard}
                stylesProps={{
                  margin: 10,
                  backgroundColor: COLOR.bgWhite,
                  borderRadius: 5,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: COLOR.borderGray,
                }}
                onChange={(val) => setState({ ...state, ward: val })}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <AppText fontWeight="bold" style={styles.txtLabel}>
                    {"Đăng ký có nghĩa là bạn đã đồng ý "}
                    <AppText
                      onPress={() => alert("Add link privacy")}
                      color={COLOR.main_color}
                    >
                      điều khoản sử dụng của chúng tôi :
                    </AppText>
                  </AppText>
                </View>
                <View style={{ minWidth: 80 }}>
                  <ToggleSwitch
                    isOn={isAcceptPrivacy}
                    onColor={COLOR.main_color}
                    offColor={COLOR.gray}
                    size="medium"
                    onToggle={() => setIsAcceptPrivacy(!isAcceptPrivacy)}
                  />
                </View>
              </View>
              {isAcceptPrivacy && (
                <View style={{ alignItems: "center" }}>
                  <Button
                    buttonStyle={styles.buttonLogin}
                    loading={loading}
                    onPress={handleSubmit}
                    text={"Tiếp tục"}
                    loadingColor={COLOR.white}
                    textStyle={styles.txtLogin}
                  />
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      <LoadingOverlay ref={loadingRef} />
    </View>
  );
});

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
    width: width - 60,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  viewInput: {
    // borderWidth: 1,
  },
  input: {
    minHeight: 50,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
    paddingHorizontal: 10,
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  txtLogo: {
    textAlign: "center",
    fontWeight: "500",
  },
  txtName: {
    textAlign: "center",
    lineHeight: 30,
    fontSize: 25,
    borderColor: COLOR.borderGray,
  },
  viewLogo: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  coverTop: {
    width,
    height: 130,
    backgroundColor: "#0aa99a",
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    zIndex: 1,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
});

export default RegisterStepThree;

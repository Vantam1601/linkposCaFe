import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "src/assets/images";
import Input from "src/components/AppInputElement";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { useTranslate } from "src/hooks/useTranslate";
import { push } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";
import { coreRoutes } from "../../router/CoreRouter";

import {
  faMinusSquare,
  faPlusSquare,
} from "nvquang-font-icon/pro-light-svg-icons";
import HeaderBack from "src/components/HeaderBack";

const { width, height } = Dimensions.get("window");

const FormSchema = Yup.object().shape({
  username: Yup.string().required("* Required"),
  phonenumber: Yup.string().required("* Required"),
});

type LoginMutationVariables = {
  username: string;
};
interface LginResponse {
  code: number;
  data: Record<string, any>;
  message: string;
  token: string;
  _loged: string;
}

const RegisterStepOne = memo(() => {
  const intl = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const number = useRef(1);
  const [listPhone, setListPhone] = useState<any>([]);

  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm<LoginMutationVariables>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      username: "new Shop",
      phonenumber: "0909123123",
    },
  });

  const submit = async (value: LoginMutationVariables) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const dataFrom = new FormData();
    dataFrom.append("name_outlet", value.username);
    dataFrom.append("phone[]", value.phonenumber);

    listPhone.forEach((item) => {
      if (value?.[item.name]) {
        dataFrom.append("phone[]", value?.[item.name]);
      }
    });

    push(coreRoutes.RegisterStepTwo, {
      data: dataFrom,
    });

    setLoading(false);
  };

  const renderPhone = () => {
    return listPhone.map((item, index) => {
      return (
        <View key={index} style={styles.viewInput}>
          <AppText style={styles.txtLabel}>
            {"Số điện thoại:"}
            (*)
          </AppText>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                autoCapitalize="none"
                placeholder={"Nhập số điện thoại"}
                errorStyle={styles.textError}
                errorMessage={
                  errors?.[item.name] ? errors?.[item.name].message : ""
                }
                multiline={false}
                onChangeText={(val: any) => onChange(val)}
                onBlur={onBlur}
                value={value}
                containerStyle={[
                  styles.input,
                  { marginBottom: errors?.[item.name] ? 30 : 16 },
                ]}
                style={styles.textInput}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => {
                      number.current = number.current + 1;
                      setListPhone(
                        listPhone.filter((_item) => _item.name !== item.name)
                      );
                    }}
                    activeOpacity={0.6}
                  >
                    <FontAwesomeIcon
                      color={COLOR.black}
                      icon={faMinusSquare}
                      size={22}
                    />
                  </TouchableOpacity>
                }
              />
            )}
            name={item.name}
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={`Đăng ký cửa hàng`} />
      <ImageBackground source={images.background} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              alignItems: "center",
              paddingHorizontal: "10%",
            }}
          >
            <View style={styles.viewLogo}>
              <AppText style={styles.txtInfo}>
                {intl.formatMessage({
                  id: "Thông tin cửa hàng",
                })}
              </AppText>
              <Image
                style={styles.tinyLogo}
                resizeMode="contain"
                source={images.infoShop}
              />
              <View style={styles.viewInput}>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "Tên cửa hàng",
                  })}
                  (*)
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      autoCompleteType="username"
                      placeholder={"Nhập tên sửa hàng"}
                      errorStyle={styles.textError}
                      errorMessage={
                        errors.phonenumber ? errors.phonenumber.message : ""
                      }
                      multiline={false}
                      onChangeText={(val: any) => onChange(val)}
                      onBlur={onBlur}
                      value={value}
                      containerStyle={[
                        styles.input,
                        { marginBottom: errors.phonenumber ? 30 : 16 },
                      ]}
                      style={styles.textInput}
                    />
                  )}
                  name="username"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
              <View style={styles.viewInput}>
                <AppText style={styles.txtLabel}>
                  {"Số điện thoại:"}
                  (*)
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      autoCompleteType="username"
                      placeholder={"Nhập số điện thoại"}
                      errorStyle={styles.textError}
                      errorMessage={
                        errors.phonenumber ? errors.phonenumber.message : ""
                      }
                      multiline={false}
                      onChangeText={(val: any) => onChange(val)}
                      onBlur={onBlur}
                      value={value}
                      containerStyle={[
                        styles.input,
                        { marginBottom: errors.phonenumber ? 30 : 16 },
                      ]}
                      style={styles.textInput}
                      rightIcon={
                        <TouchableOpacity
                          onPress={() => {
                            number.current = number.current + 1;
                            setListPhone([
                              ...listPhone,
                              {
                                name: `phonenumber${number.current}`,
                              },
                            ]);
                          }}
                          activeOpacity={0.6}
                        >
                          <FontAwesomeIcon
                            color={COLOR.black}
                            icon={faPlusSquare}
                            size={22}
                          />
                        </TouchableOpacity>
                      }
                    />
                  )}
                  name="phonenumber"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
              {renderPhone()}
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit(submit)}
                text={"Tiếp tục"}
                loadingColor={COLOR.white}
                textStyle={styles.txtLogin}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
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
    marginBottom: 6,
    fontWeight: "600",
  },
  viewInput: {
    // borderWidth: 1,
  },
  input: {
    width: width - 60,
    height: 46,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  txtLogo: {
    fontSize: 26,
    marginTop: 30,
    lineHeight: 26,
    textAlign: "center",
  },
  txtInfo: {
    fontSize: 20,
    marginTop: 30,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  viewLogo: {
    alignSelf: "center",
    alignItems: "center",
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

export default RegisterStepOne;

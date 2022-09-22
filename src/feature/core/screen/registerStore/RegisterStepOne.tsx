import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { images } from "src/assets/images";
import Input from "src/components/AppInputElement";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { ResponseBase } from "src/types/Response";
import * as Yup from "yup";

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
  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm<LoginMutationVariables>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      username: "",
      phonenumber: "",
    },
  });

  const submit = async (value: LoginMutationVariables) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const data = new FormData();

    const res = await httpClient.post<ResponseBase<LginResponse>>(
      API_ENDPOINT.check_user,
      {
        pos_check_phone_email: 1,
        username: value.username,
      },
      true
    );
    // if (res.status === 200 && res.data.code === 1) {
    //   navigate(authRoutes.VERIFY_PASSS, {
    //     ...res.data,
    //     username: value.username,
    //   });
    // } else {
    //   Toast.show({
    //     type: "error",
    //     text2: res?.data ? res.data.error : "Check user failed!",
    //   });
    // }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
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
              <AppText style={styles.txtLogo}>{"Đăng ký cửa hàng :"}</AppText>
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
                    />
                  )}
                  name="phonenumber"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
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
    marginTop: 10,
  },
  input: {
    width: width - 60,
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

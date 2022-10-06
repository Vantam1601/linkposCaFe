import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { faEye, faEyeSlash } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Input from "src/components/AppInputElement";
import Button from "src/components/Button";

import { useDispatch } from "react-redux";
import { AppText } from "src/components/Apptext";
import { API_ENDPOINT } from "src/helpers/api.endpoint";
import { httpClient } from "src/helpers/httpClient";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { ResponseBase } from "src/types/Response";
import * as Yup from "yup";
import { AuthStackParamList } from "../router/auth.navigator";
import { authRoutes } from "../router/AuthRouter";
import { LOGIN_SUCCESS } from "../store/constants";

const { width, height } = Dimensions.get("window");

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("* Ô nhập không được trống"),
});

type LoginMutationVariables = {
  password: string;
};

export type PropsScreen = StackScreenProps<
  AuthStackParamList,
  authRoutes.VERIFY_PASSS
>;

const FormLoginPassWord = memo(({ username }) => {
  const intl = useTranslate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, errors } = useForm<LoginMutationVariables>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleLogin = async (value: LoginMutationVariables) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await httpClient.post<ResponseBase>(
      API_ENDPOINT.login,
      {
        loginnormal: "",
        password: value.password,
        username: username,
        lat: 0,
        lng: 0,
      },
      true
    );
    if (res.status === 200 && res.data.code === 1) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: res.data.data,
          token: res.data.token,
        },
      });
    } else {
      Toast.show({
        type: "error",
        text2: res?.data ? res.data.error : "Check user failed!",
      });
    }

    setLoading(false);
  };

  return (
    <View>
      <View style={styles.viewInput}>
        <AppText style={styles.txtLabel}>
          {"Mật khẩu"}
          (*)
        </AppText>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              // leftIcon={<UserSVG />}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.6}
                >
                  <FontAwesomeIcon
                    color={COLOR.black}
                    icon={!showPassword ? faEyeSlash : faEye}
                    size={22}
                  />
                </TouchableOpacity>
              }
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder={"Nhập mật khẩu"}
              errorStyle={styles.textError}
              errorMessage={
                errors.phonenumber ? errors.phonenumber.message : ""
              }
              multiline={false}
              onChangeText={(val: any) => onChange(val)}
              onBlur={onBlur}
              value={value}
              secureTextEntry={!showPassword}
              inputContainerStyle={{
                borderColor: COLOR.white,
                borderBottomWidth: 0,
              }}
              containerStyle={[
                styles.input,
                { marginBottom: errors.phonenumber ? 30 : 16 },
              ]}
              style={styles.textInput}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <Button
        buttonStyle={styles.buttonLogin}
        loading={loading}
        onPress={handleSubmit(handleLogin)}
        text={"Đăng nhập"}
        loadingColor={COLOR.white}
        textStyle={styles.txtLogin}
      />
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
    marginTop: 30,
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

export default FormLoginPassWord;

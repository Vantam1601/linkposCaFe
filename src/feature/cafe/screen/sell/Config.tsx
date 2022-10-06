import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,Image,
  View,SafeAreaView,
} from "react-native";
import Input from "src/components/AppInputElement";

import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";

import HeaderBack from "src/components/HeaderBack";
import { RootStateReducer } from "src/store/types";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE } from "src/feature/auth/store/constants";

const { width, height } = Dimensions.get("window");

const FormSchema = Yup.object().shape({
  fullname_user: Yup.string().required("* Ô nhập không được trống"),
  phone_user: Yup.string().required("* Ô nhập không được trống"),
  cmnd: Yup.string().required("* Ô nhập không được trống"),
});

type LoginMutationVariables = {
  fullname_user: string;
  phone_user: string;
  cmnd: string;
};

const Setting = (props) => {
  const intl = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector<RootStateReducer>((state) => state.auth.user);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm<LoginMutationVariables>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      printer: "",
      printer_copy: "",
      wifi: "",
      password: "",
    },
  });

  const submit = async (value: LoginMutationVariables) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const dataFrom = new FormData();

    dataFrom.append("fullname_user", value.fullname_user);
 

    dispatch({
      type: UPDATE_PROFILE,
      payload: dataFrom,
    });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={`Cài đặt`} />

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
          <View style={[styles.viewLogo,{marginTop:24}]}>
             
            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Tên máy in"} 
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    autoCompleteType="printer"
                    placeholder={"XP-80"}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.printer ? errors.printer.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.printer ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="printer" 
                defaultValue=""
              />
            </View>
            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Sao in bản copy"} 
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    placeholder={"1"}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.printer_copy ? errors.printer_copy.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.printer_copy ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="printer_copy" 
                defaultValue=""
              />
            </View>
            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Tên Wifi quán"} 
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    autoCompleteType="wifi"
                    placeholder={""}
                    errorStyle={styles.textError}
                    errorMessage={errors.cmnd ? errors.wifi.message : ""}
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.wifi ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="wifi" 
                defaultValue=""
              />
            </View>

            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Mật khẩu Wifi quán"} 
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    autoCompleteType="password"
                    placeholder={""}
                    errorStyle={styles.textError}
                    errorMessage={errors.password ? errors.password.message : ""}
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.password ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="password" 
                defaultValue=""
              />
            </View>

            
          </View>
          <View style={{paddingBottom:16}}>
             <Button
              buttonStyle={styles.buttonLogin}
              loading={loading}
              onPress={handleSubmit(submit)}
              text={"Cập nhật"}
              loadingColor={COLOR.white}
              textStyle={styles.txtLogin}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <SafeAreaView/>
    </View>
  );
};

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
    flex:1
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

export default Setting;

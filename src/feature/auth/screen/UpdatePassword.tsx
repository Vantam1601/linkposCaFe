import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,SafeAreaView,
} from "react-native";
import Input from "src/components/AppInputElement";

import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";
import { site_url, postAsync } from "src/helpers/config";
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

const UpdatePassword = () => {
  const intl = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData,setFormData] = useState({
    update_pass:"",
    old:"",
    new:""
  });
  const user = useSelector<RootStateReducer>((state) => state.auth.user);
  const token  = useSelector<RootStateReducer>(
    (state) => state.auth.token
  );

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm<LoginMutationVariables>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      fullname_user: "",
      phone_user: ""
    },
  });

  const submit = async () => {

    if (loading) {
      return;
    }
    setLoading(true);
  
 
    let headers = { headers: {} };
    headers.headers["auth-token"] = token; 
    const res1 = await postAsync("https://linkpos.giaiphap.xyz/login.php",
      formData,
      headers
    );
    

    if(res1.data.code==0){
      alert("Mật khẩu củ không đúng");
    }else{
      alert("Cập nhật thành công");
      navigation.goBack();
    }
    setLoading(false);
    

    
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={`Đổi mật khẩu`} />

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
            <View>
                <Image source={{uri:"https://www.k2e.com/wp-content/uploads/2018/09/change-password.png"}} style={{width:175,height:175}} />
            </View>
            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Mật khẩu củ:"}
                (*)
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    autoCompleteType="username"
                    secureTextEntry={true}
                    placeholder={"******"}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.phone_user ? errors.phone_user.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) =>{ onChange(val);
                      setFormData(a=>{
                        a.old = val;

                        return a;
                      });
                    }}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.phone_user ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="phone_user"
                rules={{ }}
                defaultValue=""
              />
            </View>
            <View style={styles.viewInput}>
              <AppText style={styles.txtLabel}>
                {"Mật khẩu mới:"}
                (*)
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    placeholder={"******"}
                    secureTextEntry={true}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.fullname_user ? errors.fullname_user.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) =>{ onChange(val);
                     setFormData(a=>{
                        a.new = val;

                        return a;
                      });
                    }}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.fullname_user ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="fullname_user"
                rules={{   }}
                defaultValue=""
              />
            </View>
             
          </View>
          <View style={{paddingBottom:16}}>
             <Button
              buttonStyle={styles.buttonLogin}
              loading={loading}
              onPress={submit}
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

export default UpdatePassword;

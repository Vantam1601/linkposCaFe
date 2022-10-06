import React, { memo, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,Linking,
  TouchableOpacity,
  View,Text,
} from "react-native";
import { images } from "src/assets/images";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { AppText } from "src/components/Apptext";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";
import FormLoginPassWord from "./FormLoginPassWord";
import FormLoginUserName from "./FormLoginUserName";

const { width, height } = Dimensions.get("window");

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("* Ô nhập không được trống"),
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

const LoginScreen = memo(() => {
  const intl = useTranslate();
  const [username, setUsername] = useState("");

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
              marginTop: 84,
              paddingHorizontal: "10%",
            }}
          >
            <View style={styles.viewLogo}>
              <Image
                style={styles.tinyLogo}
                resizeMode="contain"
                source={images.logo}
              />
              <AppText style={styles.txtLogo}>
                {"Đăng nhập"}
              </AppText>
              {username ? (
                <FormLoginPassWord username={username} />
              ) : (
                <FormLoginUserName setUsername={setUsername} />
              )}
            </View>

            <View style={{marginTop:16,width:'100%',alignItems: "center",justifyContent: 'space-between',flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{
                 Linking.openURL("https://linkpos.giaiphap.xyz/register.php");
              }}>
               <Text>Đăng ký ngay</Text>
              </TouchableOpacity>
              <TouchableOpacity>
               <Text>Quên mật khẩu?</Text>
              </TouchableOpacity>
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

export default LoginScreen;

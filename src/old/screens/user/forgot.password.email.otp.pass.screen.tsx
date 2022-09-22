import React, { memo, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, KeyboardAvoidingView,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTranslate } from "src/hooks/useTranslate";
import { AppText } from 'src/components/Apptext';
import { COLOR } from 'src/theme/color';
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from 'react-native-elements';
import Button from 'src/components/Button';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { forgotPasswordEmail, forgotPasswordPhone } from 'src/old/stores/auth/auth.actions';
import HeaderBack from 'src/components/HeaderBack'; 
import {post,site_ajax_url} from 'src/helpers/config';
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");


type ForgotPasswordMutationVariables = {
  txtForgotPassword: string;
};

const ForgotPasswordOTPPassScreen = memo((navigationRoute: any) => {
  const intl = useTranslate();
  const navigation = useNavigation();
  const { route } = navigationRoute;
 

  const ForgotPassSchema = Yup.object().shape({
    txtForgotPassword: Yup.string().required(intl.formatMessage({ id: "input:field_required", })),
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [isDifferentWays, setIsDifferentWays] = useState<boolean>(false);

  const dispatch = useTypedDispatch();

  const { control, handleSubmit, errors } = useForm<ForgotPasswordMutationVariables>({
    resolver: yupResolver(ForgotPassSchema),
  });
  const handleRestore = async (value: ForgotPasswordMutationVariables) => {
    if (loading) {
      return
    }
    setLoading(true);

    post(site_ajax_url("otp.php?a=otpviaphoneconfirmpassword"),{password:value.txtForgotPassword,code:route?.params?.code},(res:any) =>{
       setLoading(false);
       if(res && res?.code==1){
          Toast.show({
            type: "success",
            text2: res.message + " 👋",
          });
          navigation.navigate(AppRoutes.LOGIN);
       }else{
          Toast.show({
            type: "error",
            text2: res?.error,
          });
       }
    }); 
    
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
      <HeaderBack
          title={"label:recover_password_via_otp"}
        />
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",

            alignItems: "center",
          }}
          enabled
          keyboardVerticalOffset={50}
          behavior={Platform.OS !== "android" ? "padding" : "height"}
        >
          <ScrollView
            style={{ backgroundColor: COLOR.contentColor, flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
             <View style={styles.viewMain}>
            
            <AppText style={styles.textPhoneNumber}>
              {intl.formatMessage({
                id: "label:please_recover_password",
              })}
              {":"}
            </AppText>
            <View style={styles.viewForm}>
              <View>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id:  "input:input_password",
                  })}
                  {' '}*
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
 
                      autofocus={true}
                      errorStyle={styles.textError}
                      errorMessage={
                        errors.txtForgotPassword ? errors.txtForgotPassword.message : ""
                      }
                      multiline={false}
                      onChangeText={(val) => onChange(val)}
                      onBlur={onBlur}
                      value={value}
                      containerStyle={[
                        styles.input,
                        { marginBottom: errors.txtForgotPassword ? 50 : 16 },
                      ]}
                      style={styles.textInput}
                    />
                  )}
                  name="txtForgotPassword"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit(handleRestore)}
                text={intl.formatMessage({
                  id: "input:update",
                })}
                textStyle={styles.txtLogin}
              />
            </View>
             
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
    paddingTop: 50
  },
  viewMain: {
    // backgroundColor: COLOR.gray_white,
    marginHorizontal: 20,
    marginTop: 20,
  },
  vLogo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 150,
    height: 150,
    resizeMode: "stretch"
  },
  textPhoneNumber: {
    fontSize: 13,
  },
  viewForm: {
    marginTop: 10,
    backgroundColor: COLOR.white,
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#bfbebd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  input: {
    width: width - 40,
    height: 35,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10
  },
  textError: {
    position: "absolute",
    color: COLOR.error,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "right",
    bottom: -40,
    right: 0,
  },
  buttonLogin: {
    width: width - 60,
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  } 
});

export default ForgotPasswordOTPPassScreen;

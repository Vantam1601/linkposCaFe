import React, { memo, useState,useEffect } from 'react';
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
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";

const { width } = Dimensions.get("window");


type ForgotPasswordMutationVariables = {
  txtForgotPassword: string;
};

const ForgotPasswordScreen = memo((navigationRoute:any) => {
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

  useEffect(()=> {
     
      
  }, []);

  const handleRestore = async (value: ForgotPasswordMutationVariables) => {
    if (loading) {
      return
    }
    setLoading(true)
    await dispatch( isDifferentWays ? forgotPasswordEmail(value.txtForgotPassword):forgotPasswordPhone(value.txtForgotPassword));
    setLoading(false)
    if(!isDifferentWays){
      //email
      navigation.navigate(AppRoutes.FORGOT_PASSWORD_OTP,{phone:value.txtForgotPassword});
    }

    
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
      <HeaderBack
          title={"label:forgot_password"}
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
            <View style={styles.vLogo}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: "https://www.k2e.com/wp-content/uploads/2018/09/change-password.png",
                }}
              />
            </View>
            <AppText style={styles.textPhoneNumber}>
              {intl.formatMessage({
                id: isDifferentWays ? "translation:please_enter_your_email" : "translation:please_enter_the_phone_number",
              })}
              {":"}
            </AppText>
            <View style={styles.viewForm}>
              <View>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: isDifferentWays ? "label:email" : "label:phone",
                  })}
                  {' '}*
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autofocus={true}
                      autoCapitalize="none"
                      placeholder={intl.formatMessage({
                        id: isDifferentWays ? "input:input_email" : "input:input_username",
                      })}
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
                  id: "label:restore",
                })}
                textStyle={styles.txtLogin}
              />
            </View>
            <TouchableOpacity
              style={styles.btnDifferentWays}
              activeOpacity={0.6}
              onPress={() => setIsDifferentWays(!isDifferentWays)}>
              <AppText style={styles.textDifferentWays}>
                {intl.formatMessage({
                  id: "label:different_ways",
                })}
                {'?'}
              </AppText>
            </TouchableOpacity>
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
  },
  btnDifferentWays: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  textDifferentWays: {
    fontSize: 13,
  },
});

export default ForgotPasswordScreen;

import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity,KeyboardAvoidingView,SafeAreaView, ScrollView,Platform, } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from "src/hooks/useTranslate";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faEye, faEyeSlash } from "nvquang-font-icon/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Yup from "yup";
import { COLOR } from 'src/theme/color';
import Button from 'src/components/Button';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { registerAction } from "src/old/stores/auth/auth.actions";
import HeaderBack from 'src/components/HeaderBack';
import Input from 'src/components/AppInputElement';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {LOGO } from "src/helpers/constants"; 

import CountrySelect from 'src/components/Country/vi';


const { width, height } = Dimensions.get("window");



type RegisterMutationVariables = {
  phonenumber: string;
  // email: string;
  password: string;
};
const RegisterScreen = memo(() => {
  const intl = useTranslate();
  const RegisterSchema = Yup.object().shape({
    phonenumber: Yup.string().required(intl.formatMessage({ id: "input:field_required", })),
    // email: Yup.string().required(intl.formatMessage({ id: "input:field_required", })),
    password: Yup.string().required(intl.formatMessage({ id: "input:field_required", })),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useTypedDispatch();


  const { control, handleSubmit, errors } = useForm<RegisterMutationVariables>({
    resolver: yupResolver(RegisterSchema),
  });
  const handleNext = async (value: RegisterMutationVariables) => {
    if (loading) {
      return
    }
    setLoading(true)
    await dispatch(
      registerAction(value.phonenumber, "", value.password)
    );
    setLoading(false)
  };

    useEffect(() => {
      
     },[]);

   
  return (
  
    <View style={styles.container}>
 
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:register"}
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
                  uri: LOGO,
                }}
              />
            </View>
            <AppText style={styles.txtTitleForm}>
                {intl.formatMessage({
                  id: "label:description_register",
                })}
              </AppText>
            <View style={styles.viewInput}> 
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "label:phone",
                })}
                {' '}*
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
     
                    autoCapitalize="none"
                    placeholder={intl.formatMessage({
                      id: "input:input_phone",
                    })}
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
              
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "label:password",
                })}
                {' '}*
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    // leftIcon={<UserSVG />}
                    autofocus={true}
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
                    placeholder={intl.formatMessage({
                      id: "input:input_password",
                    })}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.phonenumber ? errors.phonenumber.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={!showPassword}
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
              <View style={{ height: 30 }} />
            </View>
            <AppText style={styles.txtConfirm}>
              {intl.formatMessage({
                id: "translation:agree_to_confirm_one",
              })}
              {' '}
              <AppText style={styles.txtTermsAndPolicies}>
                {intl.formatMessage({
                  id: "translation:terms_and_policies",
                })}
                {' '}
              </AppText>
              <AppText style={styles.txtConfirm}>
                {intl.formatMessage({
                  id: "translation:ours",
                })}
              </AppText>
            </AppText>
            <View style={styles.viewButton}>
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit(handleNext)}
                text={intl.formatMessage({
                  id: "label:next",
                })}
                loadingColor={COLOR.white}
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
    marginHorizontal: 15,
    marginTop: 20
  },
  vLogo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  viewInput: {
    marginTop: 20,
    // marginHorizontal: 10,
    backgroundColor: COLOR.white,
    borderRadius: 8,
    shadowColor: "#bfbebd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtTitleForm: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 15,
    fontWeight: "500",
    marginLeft: 10
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10
  },
  txtTermsAndPolicies: {
    fontSize: 13,
    fontWeight: "600",
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
  textError: {
    position: "absolute",
    color: COLOR.error,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "right",
    bottom: -40,
    right: 0,
  },
  txtConfirm: {
    marginTop: 15,
    fontSize: 13
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: "#bfbebd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonLogin: {
    width: width - 50,
    // height: 35,
    borderRadius: 4,
    // backgroundColor: COLOR.light_blue
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
});

export default RegisterScreen;

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
 
import {postAsync,site_ajax_url} from 'src/helpers/config';
import Toast from "react-native-toast-message";
import { navigate, navigateReset } from "src/navigator/RootNavigation";
import { AppRoutes } from "src/navigator/app-routes";
import {LOGO } from "src/helpers/constants"; 

const { width, height } = Dimensions.get("window");



type RegisterMutationVariables = { 
  otp: string;
};
const RegisterOTPScreen = memo((navigationRoute: any) => {
  const { route } = navigationRoute;
  const params = route?.params;

  const intl = useTranslate();
  const RegisterSchema = Yup.object().shape({ 
    otp: Yup.string().required(intl.formatMessage({ id: "input:field_required", })),
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
    setLoading(true);
    let data = params;
    data.code = value.otp;

    let result =  await postAsync(site_ajax_url("user.php?a=registestep_otp"),data);
     console.log(result);
    if(result?.data){
       if(result?.data.code==1){
         Toast.show({
          type: "success",
          text2: result?.data?.message + " 👋",
        });
          
        // navigate(AppRoutes.LOGIN);

        navigate(AppRoutes.REGISTEREMAIL,result?.data.user?result?.data.user:{});
      }else{
         Toast.show({
          type: "error",
          text2: result?.data?.error,
        });
      }
    }else{
        Toast.show({
          type: "error",
          text2: result?.data?result?.data:"Failed.",
        });
    }
    // await dispatch(
    //   registerAction(value.phonenumber, value.email, value.password)
    // );
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
                  id: "label:description_register_otp",
                })}
              </AppText>
            <View style={styles.viewInput}> 
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
     
                    autoCapitalize="none"
                    placeholder={intl.formatMessage({
                      id: "input:enter_otp",
                    })}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.otp ? errors.otp.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.otp ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                keyboardType={'numeric'}
                name="otp"
                rules={{ required: true }}
                defaultValue=""
              />
               
            </View>
             
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

export default RegisterOTPScreen;

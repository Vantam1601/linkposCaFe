import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { faEye, faEyeSlash } from 'nvquang-font-icon/pro-solid-svg-icons';
import React, { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { AppText } from 'src/components/Apptext';
import Button from 'src/components/Button';
import FastImagePlaceholder from 'src/components/FastImage';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { AppRoutes } from 'src/navigator/app-routes';
import { updateOtpAction } from 'src/old/stores/app/app.actions';
import { COLOR } from 'src/theme/color';
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get("window");

const RegisterSchema = Yup.object().shape({
  otp: Yup.string().required("* Required"),
  otp_new: Yup.string().required("* Required"),
});

type RegisterMutationVariables = {
  otp: string;
  otp_new: string
};

const ChangeOTPScreen = memo(() => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showOtpNew, setShowOtpNew] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useTranslate();
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();

  const { control, handleSubmit, errors } = useForm<RegisterMutationVariables>({
    resolver: yupResolver(RegisterSchema),
  });

  const onConfirm = async (value: RegisterMutationVariables) => { 
    if (loading) {
      return
    }
    setLoading(true)
    await dispatch(
      updateOtpAction(value.otp, value.otp_new)
    );
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
      <KeyboardAwareScrollView>
        <HeaderBack
          title={"label:update_otp"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <FastImagePlaceholder
              needProgress
              source={'https://www.k2e.com/wp-content/uploads/2018/09/change-password.png'}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
          <View style={styles.vIntroOTP}>
            <AppText
              fontSize={15}
              fontWeight={'500'}
            >
              {intl.formatMessage({
                id: 'translation:intro_update_otp',
              })}
            </AppText>
          </View>
          <View style={styles.viewMain}>
            <AppText style={styles.txtLabel}>
              {intl.formatMessage({
                id: "label:otp",
              })}
              {' '}*
            </AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowOtp(!showOtp)}
                      activeOpacity={0.6}
                    >
                      <FontAwesomeIcon
                        color={COLOR.black}
                        icon={!showOtp ? faEye : faEyeSlash}
                        size={22}
                      />
                    </TouchableOpacity>
                  }
                  autoFocus
                  autoCapitalize="none"
                  placeholder={intl.formatMessage({
                    id: "input:input_otp_old",
                  })}
                  errorStyle={styles.textError}
                  errorMessage={
                    errors.otp ? errors.otp.message : ""
                  }
                  multiline={false}
                  onChangeText={(val) => onChange(val)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={showOtp}
                  containerStyle={[
                    styles.input,
                    { marginBottom: errors.otp ? 30 : 16 },
                  ]}
                  style={styles.textInput}
                />
              )}
              name="otp"
              rules={{ required: true }}
              defaultValue=""
            />
            <AppText style={styles.txtLabel}>
              {intl.formatMessage({
                id: "label:otp_new",
              })}
              {' '}*
            </AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowOtpNew(!showOtpNew)}
                      activeOpacity={0.6}
                    >
                      <FontAwesomeIcon
                        color={COLOR.black}
                        icon={!showOtpNew ? faEye : faEyeSlash}
                        size={22}
                      />
                    </TouchableOpacity>
                  }
                  autoCapitalize="none"
                  placeholder={intl.formatMessage({
                    id: "input:input_otp_new",
                  })}
                  errorStyle={styles.textError}
                  errorMessage={
                    errors.otp_new ? errors.otp_new.message : ""
                  }
                  multiline={false}
                  onChangeText={(val) => onChange(val)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={showOtpNew}
                  containerStyle={[
                    styles.input,
                    { marginBottom: errors.otp_new ? 30 : 16 },
                  ]}
                  style={styles.textInput}
                />
              )}
              name="otp_new"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View style={styles.vButton}>
            <Button
              buttonStyle={styles.buttonUpdate}
              loading={loading}
              onPress={handleSubmit(onConfirm)}
              text={intl.formatMessage({
                id: "label:update",
              })}
              loadingColor={COLOR.bgWhite}
              textStyle={styles.txtVerify}
            />
          </View>
          <View style={styles.vButton}>
            <TouchableOpacity
              style={styles.btnDifferentWays}
              activeOpacity={0.6}
              onPress={() => navigation.navigate(AppRoutes.SUPPORT_OTP)}
            >
              <AppText
                fontSize={15}
                fontWeight='500'
              >
                {intl.formatMessage({
                  id: "label:different_ways",
                })}
                {'?'}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  viewMain: {
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
    // alignItems: 'center'
  },
  vIntroOTP: {
    marginHorizontal: 12,
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 10
  },
  vButton: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  image: {
    width: 180,
    height: 180
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

  input: {
    width: width - 40,
    height: 35,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  buttonUpdate: {
    width: width - 30,
    borderRadius: 6,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
  btnDifferentWays: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
});
export default ChangeOTPScreen;

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { COLOR } from 'src/theme/color';
import * as Yup from "yup";
import {updatePassAction} from 'src/old/stores/app/app.actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get("window");

const RegisterSchema = Yup.object().shape({
  password: Yup.string().required("* Required"),
  new_password: Yup.string().required("* Required"),
});

type RegisterMutationVariables = {
  password: string;
  new_password: string
};

const ChangePasswordScreen = memo(() => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useTranslate();
  const dispatch = useTypedDispatch();

  const { control, handleSubmit, errors } = useForm<RegisterMutationVariables>({
    resolver: yupResolver(RegisterSchema),
  });

  const onConfirm = async (value:RegisterMutationVariables) => { 
    if (loading) {
      return
    }
    setLoading(true)
    await dispatch(
      updatePassAction(value.password, value.new_password)
    );
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
      <KeyboardAwareScrollView>
        <HeaderBack
          title={"label:update_password"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>

          <View style={styles.viewMain}>
            <View style={{ alignItems: 'center' }}>
              <FastImagePlaceholder
                needProgress
                source={'https://www.k2e.com/wp-content/uploads/2018/09/change-password.png'}
                resizeMode="stretch"
                style={styles.image}
              />
            </View>
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
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.6}
                    >
                      <FontAwesomeIcon
                        color={COLOR.black}
                        icon={!showPassword ? faEye : faEyeSlash}
                        size={22}
                      />
                    </TouchableOpacity>
                  }
                  autoFocus
                  autoCapitalize="none"
                  placeholder={intl.formatMessage({
                    id: "input:input_password",
                  })}
                  errorStyle={styles.textError}
                  errorMessage={
                    errors.password ? errors.password.message : ""
                  }
                  multiline={false}
                  onChangeText={(val) => onChange(val)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={showPassword}
                  containerStyle={[
                    styles.input,
                    { marginBottom: errors.password ? 30 : 16 },
                  ]}
                  style={styles.textInput}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            <AppText style={styles.txtLabel}>
              {intl.formatMessage({
                id: "label:password_new",
              })}
              {' '}*
            </AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  // leftIcon={<UserSVG />}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPasswordNew(!showPasswordNew)}
                      activeOpacity={0.6}
                    >
                      <FontAwesomeIcon
                        color={COLOR.black}
                        icon={!showPasswordNew ? faEye : faEyeSlash}
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
                    errors.new_password ? errors.new_password.message : ""
                  }
                  multiline={false}
                  onChangeText={(val) => onChange(val)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={showPasswordNew}
                  containerStyle={[
                    styles.input,
                    { marginBottom: errors.new_password ? 30 : 16 },
                  ]}
                  style={styles.textInput}
                />
              )}
              name="new_password"
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
                loadingColor={COLOR.white}
                textStyle={styles.txtVerify}
              />
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
  vButton: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
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

  txtConfirm: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
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
    width: width - 60,
    borderRadius: 6,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  }
});
export default ChangePasswordScreen;

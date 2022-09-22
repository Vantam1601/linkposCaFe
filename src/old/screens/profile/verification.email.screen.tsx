import React, { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { verificationEmaiAction } from "src/old/stores/app/app.actions";
import Input from "src/components/AppInputElement";
import { validateEmail } from "src/helpers/constants";

const emailRegex = /^[a-zA-Z][a-zA-Z0-9_.]{1,32}@[a-zA-Z0-9_-]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/;
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("* Required")
    .test("emailValid", "Email của bạn không hợp lệ", (val: string) => {
      return emailRegex.test(val);
    }),
});
type EmailMutationVariables = {
  email: string;
};

const { width } = Dimensions.get("window");

const VerificationEmailScreen = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const intl = useTranslate();
  const dispatch = useTypedDispatch();

  const { control, handleSubmit, errors } = useForm<EmailMutationVariables>({
    resolver: yupResolver(EmailSchema),
  });
  const handleRestore = async (value: EmailMutationVariables) => {
    if (loading) {
      return;
    }
    setLoading(true);
    await dispatch(verificationEmaiAction(value.email));
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack title={"label:email"} />
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
          <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
            <View style={styles.viewImage}>
              <FastImagePlaceholder
                needProgress
                source={
                  "https://img.freepik.com/free-vector/approved-email-digital-mail-letter-message-notice-check-mark-document-online-laptop-computer_212005-281.jpg?size=626&ext=jpg"
                }
                // resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={styles.viewLable}>
              <AppText fontSize={15} style={styles.txtTitle} fontWeight="600">
                {intl.formatMessage({
                  id: "label:verification_email",
                })}
              </AppText>
              <AppText fontSize={14} style={styles.txtTitle}>
                {intl.formatMessage({
                  id: "translation:enter_email_code_for_verification",
                })}
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoFocus
                    autoCapitalize="none"
                    placeholder={intl.formatMessage({
                      id: "input:input_email",
                    })}
                    errorStyle={styles.textError}
                    errorMessage={errors.email ? errors.email.message : ""}
                    multiline={false}
                    onChangeText={(val: string) => {
                      onChange(val);
                      setEmail(val);
                    }}
                    onBlur={onBlur}
                    value={value}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.email ? 50 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit(handleRestore)}
                text={intl.formatMessage({
                  id: "label:restore",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtVerify}
              />
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
  },
  viewImage: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 125,
    height: 92,
    overflow: "hidden",
  },
  viewLable: {
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  txtTitle: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
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
  buttonLogin: {
    width: width - 55,
    marginTop: 10,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white,
  },
});

export default VerificationEmailScreen;

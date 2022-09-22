import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";

const { width } = Dimensions.get("window");

const InserOtpSchema = Yup.object().shape({
  code: Yup.string().required("* Required"),
});

type InserOtpVariables = {
  code: string;
};

const InsertCodeScreen = memo(() => {
  const intl = useTranslate();
  const { control, handleSubmit, errors } = useForm<InserOtpVariables>({
    resolver: yupResolver(InserOtpSchema),
  });

  const onTalk = (value: InserOtpVariables) => {};
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack title={"home:enter_the_code"} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
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
            <View style={styles.vMain}>
              <View style={styles.vImage}>
                <Image
                  source={{
                    uri:
                      "https://images.assetsdelivery.com/compings_v2/rusya8/rusya82004/rusya8200400067.jpg",
                  }}
                  style={{ width: "98%", height: 150 }}
                  resizeMode="stretch"
                />
              </View>
              <AppText style={{ marginTop: 5, lineHeight: 20, fontSize: 15 }}>
                {intl.formatMessage({
                  id:
                    "Nhập mã giới thiệu để nhận thưởng. Chỉ áp dụng cho người mới tham gia lần đầu tiên.",
                })}
              </AppText>
              <View style={styles.vInput}>
                <View>
                  <AppText style={styles.txtLabel}>
                    {intl.formatMessage({
                      id: "home:referral_code",
                    })}{" "}
                    *
                  </AppText>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <Input
                        autoFocus
                        autoCapitalize="none"
                        errorStyle={styles.textError}
                        errorMessage={errors.code ? errors.code.message : ""}
                        placeholder={intl.formatMessage({
                          id: "input:input_code",
                        })}
                        multiline={false}
                        onChangeText={(val: any) => onChange(val)}
                        onBlur={onBlur}
                        value={value}
                        inputContainerStyle={{
                          borderColor: COLOR.borderWhiteGray,
                          borderBottomWidth: 1,
                        }}
                        containerStyle={[
                          styles.input,
                          { marginBottom: errors.code ? 30 : 16 },
                        ]}
                        style={styles.textInput}
                      />
                    )}
                    name="code"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                </View>
                <TouchableOpacity
                  style={styles.vButtonTake}
                  onPress={handleSubmit(onTalk)}
                >
                  <AppText style={styles.txtTalk}>
                    {intl.formatMessage({
                      id: "home:take",
                    })}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.vAccumulate}>
              <Button
                buttonStyle={styles.buttonLogin}
                onPress={() => {}}
                text={intl.formatMessage({
                  id: "home:accumulate",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtTalk}
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
  vMain: {
    paddingVertical: 15,
    marginTop: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  },
  vImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: COLOR.borderWhiteGray,
  },
  vInput: {
    flexDirection: "row",
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10,
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
    width: 250,
    height: 35,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  vButtonTake: {
    marginTop: 15,
    position: "absolute",
    right: 8,
    width: 60,
    height: 50,
    backgroundColor: COLOR.main_color,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTalk: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOR.textWhite,
  },
  vAccumulate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonLogin: {
    width: width - 100,
  },
});

export default InsertCodeScreen;

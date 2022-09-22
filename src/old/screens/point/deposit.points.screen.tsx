import React, { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { dataLoadPoint } from "src/old/mocks/dataWalletPoint";
import { amountFormat } from "src/helpers/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "src/components/RadioButton";
import Button from "src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { postLoadPointActions } from "src/old/stores/app/app.actions";
import Input from "src/components/AppInputElement";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const LoadPointSchema = Yup.object().shape({
  money: Yup.string().required("* Required"),
});
type LoadPointMutationVariables = {
  money: string;
};

const { width } = Dimensions.get("window");

const LoadsPointScreen = memo(() => {
  const [selectBank, setSelectBank] = useState<number>(0);
  const [bank, setBank] = useState<string>("bank");
  const [money, setMoney] = useState<string>("");
  const [isIndex, setIsIndex] = useState<number>(-1);
  const config: any = useTypedSelector((state) => state.app.appJson);

  const intl = useTranslate();
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();

  const { control, handleSubmit, errors } = useForm<LoadPointMutationVariables>(
    {
      resolver: yupResolver(LoadPointSchema),
    }
  );

  const onSelectBank = (type: any) => {
    let bank = "";
    if (type === 0) {
      bank = "bank";
      setSelectBank(type);
    } else {
      bank = "momo";
      setSelectBank(type);
    }
    setBank(bank);
  };
  const onSelectMoney = (value: string, index: any) => {
    if (value === "label:others") {
      setMoney("");
      setIsIndex(index);
    } else {
      setMoney(value);
      setIsIndex(index);
    }
  };
  const onContinue = async () => {
    let respone: any;
    respone = await dispatch(postLoadPointActions(amountFormat(money), bank));
    if (respone && respone.data.code === 1) {
      navigation.navigate(AppRoutes.DETAIL_LOAD_POINT, respone.data);
    }
  };
  const onChangeMoney = (txt: string) => {
    setMoney(txt);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          rightPress={onContinue}
          isReady
          titleRight={"label:continue"}
          title={"label:deposit_point"}
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
            <View style={styles.vMain}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "label:amount_of_money",
                })}{" "}
                *
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoFocus
                    autoCapitalize="none"
                    placeholder={intl.formatMessage({
                      id: "input:input_money",
                    })}
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.money && money === "" ? errors.money.message : ""
                    }
                    multiline={false}
                    onChangeText={(val: string) => {
                      onChangeMoney(val);
                      onChange(val);
                    }}
                    onBlur={onBlur}
                    value={money}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.money && money === "" ? 50 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="money"
                rules={{ required: true }}
                defaultValue=""
              />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: 10,
                  // justifyContent: "center",
                }}
              >
                {dataLoadPoint?.map((item: any, index: number) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    onPress={() => onSelectMoney(item, index)}
                    style={[
                      styles.vItemMoney,
                      {
                        backgroundColor:
                          isIndex === index
                            ? COLOR.bgBlue_bland
                            : COLOR.contentColor,
                      },
                    ]}
                  >
                    <AppText style={styles.txtMoney}>
                      {intl.formatMessage({
                        id: item,
                      })}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View
              style={[
                styles.vMain,
                { paddingHorizontal: 5, paddingVertical: 8 },
              ]}
            >
              <RadioButton
                titleRight={"translation:transfer_payments"}
                onPress={onSelectBank}
                type={0}
                stylesProps={selectBank == 0 ? COLOR.light_blue : "gray"}
              />
              <RadioButton
                titleRight={"translation:payment_momo"}
                onPress={onSelectBank}
                type={1}
                stylesProps={selectBank == 1 ? COLOR.light_blue : "gray"}
              />
            </View>
            <View style={[styles.vMain, { paddingHorizontal: 10 }]}>
              <AppText style={styles.txtMoney}>
                {config?.wallet?config.wallet.point.deposit.rate:""}
              </AppText>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button
                buttonStyle={styles.buttonLogin}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: AppRoutes.HOME_TAB }],
                  })
                }
                text={intl.formatMessage({
                  id: "translation:go_back_home",
                })}
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
  vMain: {
    marginHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    paddingVertical: 12,
    backgroundColor: COLOR.bgWhite,
    margin: 12,
    marginBottom: 0,
    borderRadius: 6,
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
    width: width - 30,
    height: 35,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 10,
  },
  txtMoney: {
    fontSize: 15,
    textAlignVertical: "center",
  },
  vItemMoney: {
    width: 100,
    height: 62,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 5,
    borderColor: COLOR.borderWhiteGray,
  },
  buttonLogin: {
    width: width - 20,
    borderRadius: 6,
    marginTop: 10,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white,
  },
});

export default LoadsPointScreen;

import React, { memo, useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, TextInput, Platform, Text, Dimensions } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import moment from "moment"
import Button from 'src/components/Button';
import HeaderBack from 'src/components/HeaderBack';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { AppInput } from 'src/components/AppInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get("window");
const arrPIN = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]

const VerificationPhoneScreen = memo(() => {
  const inputOTP = useRef<TextInput>(null)
  const [otp, setOtp] = useState("")
  const [remind, setRemind] = useState("")
  const [loading, setLoading] = useState<boolean>(false);
  const [nextTime, setNextTime] = useState(
    moment()
      .add(60, "second")
      .toDate(),
  )

  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  
  useEffect(() => {
    setRemind("60")
  }, [nextTime])

  useEffect(() => {
    Platform.OS === "ios"
      ? inputOTP?.current?.focus()
      : setTimeout(() => inputOTP?.current?.focus(), 40)
  }, [])

  useEffect(() => {
    // CountDown
    if (remind.length === 0) return
    const intervalId = setInterval(() => {
      if (nextTime > new Date()) {
        const second = Math.ceil((nextTime.getTime() - new Date().getTime()) / 1000)
        const remindStr = `${second}`
        setRemind(remindStr)
      } else {
        if (remind.length > 0) {
          setRemind("0")
        }
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [remind])

  const resend = async () => {
    if (nextTime > new Date()) return
    setNextTime(
      moment()
        .add(60, "second")
        .toDate(),
    )

  }
  const numberTextOnly = (numberString: string): string => {
    const numberic = "0123456789"
    const arr = numberString.split("")
    let result = ""
    for (let i = 0; i < arr.length; i++) {
      if (numberic.indexOf(arr[i]) !== -1) {
        result += String(arr[i])
      }
    }
    return result
  }
  const renderInput = () => {
    return (
      <AppInput
        ref={inputOTP}
        textContentType="oneTimeCode"
        value={otp}
        onChangeText={async text => {
          setOtp(numberTextOnly(text))
        }}
        style={styles.styleInput}
        keyboardType="numeric"
        maxLength={4}
        underlineColorAndroid="transparent"
      />
    )
  }

  const renderPin = () => {
    return arrPIN.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={otp.length === item.id ? styles.containerInputActive : styles.containerInput}
          onPress={() => {
            if (inputOTP?.current?.isFocused?.()) {
              inputOTP?.current?.blur?.()
            }
            inputOTP?.current?.focus()
          }}
        >
          <Text style={styles.textInputOtp}>{otp.slice(item.id, item.id + 1)}</Text>
        </TouchableOpacity>
      )
    })
  }
  const onSentConfirmation = () => { }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack
        title={"label:phone"}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
      <KeyboardAwareScrollView>
        <View style={styles.vMain}>
          <AppText
            fontSize={15}
            style={styles.txtTitle}
            fontWeight="600"
          >
            {intl.formatMessage({
              id: 'translation:send_otp_verification_code_to_phone_number',
            })}
          </AppText>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              if (inputOTP?.current?.isFocused?.()) {
                inputOTP?.current?.blur?.()
              }
              inputOTP?.current?.focus?.()
            }}
          >
            {renderInput()}
            <View style={styles.boxOtp}>{renderPin()}</View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 30,
            }}
          >
            <AppText
              fontSize={14}
              style={remind ? styles.actionText : styles.actionTextActive}>
              {intl.formatMessage({
                id: 'translation:rest',
              })}
              {`: ${remind}`}
            </AppText>
            <TouchableOpacity onPress={resend} >
              <AppText
                fontSize={14}
                style={styles.actionTextActive}>
                {intl.formatMessage({
                  id: 'translation:send_to',
                })}
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            fontSize={14}
            style={styles.txtTerms}
          >
            {intl.formatMessage({
              id: 'translation:otp_policy_terms',
            })}
            {' '}
            <AppText
              fontSize={15}
              fontWeight='600'
              style={styles.txtPolicies}
            >
              {intl.formatMessage({
                id: 'translation:terms_and_policies',
              })}
            </AppText>
            {' '}
            <AppText
              fontSize={14}
              style={styles.txtTerms}
            >
              {intl.formatMessage({
                id: 'translation:ours',
              })}
            </AppText>
          </AppText>
        </View>
        <Button
          buttonStyle={styles.buttonLogin}
          loading={loading}
          onPress={onSentConfirmation}
          text={intl.formatMessage({
            id: "label:sent_confirmation",
          })}
          loadingColor={COLOR.white}
          textStyle={styles.txtLogin}
        />
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
  boxOtp: {
    flexDirection: "row",
    marginTop: 8,
  },
  styleInput: {
    height: 0,
    backgroundColor: COLOR.white,
  },
  containerInputActive: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#3080ea',
    borderRadius: 45 / 2,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",

  },
  containerInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#dedfe2',
    borderRadius: 45 / 2,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputOtp: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2f3136'
  },
  vMain: {
    paddingVertical: 15,
    marginTop: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
    // alignItems: 'center'
  },
  txtTitle: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  actionText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.black
  },
  actionTextActive: {
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.black
  },
  txtTerms: {
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 20
  },
  txtPolicies: {
    color: COLOR.blue,
    lineHeight: 20
  },
  buttonLogin: {
    width: width - 20,
    marginLeft: 10,
    marginTop: 20,
  },
  txtLogin: {
    fontSize: 14,
    color: COLOR.white
  },
});

export default VerificationPhoneScreen;

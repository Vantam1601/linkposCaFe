import React, { memo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, Dimensions } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import Button from 'src/components/Button';
import { postConfirmWithdrawActions } from 'src/old/stores/app/app.actions';
import { amountFormat } from 'src/helpers/constants';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window");

const TransferPaymentScreen = memo((navigationRoute: any) => {
  const { route } = navigationRoute;
  const params = route?.params?.value;
  const money = route?.params?.money;
  const bank = route?.params?.bank;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const onConfirm = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    let response: any;
    response = await dispatch(postConfirmWithdrawActions(amountFormat(money), bank));
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={bank === "bank" ? "label:transfer_payments" : "translation:payment_via_momo"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vTextInstruct}>
              <AppText
                fontSize={15}>
                {intl.formatMessage({
                  id: bank === "bank" ? 'label:your_account' : "momo_account",
                })}
                {': '}
                {bank === "momo" && params?.momo}
              </AppText>
            </View>
            <View style={[styles.vItemGift]}>
              {bank === "bank" &&
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={styles.vDot} />
                  <AppText
                    fontSize={14}
                    fontWeight='500'
                  >
                    {intl.formatMessage({
                      id: 'translation:bank_account',
                    })}
                    {': '}
                    {params?.bank_name}
                  </AppText>
                </View>
              }
              {bank === "bank" &&
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={styles.vDot} />
                  <AppText
                    fontSize={14}
                    fontWeight='500'
                  >
                    {intl.formatMessage({
                      id: 'label:account_name',
                    })}
                    {': '}
                    {params?.name_account}
                  </AppText>
                </View>
              }
              {bank === "bank" &&
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={styles.vDot} />
                  <AppText
                    fontSize={14}
                    fontWeight='500'
                  >
                    {intl.formatMessage({
                      id: 'label:account_number',
                    })}
                    {': '}
                    {params?.account}
                  </AppText>
                </View>
              }
              <AppText
                fontSize={14}
              >
                {intl.formatMessage({
                  id: 'translation:pay_attention',
                })}
              </AppText>
            </View>
            <View style={[styles.vItemGift]}>
              <View style={styles.vTransactionFee}>
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:transaction_fee',
                  })}
                  {': '}
                  {params?.account}
                </AppText>
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {'0'}
                </AppText>
              </View>
              <View style={styles.vTotal}>
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:total',
                  })}
                  {': '}
                  {params?.account}
                </AppText>
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {money}
                </AppText>
              </View>
            </View>
            <View style={styles.vButton}>
              <Button
                buttonStyle={styles.buttonUpdate}
                loading={loading}
                onPress={onConfirm}
                text={intl.formatMessage({
                  id: "label:confirm",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtVerify}
              />
            </View>
          </View>
        </ScrollView>
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
  },
  vItemGift: {
    backgroundColor: COLOR.white,
    marginTop: 12,
    borderRadius: 6,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.72,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  vDot: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: COLOR.black,
    marginRight: 10,
  },
  vTextInstruct: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  vTransactionFee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderWhiteGray,
    paddingVertical: 10
  },
  vTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  vButton: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
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

export default TransferPaymentScreen;

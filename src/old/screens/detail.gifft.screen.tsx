import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, Dimensions } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import AccountPoint from './profile/AccountPoint';
import AccountPointProgres from './profile/AccountPointProgres';
import { getListGiftAcction, postConfirmGiftActions } from 'src/old/stores/app/app.actions';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { HistoryToday, ListGift } from 'src/old/type/interface';
import { amountFormat } from 'src/helpers/constants';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/app-routes'; import FastImagePlaceholder from 'src/components/FastImage';
import Button from 'src/components/Button';

const { width } = Dimensions.get("window");
const DetailGiftScreen = memo((navigationRoute: any) => {
  const { route } = navigationRoute;
  const params = route?.params?.value;
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const intl = useTranslate();
  const dispatch = useTypedDispatch();

  const onConfirm = async () => {
    setMessage('')
    if (loading) {
      return
    }
    setLoading(true)
    let response: any;
    response = await dispatch(postConfirmGiftActions(params?.id));
    if (response && response.data.code === 1) {
      setMessage(response.data?.message)
    }else{
      setMessage(response.data?.error)
    }
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={params?.title}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View
              style={[styles.vItemGift]}>
              <FastImagePlaceholder
                needProgress
                source={params?.image}
                resizeMode="contain"
                style={[styles.imgItem]}
              />
            </View>
            <View
              style={[styles.vItemGift]}>
              <AppText
                fontSize={15}
                fontWeight='600'
              >
                {params?.title}
              </AppText>
              <AppText
                fontSize={15}
                fontWeight='500'
              >
                {intl.formatMessage({
                  id: 'label:redemption_points',
                })}
                : {amountFormat(params?.point)}
              </AppText>
            </View>
            {
              message?.length > 0 &&
              <View style={[styles.vError]}>
                <AppText
                  fontSize={15}
                >
                  {message}
                </AppText>
              </View>
            }
            <View style={styles.vButton}>
              <Button
                buttonStyle={styles.buttonConfirm}
                loading={loading}
                onPress={onConfirm}
                text={intl.formatMessage({
                  id: "label:receiving_gifts",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtConfirm}
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
  imgItem: {
    width: 200,
    height: 150,
  },
  vItemGift: {
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
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
  vError: {
    backgroundColor: COLOR.contentColor,
    borderWidth: 1,
    borderColor: COLOR.borderWhiteGray,
    justifyContent: 'center',
    alignItems: 'center',
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
  vButton: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  buttonConfirm: {
    width: width - 30,
    borderRadius: 6,
  },
  txtConfirm: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  }
});

export default DetailGiftScreen;

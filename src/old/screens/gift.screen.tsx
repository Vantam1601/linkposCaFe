import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, Dimensions } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import AccountPoint from './profile/AccountPoint';
import AccountPointProgres from './profile/AccountPointProgres';
import { getListGiftAcction } from 'src/old/stores/app/app.actions';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { HistoryToday, ListGift } from 'src/old/type/interface';
import { amountFormat } from 'src/helpers/constants';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/app-routes'; import FastImagePlaceholder from 'src/components/FastImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
;

const { width } = Dimensions.get("window");

const points = 100000;
const GiftScreen = memo(() => {
  const [intPoint, setIntPoint] = useState<number>(0);
  const [dataGift, setDataGift] = useState<ListGift[]>([]);

  const intl = useTranslate();
  const navigation = useNavigation();

  const dispatch = useTypedDispatch();
  useEffect(() => {
    getListGift()
  }, [])
  const getListGift = async () => {
    let response: any;
    response = await dispatch(getListGiftAcction())
    if (response && response.data) {
      let int = response?.data?.point
      let arr = response?.data?.gift
      setIntPoint(int);
      setDataGift(arr.reverse())
    }
  };
  const onHistory = () => { }
  const onNavigator = (value: any) => {
    navigation.navigate(AppRoutes.DETAIL_GIFT, { value })
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          rightPress={onHistory}
          isReady
          titleRight={"label:register"}
          title={"label:gift"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vPointProgres}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText style={[styles.txtRankProcessPoint, { marginRight: 5 }]}>
                  {`${intPoint} `}
                  {intl.formatMessage({
                    id: 'label:point',
                  })}
                </AppText>
              </View>
              <AccountPointProgres />
              <AppText style={styles.txtRankProcessPoint}>
                {amountFormat(points - intPoint)}
                {' '}
                {intl.formatMessage({
                  id: 'label:point',
                })}
                {' '}
                {intl.formatMessage({
                  id: 'translation:you_can_exchange_gifts',
                })}
              </AppText>
            </View>
            <View style={styles.vTextGift}>
              <AppText
                fontSize={15}>
                {intl.formatMessage({
                  id: 'label:list_gift',
                })}
              </AppText>
              {
                dataGift.length > 0 && dataGift?.map((e, i) => {
                  return (
                    <View
                      key={i}
                      style={[styles.vItemGift]}>
                      <FastImagePlaceholder
                        needProgress
                        source={e.image}
                        // resizeMode="contain"
                        style={[styles.imgItem]}
                      />
                      <TouchableOpacity
                        onPress={() => onNavigator(e)}
                        style={{ marginTop: 5, marginHorizontal: 10 }}>
                        <AppText
                          color={COLOR.txtBlackGray}
                          fontSize={13}
                        >
                          {amountFormat(e?.point)}

                        </AppText>
                        <View style={{ height: 5 }} />
                        <AppText
                          fontSize={15}
                          color={COLOR.txtBlackGray}
                          fontWeight='600'
                        >
                          {e?.title}
                        </AppText>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
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
  vPointProgres: {
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: COLOR.bgShiny_black,
    paddingHorizontal: 10,
  },
  txtRankProcessPoint: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
    color: COLOR.textWhite
  },
  vTextGift: {
    marginTop: 10,
  },
  imgItem: {
    width: 75,
    height: 75,
  },
  vItemGift: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
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
  }
});

export default GiftScreen;

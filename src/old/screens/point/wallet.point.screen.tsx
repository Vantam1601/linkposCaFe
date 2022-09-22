import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import AccountPoint from 'src/old/screens/profile/AccountPoint';
import AccountPointProgres from 'src/old/screens/profile/AccountPointProgres';
import { getHistoryTodayAcction } from 'src/old/stores/app/app.actions';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { HistoryToday } from 'src/old/type/interface';
import { amountFormat } from 'src/helpers/constants';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/app-routes';
import { IconLoadPoint } from 'src/assets/svg';

const points = 100000;
const WalletPointScreen = memo(() => {
  const [intPoint, setIntPoint] = useState<number>(0);
  const [dataHistory, setDataHistory] = useState<HistoryToday[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useTranslate();
  const navigation = useNavigation();

  const dispatch = useTypedDispatch();
  useEffect(() => {
    getHistory()
  }, [])
  const getHistory = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    let response: any;
    response = await dispatch(getHistoryTodayAcction())
    if (response && response.data) {
      let int = response?.data?.in
      let arr = response?.data?.t
      setIntPoint(int);
      setDataHistory(arr.reverse())
    }
    setLoading(false)
  };
  const onHistory = () => {
    
    navigation.navigate(AppRoutes.HistoryWalletScreen)
  }
  const onNavigator = (value: any) => {
    switch (value) {
      case 'LoadPoint':
        navigation.navigate(AppRoutes.LOAD_POINT)
        break;
      case 'WithdrawPoint':
        navigation.navigate(AppRoutes.WITHDRAW_POINT, { intPoint })
        break;
      default:
        return;
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          rightPress={onHistory}
          isReady
          titleRight={"label:history"}
          title={"label:point_wallet"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vPointProgres}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText style={styles.txtRankProcessPoint}>
                  {intl.formatMessage({
                    id: 'label:total',
                  })}
                </AppText>
                <AppText style={[styles.txtRankProcessPoint, { marginRight: 5 }]}>
                  {`${intPoint}đ`}
                </AppText>
              </View>
              <AccountPointProgres />
              <AppText style={styles.txtRankProcessPoint}>
                {amountFormat(points - intPoint)}
                {intl.formatMessage({
                  id: 'label:point',
                })}
                {' '} 
                {intl.formatMessage({
                  id: 'translation:you_can_exchange_gifts',
                })}
              </AppText>
            </View>
            <View style={styles.vCashInCashOut}>
              <TouchableOpacity
                style={styles.vCashIn}
                activeOpacity={0.7}
                onPress={() => onNavigator('LoadPoint')}
              >
                <AppText
                  color={COLOR.textWhite}
                  fontWeight='600'
                  fontSize={15}>
                  {intl.formatMessage({
                    id: 'label:deposit_point',
                  })}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vCashIn}
                activeOpacity={0.7}
                onPress={() => onNavigator('WithdrawPoint')}
              >
                <AppText
                  color={COLOR.textWhite}
                  fontWeight='600'
                  fontSize={15}>
                  {intl.formatMessage({
                    id: 'label:withdraw_point',
                  })}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.vTextHistory}>
              <AppText
                fontSize={15}>
                {intl.formatMessage({
                  id: 'translation:recent_transactions',
                })}
              </AppText>
            </View>
            <View style={styles.vHistory}>
              {loading ?
                <View style={styles.vLoadMoreView}>
                  <ActivityIndicator size="small" />
                </View>
                :
                <View>
                  {dataHistory.length > 0 && dataHistory?.map((e, i) => {
                    let stt: any;
                    let color: any;
                    if (e.status === "complete") {
                      stt = "label:complete";
                      color = COLOR.txtGreen
                    } else if (e.status === "pending") {
                      stt = "label:pending";
                      color = COLOR.textBlue
                    }
                    let trims: any;
                    trims = e.title;
                    return (
                      <View key={i} style={[styles.vItemHistory, { borderBottomWidth: dataHistory.length === i ? 0 : 1 }]} >
                        <View style={styles.status_point}>
                           <AppText
                            color={color}
                            fontSize={15}>
                            {intl.formatMessage({
                              id: stt,
                            })} 
                          </AppText>
                          <AppText
                          fontSize={15}
                          fontWeight='600'
                        >
                          {`${e.type}${amountFormat(e.point)}`}
                          {/* {`${e.type}${e.point}`} */}
                        </AppText>
                        </View>
                        <View style={styles.vContentHistory}>
                          <AppText fontSize={15}> {trims.trim()} </AppText>
                          <AppText style={{ marginTop: 5 }} fontSize={13}>
                            {e.created_date}
                          </AppText>
                        </View>
                        
                      </View>
                    )
                  })}
                </View>
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
  status_point : {display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems:'center'},
  vMain: {
    marginHorizontal: 12,
  },
  itemContent: {
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
    padding: 12,
    backgroundColor: COLOR.bgShiny_black,
    margin: 12,
    marginBottom: 0,
    borderRadius: 8
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
  vCashInCashOut: {
    flex: 1,
    height: 120,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  vCashIn: {
    width: 140,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.bgBlue_bland
  },
  vTextHistory: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  vHistory: {
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
    padding: 12,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
    borderTopLeftRadius: 35,
  },
  vContentHistory: {
    flex: 1,
    marginHorizontal: 20,
  },
  vItemHistory: {
    flexDirection: 'row',
    paddingVertical: 15,
    // borderBottomWidth: 1,
    borderBottomColor: COLOR.borderGray
  },
  vLoadMoreView: {
    marginHorizontal: 20,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WalletPointScreen;

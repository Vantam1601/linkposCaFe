import React, { memo, useState } from "react";
import { Alert, Dimensions, Image, Linking, Platform, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment";
import ViewAds from "src/components/ViewAds";
import { getCheckinAction } from "src/old/stores/app/app.actions";
import Button from "src/components/Button";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
 
const { width, height } = Dimensions.get("window");

const CheckInScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setSetData] = useState<any>([]);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showAds, setShowAds] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [maxDate, setMaxDate] = useState<any>(new Date());


  // let now = moment(`${currentYear}-${currentMonth}`, "YYYY-MM").daysInMonth()
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   let result: any = await dispatch(getListWifiAction());
  //   if (result && result?.data) {
  //     setSetData(result?.data);
  //   }
  //   setLoading(false);
  // };

  const onSelectDate = (value: any) => {
    const date = moment(value?.dateString).format('YYYY-MM-DD');
    setValue(value)
    setDate(date)
    setShowAds(true);
  }

  const getCheckInDetail = async () => {
    let rs: any = await dispatch(getCheckinAction(value?.day))
    if (rs && rs?.data?.length > 0) {
      Alert.alert(rs?.data)
    }
  }

  const onShare = async () => {
    let url: string = `https://knbc.vn/?r=${user?.username}`
    try {
      const result = await Share.share({
        title: 'KBNC',
        message: `${url}`,
        url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
    }
  };
  const onNavigater = () => {
    navigation.navigate(AppRoutes.REGULATION)
  }

  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack
        title={"label:check_in"}
        isReady
        rightPress={onNavigater}
        titleRight={"home:regulation"}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vCard}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "home:checkin_day_point",
                })}
              </AppText>
              <Calendar
                style={{
                  borderRadius: 8,
                  borderColor: 'gray',
                  backgroundColor: '#f3f3f3',
                  height: 320,
                  margin: 10,
                }}
                onDayPress={(txt) => onSelectDate(txt)}
                // minDate={new Date()}
                markedDates={{
                  [date]: { selected: true, selectedColor: COLOR.black },
                }}
                theme={{
                  textDayFontWeight:"600",
                  textDayFontSize: 14,
                  todayTextColor: COLOR.textBlue,
                  monthTextColor: COLOR.black,
                  textMonthFontWeight: '500',
                  calendarBackground:  '#f3f3f3',
                  arrowColor: COLOR.black,
                  textSectionTitleColor: COLOR.black
                }}
              />
            </View>
            <View style={[{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }]}>
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={onShare}
                text={intl.formatMessage({
                  id: "home:invite_friends",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtLogin}
              />
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://ahlustore.com/?open=true')}
              style={[styles.vCard, { justifyContent: 'center', alignItems: 'center', marginTop: 40 }]}>
              <Image
                resizeMode='stretch'
                style={{ width: '95%', height: 70 }}
                source={{ uri: 'https://hcm.ahlupos.com/test/game/wheel/demo/view/demodata/ads/more4.jpeg' }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {showAds ? (
        <ViewAds
          show={showAds}
          onDone={() => {
            setShowAds(false);
            getCheckInDetail();
          }}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  vMain: {
    marginHorizontal: 12
  },
  vCard: {
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
    marginVertical: 12,
    marginBottom: 0,
    borderRadius: 6,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "500",
    marginLeft: 8,
    marginTop: 5,
  },
  buttonLogin: {
    height: 40,
    width: width - 60,
    backgroundColor: COLOR.bgRedFresh
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
});

export default CheckInScreen;

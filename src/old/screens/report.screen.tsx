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
import Input from "src/components/AppInputElement";
// import MapboxGL from "@react-native-mapbox-gl/maps";
// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiYWhsdSIsImEiOiJja3B0ODM0aXEwMHUzMnZyM21tdnNzc2FvIn0.6dAfESP_bzUMu9t9j2dNSQ"
// );

const { width, height } = Dimensions.get("window");

const ReportScreen = memo((navigationRoute: any) => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const navigation = useNavigation();
  const { route } = navigationRoute;
  const params = route?.params?.value;

  console.log("params", params);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setSetData] = useState<any>([]);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showAds, setShowAds] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [maxDate, setMaxDate] = useState<any>(new Date());

  const [keyword, setKeyWord] = useState<string>('');

  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack
        title={"label:check_in"}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vTextTitle}>
              <AppText
                fontSize={14}>
                {intl.formatMessage({
                  id: 'history:you_want_to_post',
                })}
              </AppText>
            </View>
            <View style={styles.vCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "history:date_created",
                  })}
                </AppText>
                <AppText fontSize={15}>{params?.created_date}</AppText>
                {/* <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "home:checkin_day_point",
                })}
              </AppText> */}
              </View>
              <View style={[styles.vTextTitle, { marginHorizontal: 10, marginTop: 40 }]}>
                <AppText
                  numberOfLines={10}
                  fontSize={16}>
                  {params?.description}
                </AppText>
              </View>
            </View>
            <AppText fontSize={15} style={{ marginVertical: 15 }}>
              {intl.formatMessage({
                id: "home:report_post_is_not_true",
              })}
            </AppText>
            <View style={[styles.vCard, { paddingHorizontal: 10 }]}>
              <AppText fontSize={16} fontWeight='600'>
                {intl.formatMessage({
                  id: "home:content_report",
                })}
              </AppText>
              <Input
                autoCapitalize="none"
                multiline
                onChangeText={(val: string) => {
                  setKeyWord(val)
                }}
                placeholder={intl.formatMessage({
                  id: "home:content_report",
                })}
                value={keyword}
                containerStyle={[
                  styles.input,
                  { marginBottom: 5, marginTop: 10, width: '90%' },
                ]}
                style={styles.textInput}
              />
            </View>
            <View style={{height:1, backgroundColor: COLOR.borderWhiteGray}}/>
          </View>
        </ScrollView>
      </SafeAreaView>

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
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  input: {
    // width: '100%',
    // height: 50,
    // backgroundColor: COLOR.white,
    // textAlignVertical: "center",
    // borderWidth: 0.5,
    // borderRadius: 4,
    // borderColor: COLOR.borderWhiteGray
  },
  textInput: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
});

export default ReportScreen;

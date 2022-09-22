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
// import MapboxGL from "@react-native-mapbox-gl/maps";
// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiYWhsdSIsImEiOiJja3B0ODM0aXEwMHUzMnZyM21tdnNzc2FvIn0.6dAfESP_bzUMu9t9j2dNSQ"
// );

const { width, height } = Dimensions.get("window");

const RegulationScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const user = useCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setSetData] = useState<any>([]);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showAds, setShowAds] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack title={"home:regulation"} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vCard}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "home:program_stipulations",
                })}
              </AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <View style={styles.vDot} />
                <View style={{ flexDirection: 'row' }}>
                  <AppText style={{ lineHeight: 20 }}>
                    {intl.formatMessage({
                      id: "home:checkin_7day",
                    })}
                    <AppText style={{ lineHeight: 20, fontWeight: '500' }}>
                      {'100 '}
                    </AppText>
                    <AppText style={{ lineHeight: 20 }}>
                      {intl.formatMessage({
                        id: "home:point_regulation",
                      })}
                    </AppText>
                  </AppText>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <View style={styles.vDot} />
                <View style={{ flexDirection: 'row' }}>
                  <AppText style={{ lineHeight: 20 }}>
                    {intl.formatMessage({
                      id: "home:checkin_15day",
                    })}
                    <AppText style={{ lineHeight: 20, fontWeight: '500' }}>
                      {'300 '}
                    </AppText>
                    <AppText style={{ lineHeight: 20 }}>
                      {intl.formatMessage({
                        id: "home:point_regulation",
                      })}
                    </AppText>
                  </AppText>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <View style={styles.vDot} />
                <View style={{ flexDirection: 'row' }}>
                  <AppText style={{ lineHeight: 20 }}>
                    {intl.formatMessage({
                      id: "home:checkin_30day",
                    })}
                    <AppText style={{ lineHeight: 20, fontWeight: '500' }}>
                      {'500 '}
                    </AppText>
                    <AppText style={{ lineHeight: 20 }}>
                      {intl.formatMessage({
                        id: "home:point_regulation",
                      })}
                    </AppText>
                  </AppText>
                </View>
              </View>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "home:attention_regulation",
                })}
              </AppText>
            </View>
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
  vDot: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: COLOR.black,
    marginRight: 10,
  },
});

export default RegulationScreen;

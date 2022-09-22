import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import HeaderHome from "src/components/HeaderHome";
import { TypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { format } from "react-string-format";
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  RewardedAdEventType,
} from "@react-native-firebase/admob";
import {
  getAppJsonConfigAction,
  getDataAdressAction,
  getJsonConfigAction,
  getLastestNotificationAction,
  postDevicedAction,
} from "src/old/stores/app/app.actions";
import { getData } from "src/old/stores/app/app.service";
import { HomeData, Slide } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import HomeCategory from "./home/category";

import ListVerticalOne from "./home/list.vertical.one";
import Button from "src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
import Geolocation from "@react-native-community/geolocation";
import { setLocation } from "src/old/stores/app/app.slice";
import DeviceInfo from "react-native-device-info";
import ViewNotification from "src/components/ViewNotification";
import { DeviceEventEmitter } from "react-native";

import ViewAds from "src/components/ViewAds";

import CarouselSimple from "src/old/screens/slider/simple";

import { post, site_ajax_url, Toast, translation } from "src/helpers/config";
import { RSA } from "react-native-rsa-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

const HomeScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [data, setData] = useState<HomeData>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showViewNotification, setShowViewNotification] = useState<boolean>(
    false
  );

  const [showAds, setShowAds] = useState<boolean>(false);
  const [showAdsFirst, setShowAdsFirst] = useState<boolean>(true);
  const [notificationFirst, setNotificationFirst] = useState<boolean>(true);

  const showInterstitialAd = (id: any = null, func: any = null) => {
    // Display a rewarded ad
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
    });
    rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewarded.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log("User earned reward of ", reward);
      }
    });

    rewarded.load();
  };

  useEffect(() => {
    initData();
    // showInterstitialAd();

    // setTimeout(()=>{
    // navigation.navigate(AppRoutes.MAPBOXSIMPLE,{
    //   title:"I am here",
    //   lat:105.518311,
    //   lng: 9.832801,
    //   fetch:(fun:any)=>{
    //      fun([
    //        {title:"ABC",lat:10.7872864,lng:106.6316034,image:"https://image.freepik.com/free-vector/gradient-wavy-background_23-2149123234.jpg"},
    //        {title:"Coffee",lat:10.8131875,lng:106.6648118,image:"https://image.freepik.com/free-vector/gradient-wavy-background_23-2149123234.jpg"},
    //      ]);
    //   }
    // });

    //
    // },3000);

    return () => {
      DeviceEventEmitter.removeListener("token_device", token_device);
    };
  }, []);
  const token_device = async (token: string) => {
    let rs: any = await dispatch(
      postDevicedAction(
        DeviceInfo.getUniqueId(),
        token,
        Platform.OS,
        DeviceInfo.getVersion()
      )
    );
  };
  DeviceEventEmitter.addListener("token_device", token_device);

  const initDataResult = async (res: any) => {
    if (res && res.data) {
      setData(res?.data);
    }
    setLoading(false);
    setRefreshing(false);
    const json: any = await dispatch(getAppJsonConfigAction());
    if (json && json?.notification) {
      if (json?.notification.enable && notificationFirst) {
        setShowViewNotification(true);
        setNotificationFirst(false);
      }
    }

    //ads
    if (json && json?.ads && json?.ads.enabled && json?.ads.home) {
      //check timer
      let hour = new Date().getHours();

      let home = json?.ads.home;
      for (let i in home) {
        let rang = i.split("-").map(function (v) {
          return parseInt(v);
        });
        console.log(hour, i, home[i]);
        if (
          rang[0] <= hour &&
          hour <= rang[1] &&
          home[i] == 1 &&
          showAdsFirst
        ) {
          //setShowAds(true);

          navigation.navigate(AppRoutes.ADS, {
            show: true,
            callback: function (res: any) {
              setShowAdsFirst(false);
            },
          });
        }
      }
    }

    //check version
    let version = json?.version;
    if (version) {
      let ver = DeviceInfo.getVersion();
      let check = Platform.OS == "android" ? version.android : version.ios;
      let link = version[Platform.OS + "_url"];

      if (ver != check && link) {
        Alert.alert(format(translation(version, "msg"), check, ver), "", [
          { text: intl.formatMessage({ id: "label:cancel" }) },
          {
            text: intl.formatMessage({ id: "label:ok" }),
            style: "destructive",
            onPress: () => {
              if (link) {
                Linking.canOpenURL(link).then(
                  (supported) => {
                    supported && Linking.openURL(link);
                  },
                  (err) => console.log(err)
                );
              }
            },
          },
        ]);
      }
    }

    //now show bonus point
    post(site_ajax_url("point.php?a=bonustoday"), {}, (res: any) => {
      if (res != 0) {
        Toast.success(res);
      }
    });

    // navigation.navigate(AppRoutes.ADS,{
    //   show:true,
    //   callback:function(res:any){

    //   }
    // });
  };

  const initData = async () => {
    dispatch(getJsonConfigAction());
    const res: any = await dispatch(getDataAdressAction());

    Geolocation.getCurrentPosition(
      async (info) => {
        await dispatch(setLocation(info?.coords));
        initDataResult(res);
      },
      (error) => {
        initDataResult(res);
      }
    );
  };

  const _renderItem = (item: Slide, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.url && item.url.length > 0) {
            Linking.openURL(item.url);
          }
        }}
        activeOpacity={0.6}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <FastImagePlaceholder
          source={item.image}
          resizeMode={"contain"}
          style={styles.img}
          needProgress
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap}>
      <SafeAreaView />

      <HeaderHome />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        {/*<BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} /> */}

        <ScrollView
          style={[styles.container]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                initData();
              }}
            />
          }
        >
          <CarouselSimple slide={data?.slide} />

          <HomeCategory data={data?.homeCategory} />

          {/* {data?.FeatureNeed && data?.FeatureNeed.length ? (
            <NeedListHozizontal
              title={intl.formatMessage({
                id: "home:feature_need",
              })}
              data={data?.FeatureNeed}
              typeItem={TypeItem.Box}
              viewMore={false}
            />
          ) : null}

          {data?.TodayNeed && data?.TodayNeed.length ? (
            <NeedListVertical
              title={intl.formatMessage({
                id: "home:feature_update",
              })}
              data={data?.TodayNeed}
              typeItem={TypeItem.Cell}
              viewMore={false}
            />
          ) : null}
          {data?.WifiNear && data?.WifiNear.length ? (
            <ShopListHozizontalScroll
              title={"Wifi"}
              data={data?.WifiNear}
              typeItem={TypeItem.Box}
              viewMore={false}
              isShop
            />
          ) : null}
          {data?.ShopFeatured && data?.ShopFeatured.length ? (
            <ShopListHozizontalScroll
              title={intl.formatMessage({
                id: "history:popular_services_and_shops",
              })}
              data={data?.ShopFeatured}
              typeItem={TypeItem.Box}
              viewMore={false}
              isShop
            />
          ) : null}
          {data?.TodayShop && data?.TodayShop.length ? (
            <ShopListVertical
              title={intl.formatMessage({
                id: "history:new_store_posted",
              })}
              data={data?.TodayShop}
              typeItem={TypeItem.Cell}
              viewMore={false}
            />
          ) : null} */}
          <View style={styles.vInsertCode}>
            <View style={styles.vTextInsertCode}>
              <View style={{ flex: 1 }}>
                <Image
                  style={styles.imgInsertCode}
                  resizeMode="stretch"
                  source={{
                    uri:
                      "https://cdn.dribbble.com/users/1353252/screenshots/9327462/illustartion-v3_1x.jpg",
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <AppText fontSize={24}>
                  {intl.formatMessage({
                    id: "Bạn có người",
                  })}
                </AppText>
                <AppText style={{ marginTop: 5 }} fontSize={18}>
                  {intl.formatMessage({
                    id: "giới thiệu chưa?",
                  })}
                </AppText>
              </View>
            </View>
            <Button
              buttonStyle={styles.buttonCode}
              onPress={() => navigation.navigate(AppRoutes.INSERT_CODE)}
              text={intl.formatMessage({
                id: "history:enter_the_code_now",
              })}
              textStyle={styles.txtButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {showViewNotification && showAdsFirst ? (
        <ViewNotification
          show={showViewNotification}
          goBack={() => setShowViewNotification(false)}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  viewQuestion: {
    backgroundColor: COLOR.white,
    margin: 10,
    borderRadius: 10,
  },
  viewSlider: {
    height: 160,
    width: "100%",
  },
  viewDot: {
    position: "absolute",
    top: 105,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  img: {
    width: DEVICE_WIDTH - 25,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
  },
  vInsertCode: {
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
    marginHorizontal: 10,
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
  vTextInsertCode: {
    flexDirection: "row",
  },
  buttonCode: {
    marginTop: 20,
    height: 40,
    width: width - 50,
  },
  txtButton: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white,
  },
  imgInsertCode: {
    width: 100,
    height: 70,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOR.textWhite,
  },
});

export default HomeScreen;

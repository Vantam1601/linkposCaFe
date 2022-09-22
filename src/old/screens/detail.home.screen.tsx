import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackActions, useNavigation } from "@react-navigation/native";
import { faChevronRight } from "nvquang-font-icon/pro-light-svg-icons";
import { faEye, faShareAlt, faThumbsUp,faStar } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo, useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share
} from "react-native";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import ViewAds from "src/components/ViewAds";
import { amountFormat } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { AppRoutes } from "src/navigator/app-routes";
import {
  getDetailHistoryNeedAction,
  likeAction,
} from "src/old/stores/app/app.actions";
import { COLOR } from "src/theme/color";
import ImageViewer from "react-native-image-zoom-viewer";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Slide } from "src/old/type/interface";
import { ZoomImage } from "src/components/ZoomImage";
import { time } from "src/helpers/config"; 
import ViewAdsInline from 'src/components/ViewAds/inline';
import Rate from "src/components/Rate"; 

const DEVICE_WIDTH = Dimensions.get("window").width;

const DetailHomeScreen = memo((navigationRoute: any) => {
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const [showAds, setShowAds] = useState<boolean>(false);

  const { route } = navigationRoute;
  const params = route?.params?.value;
  const [data, setData] = useState<any>({});

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const res: any = await dispatch(getDetailHistoryNeedAction(params?.id));

    if (res && res?.data) {
      setData(res?.data);
    }
  };
  const onFormatPrice = (value: any) => {
    let txt = "";
    if (value === "") {
      txt = "Giá thương lượng";
    } else if (value) {
      txt = value;
    }
    return txt;
  };
  const [showAdsFirst, setShowAdsFirst] = useState<boolean>(true);
  const onCallSupport = (phone: string) => {
    if(showAdsFirst){ 
      navigation.navigate(AppRoutes.ADS,{
         show:true,
         callback:function(res:any){
           Linking.openURL(`tel:${phone}`);
           setShowAdsFirst(false);
         }
       });
    }else{
       Linking.openURL(`tel:${phone}`);
    }
  };
  const onNavigator = (value: any) => {
    navigation.dispatch(StackActions.replace(AppRoutes.DETAIL_HOME, { value }));
  };
  const onNavigatorCountry = (type: string) => {
    let value = {
      type,
      data,
    };
    navigation.navigate(AppRoutes.NEED_COUNTRY, { value });
  };
  const onNavigatorCategoryChild = (type: string) => {
    navigation.navigate(AppRoutes.SERVICE_CATEGORY_CHILD, {
      id: type,
      type: "1",
      titleDad: type,
      isReplace: true,
    });
  };
  const onNavigatorCategoryDetail = (type: string) => {
    navigation.navigate(AppRoutes.DETAIL_SERVICE_CATEGORY, {
      id: type,
      type: "1",
      titleDad: data?.category,
      isReplace: true,
    });
  };

  const formatArrayImage = () => {
    try {
      if (data?.gallery) {
        return JSON.parse(data?.gallery);
      }

      return [];
    } catch (error) {
      return [];
    }
  };

  const likePost = async () => {
    await dispatch(likeAction(data?.id));
    setData({ ...data, liked: data.liked === 1 ? 0 : 1 });
  };

  const onShare = async () => {
    let url: string = `Bạn đang chia sẽ ${data.title} từ ứng dụng KNC.\n Bạn có thể tải ứng dụng từ Chplay và App Store.`
    try {
      const result = await Share.share({
        title: DeviceInfo.getApplicationName(),
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
      // Alert.alert(error.message);
    }
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <ZoomImage
        imgStyle={{
          width: DEVICE_WIDTH,
          height: 200,
        }}
        url={item}
      />
    );
  };

  const pagination = () => {
    return (
      <View style={styles.viewDot}>
        <Pagination
          dotsLength={(formatArrayImage().length as number) ?? 0}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: COLOR.main_color,
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: COLOR.gray,
          }}
          inactiveDotOpacity={0.6}
          inactiveDotScale={1}
        />
      </View>
    );
  };

  const show_rate =(num:any)=>{
    return <Rate num={num} />
  }

  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack title={data?.title} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView
          style={[styles.container]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.vImage}>
            <View
              style={{
                position: "absolute",
                right: 5,
                top: 10,
                zIndex: 999,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={likePost}
                activeOpacity={0.5}
                style={{
                  backgroundColor: COLOR.contentColor,
                  padding: 3,
                  borderRadius: 26 / 2,
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Image
                  style={{ width: 12, height: 14, tintColor:COLOR.white }}
                  resizeMode="stretch"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/633/633759.png',
                  }}
                /> */}

                <FontAwesomeIcon
                  color={data?.liked ? COLOR.blue : COLOR.gray}
                  icon={faThumbsUp}
                  style={{ marginHorizontal: 10 }}
                  size={14}
                />
              </TouchableOpacity>
              <View style={{ width: 6 }} />
              <TouchableOpacity
                onPress={onShare}
                style={{
                  backgroundColor: COLOR.contentColor,
                  padding: 3,
                  borderRadius: 26 / 2,
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  color={COLOR.gray}
                  icon={faShareAlt}
                  style={{ marginHorizontal: 10 }}
                  size={14}
                />
              </TouchableOpacity>
            </View>
            {data?.gallery && data.gallery.length ? (
              <Carousel
                autoplay={true}
                loop={true}
                containerCustomStyle={{
                  height: 200,
                }}
                data={formatArrayImage() as Slide[]}
                renderItem={({ item, index }) => _renderItem({ item, index })}
                sliderWidth={DEVICE_WIDTH}
                itemWidth={DEVICE_WIDTH}
                onSnapToItem={(slideIndex) => setActiveSlide(slideIndex)}
              />
            ) : (
              <View style={styles.viewSlider}>
                <ActivityIndicator color={COLOR.main_color} />
              </View>
            )}
            {pagination()}
          </View>
          <View style={styles.vMain}>
            <View style={[styles.vCard]}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: data?.description,
                })}
              </AppText>
            </View>
            {data?.price_from === "" && data?.price_to === "" ? (
              <View
                style={[
                  styles.vCard,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "history:price",
                  })}
                  {":  "}
                  {intl.formatMessage({
                    id: "history:negotiable_price_title",
                  })}
                </AppText>
              </View>
            ) : (
              <View
                style={[
                  styles.vCard,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "history:price",
                  })}
                  {":  "}
                  <AppText fontSize={16}>
                    {amountFormat(Number(data?.price_from))}
                  </AppText>
                </AppText>
                <AppText fontSize={16}>
                  {" - "}
                  {amountFormat(Number(data?.price_to))}
                </AppText>
              </View>
            )}
            <View style={[styles.vTextTitle]}>
              <AppText fontSize={15}>
                {intl.formatMessage({
                  id: "history:category",
                })}
              </AppText>
            </View>
            <View style={[styles.vCard, { flexDirection: "row" }]}>
              <TouchableOpacity
                style={styles.vButton}
                onPress={() => onNavigatorCategoryDetail(data?.subcategory)}
              >
                <AppText style={styles.txtCategory}>
                  {intl.formatMessage({
                    id: data?.subcategory,
                  })}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vButton2}
                onPress={() => onNavigatorCategoryChild(data?.category)}
              >
                <AppText style={styles.txtCategory}>
                  {intl.formatMessage({
                    id: data?.category,
                  })}
                </AppText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.vTextTitle]}>
              <AppText fontSize={15}>
                {intl.formatMessage({
                  id: "history:location",
                })}
              </AppText>
            </TouchableOpacity>
            <View style={[styles.vCard, { flexDirection: "row" }]}>
              <TouchableOpacity
                style={styles.vButton}
                onPress={() => onNavigatorCountry("1")}
              >
                <AppText style={styles.txtCategory}>
                  {intl.formatMessage({
                    id: data?.ward,
                  })}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vButton2}
                onPress={() => onNavigatorCountry("2")}
              >
                <AppText style={styles.txtCategory}>
                  {intl.formatMessage({
                    id: data?.district,
                  })}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vButton3}
                onPress={() => onNavigatorCountry("3")}
              >
                <AppText style={styles.txtCategory}>
                  {intl.formatMessage({
                    id: data?.province,
                  })}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={[styles.vCard]}>
              <View style={styles.vRow}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "history:date_created",
                  })}
                </AppText>
                <AppText fontSize={15}>{data?.created_date}</AppText>
              </View>
              <View style={[styles.vRow, { marginTop: 10 }]}>
                {show_rate(4)}
                <View style={styles.vView}>
                  <AppText style={{ marginRight: 10, color: COLOR?.textWhite }}>
                    {data?.view}
                  </AppText>
                  <FontAwesomeIcon color={COLOR.white} icon={faEye} size={18} />
                </View>
              </View>
              <View style={[styles.vRow, { marginTop: 10 }]}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "history:contact",
                  })}
                </AppText>
                <TouchableOpacity
                  style={styles.vCall}
                  onPress={() => onCallSupport(data?.phone)}
                >
                  <AppText style={{ color: COLOR?.textWhite }}>
                    {intl.formatMessage({
                      id: "history:call",
                    })}
                  </AppText>
                </TouchableOpacity>
              </View>
              <View style={[styles.vRow, { marginTop: 10 }]}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "history:time_left",
                  })}
                </AppText>
                 
                <AppText style={{ }}>
                  {time.ago(data?.timer*1000)}
                </AppText> 
              </View>
              {data?.lat || data?.length ? (
                <View style={[styles.vRow, { marginTop: 10 }]}>
                  <AppText fontSize={15}>
                    {intl.formatMessage({
                      id: "history:map",
                    })}
                  </AppText>
                  <View
                    style={[
                      styles.vCall,
                      { backgroundColor: COLOR.white, borderWidth: 1 },
                    ]}
                  >
                    <AppText style={{ color: COLOR?.txtBlackGray }}>
                      {intl.formatMessage({
                        id: "history:view",
                      })}
                    </AppText>
                  </View>
                </View>
              ) : null}
            </View>
            <View style={[styles.vTextTitle]}>
              <AppText fontSize={15}>
                {intl.formatMessage({
                  id: "history:member_new",
                })}
              </AppText>
            </View>
            <View style={[styles.vCard]}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {data?.view_users?.map((e: any, index: number) => {
                  return (
                    <Image
                      key={index?.toString()}
                      style={styles.imgMember}
                      resizeMode="stretch"
                      source={{
                        uri: e,
                      }}
                    />
                  );
                })}
              </View>
            </View>
            {/* <View style={[styles.vCard]}>
              <AppText fontSize={15}>
                {intl.formatMessage({
                  id: "history:need_near_you",
                })}
              </AppText>
            </View> */}
            {data?.relatives?.length > 0 ? (
              <View style={[styles.vCard]}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "Liên quan",
                  })}
                </AppText>
                {data?.relatives?.reverse().map((e, i) => {
                  return (
                    <TouchableOpacity key={i.toString()} onPress={() => onNavigator(e)}
                      style={[
                        styles.vItemHistory,
                        { borderBottomWidth: data.length === i ? 0 : 1 },
                      ]}
                    >
                      <View style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: COLOR.borderWhiteGray,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image style={styles.imgItemIcon} source={{ uri: e?.image, }}  />
                      </View>
                      <View style={styles.vContentHistory}>
                        <AppText fontSize={15}>{e.title}</AppText>
                        {e?.price_from === "" && e?.price_to === "" ? (
                          <AppText style={styles.txtLabel}>
                            {intl.formatMessage({
                              id: "history:price",
                            })}
                            {":  "}
                            {intl.formatMessage({
                              id: "history:need_deal",
                            })}
                          </AppText>
                        ) : (
                          <View style={{ marginTop: 5, flexDirection: "row" }}>
                            <AppText style={styles.txtLabel}>
                              {intl.formatMessage({
                                id: "history:price",
                              })}
                              {":  "}
                              <AppText fontSize={16} numberOfLines={3}>
                                {amountFormat(e?.price_from)}
                              </AppText>
                            </AppText>
                            <AppText fontSize={16} numberOfLines={3}>
                              {" - "}
                              {intl.formatMessage({
                                id: amountFormat(e?.price_to),
                              })}
                            </AppText>
                          </View>
                        )}
                        <AppText style={{ }}>
                          {time.ago(data?.timer*1000)}
                        </AppText> 
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
            {data?.suggest?.length > 0 ? (
              <View style={[styles.vCard]}>
                <AppText fontSize={15}>
                  {intl.formatMessage({
                    id: "history:may_be_interested",
                  })}
                </AppText>
                <View>
                  {data?.suggest?.reverse().map((e, i) => {
                    return (
                      <TouchableOpacity
                        key={i.toString()}
                        onPress={() => onNavigator(e)}
                        style={[
                          styles.vItemHistory,
                          { borderBottomWidth: data.length === i ? 0 : 1 },
                        ]}
                      >
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: COLOR.borderWhiteGray,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={styles.imgItemIcon}
                            source={{
                              uri: e?.image,
                            }}
                          />
                        </View>
                        <View style={styles.vContentHistory}>
                          <AppText fontSize={15}>{e.title}</AppText>
                          {e?.price_from === "" && e?.price_to === "" ? (
                            <AppText style={styles.txtLabel}>
                              {intl.formatMessage({
                                id: "history:price",
                              })}
                              {":  "}
                              {intl.formatMessage({
                                id: "history:need_deal",
                              })}
                            </AppText>
                          ) : (
                            <View
                              style={{ marginTop: 5, flexDirection: "row" }}
                            >
                              <AppText style={styles.txtLabel}>
                                {intl.formatMessage({
                                  id: "history:price",
                                })}
                                {":  "}
                                <AppText fontSize={16} numberOfLines={3}>
                                  {amountFormat(e?.price_from)}
                                </AppText>
                              </AppText>
                              <AppText fontSize={16} numberOfLines={3}>
                                {" - "}
                                {intl.formatMessage({
                                  id: amountFormat(e?.price_to),
                                })}
                              </AppText>
                            </View>
                          )}
                        </View>
                        <View style={styles.vSell}>
                          <FontAwesomeIcon
                         
                            icon={faChevronRight}
                 
                            size={14}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>

          <ViewAdsInline />
        </ScrollView>
      </SafeAreaView>
      
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
  vMain: {
    marginHorizontal: 12,
  },
  viewDot: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: -5,
  },
  vImage: {
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
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderWhiteGray,
  },
  viewSlider: {
    height: 160,
    width: "100%",
  },
  imgItem: {
    width: 250,
    height: 150,
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
    padding: 12,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
  txtLabel: {
    fontSize: 16,
    textAlignVertical: "center",
    fontWeight: "500",
    marginLeft: 5,
  },
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  vButton: {
    backgroundColor: COLOR.bgBlue_white,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  vButton2: {
    backgroundColor: COLOR.bgBlue_bland,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  vButton3: {
    backgroundColor: COLOR.bgOrange,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  vView: {
    backgroundColor: COLOR.gray,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  vCall: {
    backgroundColor: COLOR.bgGreen,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txtCategory: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: COLOR.textWhite,
  },
  vRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  imgMember: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
  vItemHistory: {
    flexDirection: "row",
    paddingVertical: 15,
    // borderBottomWidth: 1,
    borderBottomColor: COLOR.borderGray,
  },
  vContentHistory: {
    flex: 1,
    marginHorizontal: 10,
  },
  imgItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  vButtonUpdate: {
    width: 30,
    height: 30,
    backgroundColor: "pink",
    marginRight: 7,
    borderRadius: 8,
  },
  vSell: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10, 
  },
});

export default DetailHomeScreen;

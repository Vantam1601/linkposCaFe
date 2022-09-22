import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import HeaderBack from "src/components/HeaderBack";
import CellHorizontalItem from "src/components/Item/Cell.horizontal";
import { TypeItem,generateColor } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { AppRoutes } from "src/navigator/app-routes";
import { getPromotionAction } from "src/old/stores/app/app.actions";
import { ListPromotion, LocationPromotion, Promotion } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import ListHozizontalPromotion from "./promotion/list.horizontal";

const DEVICE_WIDTH = Dimensions.get("window").width;

const DiscountScreen = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ListPromotion[]>([]);
  const [dataLocation, setDataLocation] = useState<LocationPromotion>();
  const navigation = useNavigation();
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [page, setPage] = useState(0)
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    initData(1);
  }, []);

  const initData = async (pageIndex: number) => {
    
    if (loading) {
      return;
    }

    if (pageIndex === 1) {
      setIsEnd(false)
    }
    setLoading(true);
    // setLoadMore(true)
    setPage(pageIndex)
    const res: any = await dispatch(getPromotionAction(pageIndex, 15));
    try {
      console.log(res.data);
      if (res && res.data) {
        const objectArray = Object.entries(res?.data?.country);
        let array: any = [];

        if (pageIndex === 1) {
          objectArray.forEach(([key, value]) => {
            array.push(value);
          });
          setDataLocation(array);
          setData(res?.data.list);
        } else {
          let currentList = [...data]
          currentList = currentList.concat(res?.data.list)
          setData(currentList)
          if (res?.data.list.length === 0) {
            setIsEnd(true)
          }
        }
      }
    } catch (error) {
      console.log("err", error)
    }

    setLoadMore(false)
    setLoading(false);
  };
  const onNavigater = (item: any) => {
    navigation.navigate(AppRoutes.DETAIL_PROMOTION, { value: item })
  }
  const onNavigaterCountry = (item: any) => {
    navigation.navigate(AppRoutes.DISCOUNT_COUNTRY, { value: item })
  }

  const onNavigaterList = (item: any) => {
    navigation.navigate(AppRoutes.DETAIL_PROMOTION, { value: item })
  }
  const _renderItemList = (item: any, index: number) => {
    return <CellHorizontalItem item={item} index={index} onPress={onNavigaterList} />
  };
  const _renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => onNavigater(item)}>
        <FastImagePlaceholder
          source={item.image}
          resizeMode={"stretch"}
          style={styles.img}
          needProgress
        />
      </TouchableOpacity>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.vMain}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {data && data.length ? (
            <Carousel
              loop={true}
              containerCustomStyle={{
                height: 180,
              }}
              autoplay
              data={data}
              renderItem={({ item, index }) => _renderItem(item, index)}
              sliderWidth={DEVICE_WIDTH}
              itemWidth={DEVICE_WIDTH}
              onSnapToItem={(slideIndex) => setActiveSlide(slideIndex)}
            />
          ) : (
            <View style={styles.viewSlider}>
              <ActivityIndicator color={COLOR.main_color} />
            </View>
          )}
        </View>
        {dataLocation ?
          <View>
            <AppText>Khu vực</AppText>
            <View
              style={[styles.vCard, { flexDirection: "row", flexWrap: "wrap" }]}
            >

            <ScrollView horizontal={true}  >
              {dataLocation?.map((item: any, index: string) => {
                return (
                  <TouchableOpacity style={[styles.vButton,{backgroundColor:generateColor()}]} key={index.toString()} onPress={() => onNavigaterCountry(item?.label)}>
                    <AppText style={styles.txtCategory}>
                      {intl.formatMessage({
                        id: item?.label,
                      })}
                      {` (${item?.total ? item?.total : 0})`}
                    </AppText>
                  </TouchableOpacity>
                );
              }) }
              </ScrollView>
            </View>
          </View>

          : null}
        
      </View>
    )
  }
  const handleLoadMore = () => {
    if (loadMore || isEnd) {
      return
    }
    setLoadMore(true)
    initData(page + 1)
  }

  const renderFooter = () => {
    if (!loadMore) return null;
    return (
      <ActivityIndicator
        color={'gray'}
        size={'small'}
      />
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack noBack title={"promotion:promotion"} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList
            data={data}
            onRefresh={() => initData(1)}
            refreshing={loading as boolean}
            ListHeaderComponent={renderHeader}
            renderItem={({ item, index }) => _renderItemList(item, index)}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          />
        </View>
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
    paddingVertical: 15,
    marginTop: 8,
    borderRadius: 6,
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
    marginBottom: 0,
    borderRadius: 6,
  },
  viewSlider: {
    height: 170,
    width: "100%",
  },
  img: {
    width: "90%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
    marginHorizontal: 15,
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
  txtCategory: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: COLOR.textWhite,
  },
});

export default DiscountScreen;

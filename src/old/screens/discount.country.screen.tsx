import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import HeaderBack from "src/components/HeaderBack";
import CellHorizontalItem from "src/components/Item/Cell.horizontal";
import { TypeItem,EMPTY_IMAGE } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { AppRoutes } from "src/navigator/app-routes";
import { getCountryPromotionAction, getPromotionAction } from "src/old/stores/app/app.actions";
import { LocationPromotion, Promotion } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import ListHozizontalPromotion from "./promotion/list.horizontal";

const DEVICE_WIDTH = Dimensions.get("window").width;

const DiscountCountryScreen = memo((navigationRoute: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const navigation = useNavigation();
  const intl = useTranslate();
  const dispatch = useTypedDispatch();

  const { route } = navigationRoute;
  const params = route?.params?.value;

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
    setPage(pageIndex);



    const res: any = await dispatch(getCountryPromotionAction(params, pageIndex, 15));
    console.log(res.data);
    try {
      if (res && res.data) {
        if (pageIndex === 1) {
          setData(res?.data);
        } else {
          
          let currentList = [...data]
          currentList = currentList.concat(res?.data)
          setData(currentList)
          if (res?.data.length === 0) {
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

  const onNavigaterList = (item: any) => {
    navigation.navigate(AppRoutes.DETAIL_PROMOTION, { value: item })
  }

  const _renderItemList = (item: any, index: number) => {
    return <CellHorizontalItem item={item} index={index} onPress={onNavigaterList} />
  };
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
      <HeaderBack title={params} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {data && data.length > 0 ?
            <FlatList
              data={data}
              onRefresh={() => initData(1)}
              refreshing={loading as boolean}
              renderItem={({ item, index }) => _renderItemList(item, index)}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore.bind(this)}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter.bind(this)}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
            />
            :
            <View style={styles.vImage}>
              <Image
                style={styles.imgItem}
                resizeMode="stretch"
                source={{
                  uri: EMPTY_IMAGE,
                }}
              />
              <AppText
                style={{ marginTop: 30, textAlign: 'center' }}
                fontSize={15}
              >
                {intl.formatMessage({
                  id: 'home:no_data_to_update',
                })}
              </AppText>
            </View>
          }
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
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
    marginHorizontal: 15,
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
  vImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgItem: {
    marginTop: 100,
    width: 300,
    height: 200
  },
});

export default DiscountCountryScreen;

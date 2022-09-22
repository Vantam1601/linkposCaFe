import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import HeaderBack from 'src/components/HeaderBack';
import { COLOR } from 'src/theme/color';
// import { getCategoryHomeServiceChildAction, getCategoryNeedAction, getShortTermAction } from 'src/stores/app/app.actions';
import FastImagePlaceholder from 'src/components/FastImage';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';
import BottomSheet from 'src/components/BottomSheet';
import { useDispatch } from 'react-redux';
import { getListGameAction } from 'src/old/stores/app/app.actions';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/app-routes';
import { storage } from 'src/helpers/storage';

const widthS = Dimensions.get("window").width;
;

const GameScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const refsCategory = React.createRef<BottomSheet>();
  const [category, setCategory] = useState<string>("");
  const [categoryChild, setCategoryChild] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setSetData] = useState<any>([]);
  const [token, setToken] = useState<string | null>("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState<any>(15);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    getData(1);
  }, [])

  const getData = async (pageIndex: number) => {
    if (loading) {
      return;
    }
    if (pageIndex === 1) {
      setIsEnd(false)
    }

   


    setLoading(true);
    setPage(pageIndex)
    let res: any = await dispatch(getListGameAction(pageIndex, limit));
    try {
      if (res && res.data) {
        if (pageIndex === 1) {
          setSetData(res?.data);
        } else {

          let currentList = [...data]
          currentList = currentList.concat(res?.data)
          setSetData(currentList)
          if (res?.data.length === 0) {
            setIsEnd(true)
          }
        }
      }
    } catch (error) {
      console.log("err", error)
    }
    const [w_t] = await Promise.all([
      await storage.get("w_t"),
    ]);
    setToken(w_t)
    setLoadMore(false)
    setLoading(false);

    // if (result && result?.data) {
    //   setSetData(result?.data)
    // }

    // setLoading(false)
  };

  const onNavigater = (item: any) => {
    let value = {
      title: item?.title,
      url: `${item?.url}?${token}`
    }
    navigation.navigate(AppRoutes.WEB_VIEW, {
      value
    })
  }

  const _renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity style={styles.vCard} onPress={() => onNavigater(item)}>
        <AppText style={styles.txtItem}>{item?.title}</AppText>
        <AppText style={styles.txtItem}>{item?.description}</AppText>
      </TouchableOpacity>
    )
  }

  const handleLoadMore = () => {
    if (loadMore || isEnd) {
      return
    }

    if(data?.data&&data?.data?.length>limit-1){
      setLoadMore(true)
      getData(page + 1)
    }
    
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
      <HeaderBack
        title={'home:game'}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <View style={styles.vMain}>
          <View style={styles.vTextTitle}>
            <AppText fontSize={14}>
              {data?.description ? data?.description : ""}
            </AppText>
          </View>
          {
            data && data?.data?.length > 0 ? (
              < FlatList
                style={{ marginBottom: 200, height: 600 }}
                onRefresh={() => getData(1)}
                refreshing={loading as boolean}
                data={data?.data}
                renderItem={({ item, index }) => _renderItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore.bind(this)}
                ListFooterComponent={renderFooter.bind(this)}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.viewSlider}>
                <ActivityIndicator color={COLOR.main_color} />
              </View>
            )
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
  vLabel: {
    marginHorizontal: 12,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  },
  vMain: {
    marginHorizontal: 12,
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
    paddingHorizontal: 15
  },

  viewType: {
    padding: 2,
    position: "absolute",
    top: 4,
    left: 6,
  },
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  txtItem: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20
  },
  viewSlider: {
    height: 160,
    width: "100%",
  }

});

export default GameScreen;

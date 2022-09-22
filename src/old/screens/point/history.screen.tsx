import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {} from "nvquang-font-icon/pro-light-svg-icons";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { getListHistoryWorkAction } from "src/old/stores/app/app.actions";
import { HistoryWork } from "src/old/type/interface";

import { COLOR } from "src/theme/color";
import FastImagePlaceholder from "src/components/FastImage";
import { useNavigation } from "@react-navigation/core";
import { AppRoutes } from "src/navigator/app-routes";
import { post,site_ajax_url,postAsync,isMobile } from "src/helpers/config";

const HistoryWalletScreen = memo(() => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<HistoryWork[]>([]);
  const [dataAll, setDataAll] = useState<HistoryWork[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    initData(1);
  }, []);

  const initData = async (pageIndex: number) => {
    if (loading) {
      return;
    }
    if (pageIndex === 1) {
      setIsEnd(false);
    }
    setLoading(true);
    setPage(pageIndex);

    post(site_ajax_url("point.php?a=history"),{},(res:any)=>{

        setData(res);
        setDataAll(res);
          setIsEnd(true);
        setLoadMore(false);
        setLoading(false);
    });
    
  };

  const onSelectSearch = (value: string) => {
    if (value === "all") {
      setData(dataAll);
    } else {
      // alert(value);
      const result = dataAll.filter((item) => item.type === value);
      setData(result);
    }
  };

  const goToItem = (item: any) => {
    
  };

  const renderItem = ({ item, index }: any) => {
 
    return (
      <TouchableOpacity
        style={[styles.vHistory, { flexDirection: "row" }]}
        activeOpacity={0.6}
        onPress={() => goToItem(item)}
      >
        <View
          style={{
            width: 60,
            height: 60, 
            alignItems: "center",
            justifyContent: "center",
          }}
        >
           <AppText color={COLOR.textGray} fontSize={12} fontWeight="600">
             {item.type} {item.point}
            </AppText>
        </View>
        <View style={{ flex: 1, marginTop: 5, marginLeft: 20 }}>
          <AppText fontWeight="600" fontSize={15}>
            {item.title}
          </AppText>
          <AppText fontSize={15}>{item?.created_date}</AppText>
          <View style={[styles.vSell,{position:'absolute',bottom:0,right:0}]}>
           
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    if (loadMore || isEnd) {
      return;
    }
    setLoadMore(true);
    initData(page + 1);
  };

  const renderFooter = () => {
    if (!loadMore) return null;
    return <ActivityIndicator color={"gray"} size={"small"} />;
  };
  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack title={"history:work_history"} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <View style={[styles.container]}>
          <View style={styles.vBottom}>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              <Button
                buttonStyle={styles.vButton}
                onPress={() => onSelectSearch("all")}
                text={intl.formatMessage({
                  id: "history:all",
                })}
                textStyle={styles.txtButton}
              />
              <Button
                buttonStyle={[styles.vButton2,{backgroundColor: COLOR.bgRedFresh}]}
                onPress={() => onSelectSearch("-")}
                text={intl.formatMessage({
                  id: "label:deposit",
                })}
                textStyle={styles.txtButton}
              />
              <Button
                buttonStyle={[styles.vButton2,{backgroundColor: COLOR.bgBlue}]}
                onPress={() => onSelectSearch("+")}
                text={intl.formatMessage({
                  id: "label:withdraw",
                })}
                textStyle={styles.txtButton}
              />
               
            </ScrollView>
          </View>
          {data && data?.length ? (
            <View style={styles.vList}>
              <FlatList
                style={{ marginBottom: 50 }}
                data={data}
                onRefresh={() => initData(1)}
                refreshing={loading as boolean}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
              />
            </View>
          ) : (
            <View style={styles.viewSlider}>
              <ActivityIndicator color={COLOR.main_color} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  vBottom: {
    flexDirection: "row",
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
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    marginHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
    paddingLeft:8 
  },
  vButton: {
    backgroundColor: COLOR.gray,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  vButton2: {
    backgroundColor: COLOR.gray,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  txtButton: {
    fontSize: 14,
    color: COLOR.textWhite,
  },
  vList: {
    paddingHorizontal: 12,
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
  },
  imgItem: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  vSell: {
    color:"#333",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  viewSlider: {
    height: 160,
    width: "100%",
  },
});
export default HistoryWalletScreen;

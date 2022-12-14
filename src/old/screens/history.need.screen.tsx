import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { } from "nvquang-font-icon/pro-light-svg-icons";
import { AppText } from 'src/components/Apptext';
import Button from 'src/components/Button';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { getListHistoryNeedAction, deleteHistoryNeedAction } from 'src/old/stores/app/app.actions';
import { HistoryNeed } from 'src/old/type/interface';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { COLOR } from 'src/theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/app-routes';
import { AppInput } from 'src/components/AppInput';
import { EMPTY_IMAGE } from "src/helpers/constants"; 


const { width, height } = Dimensions.get("window");

const HistoryNeedScreen = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<HistoryNeed[]>([]);
  const [dataAll, setDataAll] = useState<HistoryNeed[]>([]);
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState(0)
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();

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
    setPage(pageIndex)

    const res: any = await dispatch(getListHistoryNeedAction(pageIndex, 15));

    // if (res && res.data) {
    //   setData(res?.data);
    //   setDataAll(res?.data)
    // }
    // setLoading(false);
    try {
      if (res && res.data) {
        if (pageIndex === 1) {

          setData(res?.data);
          setDataAll(res?.data)
        } else {

          let currentList = [...data]
          let currentListAll = [...dataAll]
          currentList = currentList.concat(res?.data)
          currentListAll = currentListAll.concat(res?.data)
          setData(currentList)
          setDataAll(currentList)
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

  const onDelete = (item: any) => {
    Alert.alert(
      "Th??ng b??o",
      "B???n c?? mu???n xo?? th??ng b??o n??y ?",
      [
        {
          text: "Kh??ng",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "?????ng ??",
          onPress: () => onAgreeDelete(item?.id)
        }
      ]
    );
  };
  const onAgreeDelete = async (id: string) => {
    const result = await dispatch(deleteHistoryNeedAction(id))
  };
  const onSelectSearch = (value: string) => {
    if (value === "all") {
      setData(dataAll)
    } else {
      const result = dataAll.filter(item => item.status === value);
      setData(result)
    }
  }
  const removeAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/??/g, 'd')
      .replace(/??/g, 'D');
  }
  const onSearch = (text: string) => {
    let filterData = [];
    const str = removeAccents(text.trim().toLowerCase());
    if (dataAll.length > 0) {
      for (let i = 0; i < dataAll.length; i++) {
        if (dataAll[i].title !== undefined) {
          if (
            removeAccents(dataAll[i].title.toLowerCase()).includes(str)
          ) {
            filterData.push(dataAll[i]);
          }
        }
      }
    }
    setKeyword(text)
    setData(filterData)
  }


  const renderHeader = () => {
    return (
      <View style={styles.vBottom}>
        <Button
          buttonStyle={styles.vButton}
          onPress={() => onSelectSearch('all')}
          text={intl.formatMessage({
            id: "history:all",
          })}
          textStyle={styles.txtButton}
        />
        <Button
          buttonStyle={styles.vButton2}
          onPress={() => onSelectSearch("complete")}
          text={intl.formatMessage({
            id: "history:approved",
          })}
          textStyle={styles.txtButton}
        />
        <Button
          buttonStyle={styles.vButton3}
          onPress={() => onSelectSearch("pending")}
          text={intl.formatMessage({
            id: "history:censored",
          })}
          textStyle={styles.txtButton}
        />
      </View>
    )
  }

  const renderItem = (e: any, i: number) => {
    let stt: any;
    let color: any;
    let type: any;
    if (e.status === "complete") {
      stt = "history:complete";
      color = COLOR.txtGreen
    } else if (e.status === "pending") {
      stt = "history:pending";
      color = COLOR.textBlue
    }
    if (e?.type === "sell") {
      type = "history:sell";
    } else if (e?.type === "buy") {
      type = "history:buy";
    }
    else if (e?.type === "do") {
      type = "history:do";
    }
    else if (e?.type === "find") {
      type = "history:find";
    }
    return (
      <View style={[styles.vHistory, { marginHorizontal: 12 }]}>
        <View
          key={i}
          style={[styles.vItemHistory, { borderBottomWidth: data.length === i ? 0 : 1 }]} >
          <View style={styles.vImage}>
            <Image
              style={styles.imgItem}
              source={{
                uri: e?.image,
              }}
            />
          </View>
          <View style={styles.vContentHistory}>
            <AppText
              fontSize={15}>
              {e.title}
            </AppText>
            <View style={{ flexDirection: 'row', width: 100, height: 30, marginTop: 10 }}>
              <TouchableOpacity style={[styles.vButtonUpdate, { backgroundColor: COLOR.bgRedFresh }]}
                onPress={() => onDelete(e)}>
                <Image
                  resizeMode='stretch'
                  style={{
                    tintColor: COLOR.bgWhite,
                    width: 14,
                    height: 18
                  }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3096/3096673.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.vButtonUpdate, { backgroundColor: COLOR.bgBlue_white }]}
                onPress={() => navigation.navigate(AppRoutes.UPDATE_POST, {
                  id: e?.id
                })}>
                <Image
                  resizeMode='stretch'
                  style={{
                    tintColor: COLOR.bgWhite,
                    width: 14,
                    height: 18
                  }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/1250/1250615.png",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {type ?
              <View style={styles.vSell}>
                <AppText
                  color={COLOR.textWhite}
                  fontSize={15}
                  fontWeight='600'
                >
                  {intl.formatMessage({
                    id: type,
                  })}
                </AppText>
              </View>
              : null
            }

            <TouchableOpacity
              onPress={() => navigation.navigate(AppRoutes.UPDATE_POST, {
                id: e?.id
              })}
            >
              <AppText
                style={{ marginTop: 10 }}
                color={color}
                fontSize={15}
                fontWeight='600'
              >
                {intl.formatMessage({
                  id: stt,
                })}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
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
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack
        isReady
        rightPress={() => navigation.navigate(AppRoutes.CREATE_REQUEST)}
        titleRight={"create:create_need"}
        title={'history:post_history'}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <View style={styles.viewSearch}>
          <TouchableOpacity style={styles.vButtonSearch}>
            <Image
              resizeMode='stretch'
              style={{
                width: 20,
                height: 20
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/1086/1086933.png",
              }}
            />
          </TouchableOpacity>
          <AppInput
            onChangeText={(text) => onSearch(text)}
            placeholder={intl.formatMessage({ id: "label:search", })}
            style={styles.input}
            inputContainerStyle={{ width: width - 100, height: 30, marginTop: 10 }}
            value={keyword} />
        </View>
        <View style={styles.vBottom}>
          <Button
            buttonStyle={styles.vButton}
            onPress={() => onSelectSearch('all')}
            text={intl.formatMessage({
              id: "history:all",
            })}
            textStyle={styles.txtButton}
          />
          <Button
            buttonStyle={styles.vButton2}
            onPress={() => onSelectSearch("complete")}
            text={intl.formatMessage({ id: "history:approved", })}
            textStyle={styles.txtButton}
          />
          <Button
            buttonStyle={styles.vButton3}
            onPress={() => onSelectSearch("pending")}
            text={intl.formatMessage({
              id: "history:censored",
            })}
            textStyle={styles.txtButton}
          />
        </View>
       {data && data.length > 0 ?  
        <FlatList
          data={data}
          onRefresh={() => initData(1)}
          refreshing={loading as boolean}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        />
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.vImageErr}>
            <Image
              style={styles.imgItemErr}
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
        </View>
        }
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
    flexDirection: 'row',
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
    marginHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
  vButton: {
    backgroundColor: COLOR.light_blue,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  vButton2: {
    backgroundColor: COLOR.bgOrange,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  vButton3: {
    backgroundColor: COLOR.bgRedFresh,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  txtButton: {
    fontSize: 14,
    color: COLOR.textWhite
  },
  vList: {
    paddingHorizontal: 12,
  },
  vImageErr: {
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
  vLoadMoreView: {
    marginHorizontal: 20,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  vItemHistory: {
    flexDirection: 'row',
    paddingVertical: 15,
    // borderBottomWidth: 1,
    borderBottomColor: COLOR.borderGray
  },
  imgItemErr: {
    width: 200,
    height: 150,
    borderRadius: 8
  },
  vContentHistory: {
    flex: 1,
    marginHorizontal: 20,
  },
  imgItem: {
    width: 70,
    height: 50,
    borderRadius: 8
  },
  vImage: {
    width: 70,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.borderWhiteGray
  },
  vSell: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  vButtonUpdate: {
    width: 40,
    height: 35,
    backgroundColor: 'pink',
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  vButtonSearch: {
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSearch: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
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
    borderColor: COLOR.borderWhiteGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    paddingLeft: 0,
    paddingTop: 0,
    fontSize: 15,
    color: COLOR.black
  },
});
export default HistoryNeedScreen;


import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/Apptext';
import HeaderCommon from 'src/components/HeaderCommon';
import { useTranslate } from 'src/hooks/useTranslate';
import { AppRoutes } from 'src/navigator/app-routes';
import { COLOR } from 'src/theme/color';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import FastImagePlaceholder from 'src/components/FastImage';
import { faBars, faSearch } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { normalize } from "src/helpers/normalize";
import { post,site_ajax_url,postAsync,isMobile } from "src/helpers/config";
import ViewAdsInline from 'src/components/ViewAds/inline';
import TextHeaderSimple from "src/components/TextHeader";
import  EmptyState  from "src/components/EmptyState";

const widthS = Dimensions.get("window").width;
const WIDTH_ITEM = (widthS - 40) / 1.8;

const SRC = memo((navigationRoute: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [dataList, setDataList] = useState<any>([]);
  const [dataSubcate, setDataSubcate] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);


  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  const { route } = navigationRoute;
  const params = route?.params;
 

  const onNavigator = (value: any) => {
    navigation.navigate(AppRoutes.DETAIL_SERVICE_CATEGORY, {
          id: value,
          type: params?.type,
          titleDad: params?.id
        });
     
  }
  //////API/////////////
   const my_data = async (data:any=null) => {
     return postAsync(site_ajax_url("need.php?a=home_food"),data?data:{});
   }
   //////API/////////////
  useEffect(() => {
    initData();
  }, []);
  const load_more = async (pageIndex: number) => {
    let id = intl.formatMessage({
      id: params?.id,
    })
    let result: any
    if (loading) {
      return;
    }
    if (pageIndex === 1) {
      setIsEnd(false)
    }
    setLoading(true);
    setPage(pageIndex)
    result = await my_data({page:pageIndex,limit: limit});
    try {
      if (result && result.data) {
        let currentList = [...dataList]
        currentList = currentList.concat(result?.data?.data)
        setData(result?.data);
        setDataList(currentList)
        if (currentList?.length <limit) {
          setIsEnd(true)
        }
      }
    } catch (error) {
      console.log("err", error)
    }
    setLoadMore(false)
    setLoading(false);
  };
  const initData = async () => {
    let id = intl.formatMessage({
      id: params?.id,
    })
    let result: any
    if (loading) {
      return;
    }
    
    setLoading(true); 
    result = await my_data({page:1,limit: limit});
    try {
      if (result && result.data) {
        let currentList = result?.data?.data;
        setData(result?.data);
        setDataList(currentList)
        if (currentList?.length < limit) {
          setIsEnd(true)
        }


        setDataSubcate(result?.data?.cate);
      }
    } catch (error) {
      console.log("err", error)
    }
    setLoadMore(false)
    setLoading(false);
  };
  const onNavigaterListData = (item: any) => {
    navigation.navigate(AppRoutes.DETAIL_HOME, {
      value: item
    })
  }
  ///////////////
  const num_column = isMobile()?4:2;
  const renderItem = ({ item, index }: any) => {
    if(dataList?.length>0 && dataList?.length%(num_column*4)==0){

    }
    return <CellBox item={item} index={index} onPress={()=>{
      navigation.navigate(AppRoutes.DETAIL_HOME, { value: item })
    }}/>;
  };
  ///////////////
  const renderHeadder = () => {
    return (
      <View>
        <FlatList style={{padding:8}}
          data={dataSubcate}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemCate}
          keyExtractor={(item, index) => index.toString()}
        />
      {/**/}
        {
          dataList && dataList?.length == 0 ? <EmptyState show={true} /> :
            <View style={{ marginHorizontal: 10 }}>
              <TextHeaderSimple size={16} title={intl.formatMessage({ id: "home:close_to_you", })} /> 
              <FlatList
                numColumns={num_column}
                data={dataList?sortListItemByDate(dataList):[]}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.id.toString()}
                showsHorizontalScrollIndicator={true}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
              />
            </View>
        }
      </View>
    )
  }
  const renderItemOne = () => {
    return <View />
  }
  const handleLoadMore = () => {
    if (loadMore || isEnd) {
      return;
    }
    setLoadMore(true);
    load_more(page+1);
  }

  const renderFooter = () => {
    if (!loadMore) return null;
    return (
      <ActivityIndicator  color={'gray'} size={'small'} />
    );
  }
   //icon right
  let icons_right = [
    {
      onPress: function(){
           navigation.navigate(AppRoutes.SEARCHNEED);
      },
      icon:(
        <FontAwesomeIcon icon={faSearch} size={20} style={{ color: COLOR.white, marginRight: normalize(6) }} />
      )
    }
  ];

  const onNavigater = (value: any) => {
    navigation.navigate(AppRoutes.SERVICE_CATEGORY_CHILD, {
      id: value?.title,
      type: '5',
      titleDad: 'Ăn uống'
    })
  
  }
  const renderItemCate = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{overflow: 'hidden', width: 150,   marginRight: 10, borderRadius: 8, borderWidth: 0.5, borderColor: COLOR.borderWhiteGray, backgroundColor: COLOR.bgWhite }}
        onPress={() => onNavigater(item)}
      >
        <FastImagePlaceholder style={{ width: '100%', height: 120, borderRadius: 8 }} source={item?.image} />
        <View style={styles.vTextTitleItem}>
          <AppText numberOfLines={2} fontSize={15} color={COLOR.textWhite} fontWeight="600">
            {item?.title ? item?.title : item}
          </AppText>
        </View>
      </TouchableOpacity>
    )
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderCommon left={true} title={params?.titleDad} icons={icons_right} />
        <SliderShortTerm data={data} />
        
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          renderItem={renderItemOne}
          ListHeaderComponent={renderHeadder}
          data={[]}
          onRefresh={() => initData()}
          refreshing={loading as boolean}
          showsVerticalScrollIndicator={false}
        />
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
  },
  image: {
    width: WIDTH_ITEM - 20,
    height: WIDTH_ITEM - 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  titleSubcate: {
    fontSize: 14,
    fontWeight: "600",
    color: COLOR.textWhite
  },
  containerItemSubcate: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLOR.bgBlue,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 8,
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
  content: {
    margin: 10,
    marginTop: 6,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    width: WIDTH_ITEM - 40,
  },
  
  containerItem: {
    width: WIDTH_ITEM - 15,
    height: WIDTH_ITEM + 50,
    backgroundColor: COLOR.white,
    borderRadius: 8,
    marginTop: 10,
    paddingTop: 10,
    alignItems: 'center'
  },
  vTextTitleItem: {
    width: '100%',
    height: 25,
    backgroundColor: '#00000077',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 3,
    paddingVertical: 3
  },
  imageItem: {
    width: WIDTH_ITEM - 30,
    height: WIDTH_ITEM - 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 10 
  } 
});

export default SRC;

import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import {Linking, ActivityIndicator, Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, View,FlatList,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import { AppText } from 'src/components/Apptext';
import FastImagePlaceholder from 'src/components/FastImage';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { AppRoutes } from 'src/navigator/app-routes';
import { getDataAdressAction } from 'src/old/stores/app/app.actions';
import { HomeData, Slide } from 'src/old/type/interface';
import { COLOR } from 'src/theme/color';
import BoxItem from "src/components/Item/Box";
import CellItem from "src/components/Item/Cell";
import {post,site_ajax_url} from 'src/helpers/config';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHistory,faStore,faEye,faRss } from "nvquang-font-icon/pro-solid-svg-icons";

const { width, height } = Dimensions.get("window");

const DEVICE_WIDTH = Dimensions.get("window").width;

const HistoryScreen = memo(() => {
  const intl = useTranslate();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState<HomeData>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  //suggest_list
  const [suggestlist, setSuggestlist] = useState<any>([]);



  useEffect(()=> {
    initData();

    post(site_ajax_url("public.php?a=page_history_suggest_list"),{},(res:any) =>{
      
       if(res.length){
          setSuggestlist(res);
       }
    });

  }, []);

  const initData = async () => {
    const res: any = await dispatch(getDataAdressAction());
    if (res && res.data) {
      setData(res?.data);
    }
    setLoading(false);
  };
  const pagination = () => {
    return (
      <View style={styles.viewDot}>
        <Pagination
          dotsLength={(data?.slide?.length as number) ?? 0}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: COLOR.white,
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
  const _renderItem = (item: Slide, index: number) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FastImagePlaceholder
          source={item.image}
          resizeMode={"contain"}
          style={styles.img}
          needProgress
        />
      </View>
    );
  };
  const onNavigater = (value: string) => {
    switch (value) {
      case "Need":
        navigation.navigate(AppRoutes.HISTORY_NEED)
        break;
      case "Work":
        navigation.navigate(AppRoutes.HISTORY_WORK)
        break;
      case "Shop":
        navigation.navigate(AppRoutes.HISTORY_SHOP)
        break;
      default:
        return;
    }
  }

  const _render_suggest_item = (item:any, index:any)=>{
    let type= item?.type;
    if(type=="image"){
      return <View>
         
        {item?.image? (
          <TouchableOpacity onPress={()=>{
           
              if(item?.url){
                Linking.openURL(item?.url);
              }
            }}
            activeOpacity={0.6} >
            <FastImagePlaceholder
               source={item?.image}
               resizeMode={"contain"}
               style={{width:item?.w?item?.w:width,height:item?.h?item?.h:75}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    }
    return <CellItem item={item} index={index} onPress={(item: any) => {
      switch(item.page){
         case "shop":
             navigation.navigate(AppRoutes.DETAIL_HOME_SHOP, { value: item });
         break;
         case "need":
             navigation.navigate(AppRoutes.DETAIL_HOME, { value: item });
         break;
         default:
             try{
               navigation.navigate(item.page, { value: item });
             }catch(e){}
         break;
      }
      
    }}/> 
  }
  const __renderItem = (e: any, i: number) => {
     // alert(JSON.stringify(e.item));
     return _render_suggest_item(e.item,i);
  };
  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack
        title={'history:post_history'}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={[styles.container]}>
          {data?.slide && data.slide.length ? (
            <Carousel
              autoplay={true}
              loop={true}
              containerCustomStyle={{
                height: 160,
              }}
              data={data?.slide as Slide[]}
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
          {pagination()}
          <TouchableOpacity onPress={() => onNavigater("Need")}  style={[styles.vHistory,{flex:1,flexDirection:'row'}]}>
            <View><FontAwesomeIcon color={COLOR.blue} icon={faRss} style={{ marginHorizontal: 10 }} size={18}/></View><AppText>{intl.formatMessage({ id: "history:need", })}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigater("Shop")} style={[styles.vHistory,{flex:1,flexDirection:'row'}]}>
            <View><FontAwesomeIcon color={COLOR.blue} icon={faStore} style={{ marginHorizontal: 10 }} size={18}/></View>
            <AppText>{intl.formatMessage({id: "history:services_and_stores",})}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigater("Work")} style={[styles.vHistory,{flex:1,flexDirection:'row'}]}>
            <View><FontAwesomeIcon color={COLOR.blue} icon={faHistory} style={{ marginHorizontal: 10 }} size={18}/></View>
            <AppText>{intl.formatMessage({ id: "history:work", })}</AppText>
          </TouchableOpacity>

          <View style={{padding:16}}>
            <AppText>{intl.formatMessage({
              id: "history:maybe_you_are_interested",
            })}</AppText>
            {suggestlist && suggestlist?.length ? (
            <View style={{marginTop:15}}>
              <FlatList
                style={{ marginBottom: 50 }}
                data={suggestlist} 
                showsVerticalScrollIndicator={false}
                renderItem={__renderItem}
                keyExtractor={(item, index) => index.toString()} 
              />
            </View>
          ):null}
          </View>
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
  viewSlider: {
    height: 160,
    width: "100%",
  },
  viewDot: {
    position: "absolute",
    top: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  img: {
    width: DEVICE_WIDTH - 25,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
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
    padding: 30,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    marginHorizontal: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
});

export default HistoryScreen;

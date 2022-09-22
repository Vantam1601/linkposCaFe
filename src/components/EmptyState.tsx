import React, { memo,useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle, Image,TouchableOpacity,Linking,Dimensions,Platform,FlatList } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faEye,faBrowser,faStar } from "nvquang-font-icon/pro-solid-svg-icons";
import {site_url,post,site_ajax_url} from 'src/helpers/config';
import FastImagePlaceholder from "src/components/FastImage"; 
import { COLOR } from "src/theme/color";
import BoxItem from "src/components/Item/Box";
import CellItem from "src/components/Item/Cell";
import { AppRoutes } from "src/navigator/app-routes";
import { useNavigation } from "@react-navigation/native";
import * as Config from 'src/helpers/config';

 const { width, height } = Dimensions.get("window");
const EmptyState = memo((props: any) => {
  const navigation = useNavigation();
  const intl = useTranslate();
  const { show,title} = props;
  const [suggestsearch, setSuggestsearch] = useState<any>([]); 

  useEffect(() => {
    
    post(site_ajax_url("public.php?a=page_search_suggest"),{},(data:any) => {

      setSuggestsearch(data);
    });
  }, []);
  
  const _render_suggest_item = (item:any, index:any)=>{
    let type= item?.type;
    if(type=="image"){
      
      return <View style={[styles.vCard]}>
         
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
    return <View  style={[styles.vCard]}><CellItem item={item} index={index} onPress={(item: any) => {

            switch (item.page) {
              case "shop":
                  navigation.navigate(AppRoutes.DETAIL_HOME_SHOP, { value: item });
                break;
              
              case "need":
                  navigation.navigate(AppRoutes.DETAIL_HOME, { value: item });
                break;
            }
              
          }}/> 
    </View>
  }
  return  show? <View style={styles.vImage}>
      <Image style={styles.imgItem} resizeMode="stretch"
        source={{
          uri: site_url('images/empty.png'),
        }}
      />
      <AppText
        style={{ marginTop: 10, textAlign: 'center' }}
        fontSize={15}
      >
        {title?title:intl.formatMessage({
          id: 'home:no_data_to_update',
        })}
      </AppText>
      <View style={{ marginTop: 10, padding:8}}>
        <AppText fontSize={14}>
                {intl.formatMessage({ id: "label:search_do_you_know", })}
        </AppText>
        <FlatList
            data={suggestsearch}
            renderItem={({ item, index }: any) => { 
              return _render_suggest_item(item, index);
            }}
            
            keyExtractor={(item:any, index:any) => index.toString()}
            showsHorizontalScrollIndicator={true}
        />
      </View>
    </View>:null

});

const styles = StyleSheet.create({
  vCard: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    marginVertical: 10,
    marginBottom: 0,
    borderRadius: 6,
  },
  vImage: {
    marginTop: 100,
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

export default EmptyState;

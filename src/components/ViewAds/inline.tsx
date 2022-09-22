//https://aboutreact.com/react-native-video/
import React, { memo, useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, TouchableOpacity, View,Linking,Image
} from "react-native"; 
import { useDispatch } from "react-redux"; 
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage"; 
import i18next from 'i18next';
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {post,site_ajax_url} from "src/helpers/config";

const DEVICE_WIDTH = Dimensions.get("window").width; 
const { width, height } = Dimensions.get("window");
 
const ViewAdsInline = memo((props: any) => {
  const intl = useTranslate();
 
  const [item, setItem] = useState<any>({src:null,url:null});  
 
  const config: any = useTypedSelector((state) => state.app.appJson);

  // useEffect(() => {
  //   if (!config || !config?.ads || config?.ads?.enabled === 0) {
     
  //   } else {
  //     if (props.show) {
  //       initData();
  //     }
  //   }
  // }, [props.show]);

  // const initData = async () => {
  //   try {
  //     post(site_ajax_url("ads.php?a=inline"),{},(res:any)=>{
  //       setItem(res); 
  //     });
  //   } catch (error) { 
  //   }
  // };
  
  useEffect(() => {
    if (!config || !config?.ads || config?.ads?.enabled === 0) {
     
    } else {
      post("https://media.links.fund/ads.php?a=inline",{},(res:any)=>{
        setItem(res); 
      });
      // post(site_ajax_url("ads.php?a=inline"),{},(res:any)=>{
      //   setItem(res); 
      // });
    }
  }, []);

   
  return (
    <View style={styles.container}>
       
      {item?.src? (
        <TouchableOpacity onPress={()=>{
              if(item?.url){
                Linking.canOpenURL(item?.url);
              }
          }}
          activeOpacity={0.6}
        >
          <FastImagePlaceholder
             source={item?.src}
             resizeMode={"contain"}
             style={{width:item?.w?item?.w:width,height:item?.h?item?.h:75}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});


const styles = StyleSheet.create({
  
  container: {
    marginTop:16,
    marginBottom:16,
    flex: 1,
    height:75,
    width: width
  },
});

export default ViewAdsInline;

//https://aboutreact.com/react-native-video/
import React, { memo, useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, TouchableOpacity, View,Text,Platform,Linking,
} from "react-native";
import RenderHtml from "react-native-render-html";
import Carousel from "react-native-snap-carousel";
import Video from "react-native-video";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { getAdsAction } from "src/old/stores/app/app.actions";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage";
import useInterval from "../useInterval";
import EmbedWebview from "src/old/screens/webview/component/embed";
import i18next from 'i18next';
import { useTranslate } from "src/hooks/useTranslate";
import { postAsync } from "src/helpers/config";
import Button from "src/components/Button";
import { faInfoCircle,faTimes} from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGT = Dimensions.get("window").height;

const { width, height } = Dimensions.get("window");
interface RadioProps {
  show: boolean;
  onDone: () => void;
}
const ViewAds = memo((props: RadioProps) => {
  const intl = useTranslate();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { show, onDone } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState(-1);
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();

  const config: any = useTypedSelector((state) => state.app.appJson);

  useEffect(() => {
    if (!config || !config?.ads || config?.ads?.enabled === 0) {
      onDone();
    } else {
      if (show) {
        initData();
      }
    }
  }, [show]);

  useEffect(() => {
    if (time === 0) {
      if (data?.autoclose == 1) {
        setTimeout(() => {
          onDone();
        }, 1000);
      }
    }
  }, [time]);
  useInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    },
    data && data?.timer && time > 0 ? 1000 : null
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [widthProgress, setWidthProgress] = useState<string>("0%");


  const onProgress = (data:any) => {
    var per= Math.ceil((data.currentTime*100)/duration);
    // console.log(per);
    // Video Player will progress continue even if it ends
    // if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setWidthProgress(per+"%");
    // }
  };

  const onLoad = (data:any) => {
    setDuration(data.duration); 
  };

  const initData = async () => {
    try {
      setLoading(true);
      // const res: any = await dispatch(getAdsAction());
      const res: any = await postAsync("https://media.links.fund/ads.php",{});
      //alert(JSON.stringify(res));
      if (res && res.data) {
        setData(res.data);
        setTime(res.data.timer);
      } else {
        onDone();
      }
      setLoading(false);
    } catch (error) {
      onDone();
    }
  };

  const _renderItem = (item: any, index: number) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FastImagePlaceholder
          source={item}
          resizeMode={"stretch"}
          style={{
            width: DEVICE_WIDTH - 20,
            height: 60,
          }}
          needProgress
        />
      </View>
    );
  };
  const button =()=>{
    return <TouchableOpacity
              onPress={()=>{
                if(time==0) onDone();
              }}
              activeOpacity={0.6}
              style={{
                position: "absolute",
                zIndex: 999,
                top: 50,
                backgroundColor: "rgba(52, 52, 52, 0.4)",
                padding: 4,
                right: 10,
                borderRadius: 12,
              }}
            >
              <AppText fontWeight="600" color={COLOR.white}>
                {(time?time:"")+" "+intl.formatMessage({ id: "label:ads_close", })}
              </AppText>
            </TouchableOpacity>
  };
  const renderContent = () => {
    if (data.type === "html") {
      
      return (<View style={{position:"relative",flex:1}}>
          <EmbedWebview html={data?.src} />
       
          {button()}  
          
       </View>
      ); 
    }else if (data.type === "imagefull") {
      return (<View style={{position:"relative"}}>
          <FastImagePlaceholder
            source={data?.src}
            resizeMode={"cover"}
            style={{
              width: DEVICE_WIDTH,
              height: DEVICE_HEIGT
            }}
            needProgress
       />
       {button()}
       </View>
      );
    }else if (data.type === "image") {
      return (
        <View>
          <FastImagePlaceholder
            source={data?.src}
            resizeMode={"cover"}
            style={{
              width: DEVICE_WIDTH,
              height: 250 
            }}
            needProgress
          />
          {button()}
          {time > 0 ? (
            <View
              style={{
                marginLeft: 10,
                position: "absolute",
                bottom: 20,
                backgroundColor: "rgba(52, 52, 52, 0.4)",
                padding: 4,
                borderRadius: 12,
              }}
            >
              <AppText color={COLOR.white}>00:0{time}</AppText>
            </View>
          ) : null}
        </View>
      );
    }else if (data.type === "imageicon") {
      return (
        <View style={{flex:1,display:'flex'}}>
          <View style={{flex:2}}>
              <FastImagePlaceholder
                source={data?.src}
                resizeMode={"cover"}
                style={{
                  width: DEVICE_WIDTH,
                  height: 250 
                }}
                needProgress
              />
              {button()}
          </View>
          <View style={{flex:2.5,backgroundColor:"#cecece"}}>
             
             <View style={{flex:1,padding:8}}>
               <View style={{alignItems: 'center'}}>
                 <FastImagePlaceholder
                  source={data.logo}
                  resizeMode={"cover"}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 12,
                  }}
                />
               </View>
               {renderText()}
             </View>
             <View style={{alignItems: 'center'}}>
               <Button textStyle={{color:COLOR.white}} buttonStyle={{backgroundColor:COLOR.main_color,width:300,marginBottom:36}} onPress={() => {
                if(Platform.OS=="android"){
                  Linking.openURL(data.android);
                }else{
                  Linking.openURL(data.ios);
                }  
             }} text="Download" /> 
             </View>
          </View>
          <View style={{flex:1.5,alignItems: 'center',justifyContent: 'center'}}>
              <TouchableOpacity style={{zIndex:10,position: 'absolute',right:10,top:10}}
                          onPress={() => {
                    setShowPopup(true);           
                }}
                activeOpacity={0.6}
              >
                <FontAwesomeIcon
                  color={COLOR.black}
                  icon={faInfoCircle}
                  size={22}
                />
              </TouchableOpacity>
              <FastImagePlaceholder
                source={"https://media.links.fund/public/img/logo_main.png"}
                resizeMode={"cover"}
                style={{
                  width: 125,
                  height: 125 
                }}
              />
          </View>
          
          {time > 0 ? (
            <View
              style={{
                marginLeft: 10,
                position: "absolute",
                bottom: 20,
                backgroundColor: "rgba(52, 52, 52, 0.4)",
                padding: 4,
                borderRadius: 12,
              }}
            >
              <AppText color={COLOR.white}>00:0{time}</AppText>
            </View>
          ) : null}
        </View>
      );
    } else if (data.type === "video") {
      return (
        <View style={{position:"relative",flex:1}}>
          <Video
            onProgress={onProgress}
            onLoad={onLoad}
            repeat
            source={{ uri: data?.src }}
            style={[
              styles.backgroundVideo,
              { 
                height: data?.h ?? 250,
                width:DEVICE_WIDTH
              },
            ]}
          />
          {button()}
          {time > 0 ? (
            <View
              style={{
                marginLeft: 10,
                position: "absolute",
                bottom: 30,
                backgroundColor: "rgba(52, 52, 52, 0.4)",
                padding: 4,
                borderRadius: 12,
              }}
            >
              <AppText color={COLOR.white}>00:0{time}</AppText>
            </View>
          ) : null}

          <View style={[styles.progressBar,{width:widthProgress}]}></View>
        </View>
      );
    }
    return <View />;
  };

  
  const source = {
    html: `
  <p style='text-align:center;'>
    KNC - Kết nối nhu cầu - Không cần đợi lâu
  </p>`,
  };
  const renderText = () => {
    return (
      <View style={{ padding: 10 }}>
        <AppText fontSize={16} fontWeight={"600"}>
          {data.title}
        </AppText>
        <RenderHtml contentWidth={width} source={{ html: data?.description }} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {showPopup?(<View style={{display:'flex',alignItems: 'center',justifyContent: 'center',flex:1,position:'absolute',height:'100%',width:'100%',zIndex:10,backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
        <View style={{width:'90%',height:300,backgroundColor:'#fff',borderRadius:16,padding:16,position:'relative'}}>
          <TouchableOpacity onPress={() => {
              setShowPopup(false);
          }} activeOpacity={0.5} style={{alignItems:'flex-end'}} >  
            <FontAwesomeIcon color={COLOR.main_color} icon={faTimes} style={{ marginHorizontal: 10 }}  size={20} />
          </TouchableOpacity>
          
          <View style={{display:'flex',flexDirection:'row'}}>
            <RenderHtml contentWidth={width} source={{ html: data?.adsinfo }} />
          </View>
        </View>
      </View>):null}
      {data?.src ? renderContent() : null}

      
      {data?.images ? (
        <Carousel
          autoplay={true}
          loop={true}
          autoplayInterval={6000}
          scrollEnabled={false}
          containerCustomStyle={{
            height: 70,
            position: "absolute",
            bottom: 0,
          }}
          data={data?.images}
          renderItem={({ item, index }) => _renderItem(item, index)}
          sliderWidth={DEVICE_WIDTH}
          itemWidth={DEVICE_WIDTH}
        />
      ) : null}
    </View>
  );
});


const styles = StyleSheet.create({
  progressBar: {
   height: 2,
   width:'3%',
   backgroundColor: 'yellow', 
   position:'relative',
   top:-20
 },
  backgroundVideo: {
    top: 0,
    width: DEVICE_WIDTH,
    height: 250,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
   
    flex: 1,
    width: width,
    height,
    backgroundColor: COLOR.white,
  },
});

export default ViewAds;

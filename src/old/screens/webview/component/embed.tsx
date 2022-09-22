import { faArrowLeft, faShareAlt } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
 
import React from "react";
import { Animated,Dimensions, Platform, SafeAreaView, StyleSheet, View,PermissionsAndroid,Linking} from 'react-native';
// import { BrandText } from "src/components/Text/BrandText";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
 
import { WebView } from 'react-native-webview';
import Geolocation from "@react-native-community/geolocation";
import * as MyConfig from "src/helpers/config";
import {AppRoutes} from "src/navigator/app-routes";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info'; 
import RNFS from 'react-native-fs';
import { useTypedSelector } from "src/hooks/useTypedSelector";

type Props = {
  html?: String;
  style?: any;
  onLoad?: any;
  isFile?: any;
};
const EmbedWebview = React.memo<Props>(
  ({ html,style,onLoad,isFile}) => {
    const config: any = useTypedSelector((state) => state.app.appJson);
    const intl = useTranslate();
    const myWebView = React.useRef<any>();
 
    let h = getStatusBarHeight();
    const document_ = (Platform.OS === 'android'?RNFS.MainBundlePath:RNFS.DocumentDirectoryPath)+"/";
    var code =
      Platform.OS === 'android'
        ? "window.root_local ='file:///android_asset/';"
        : "window.root_local = '"+RNFS.MainBundlePath+"/assets/'";
    code +="window.document_path='"+document_+"';";
    code +=
      'window.AhluDevice=' +
      JSON.stringify({
        mac: DeviceInfo.getUniqueId(),
        appName: DeviceInfo.getApplicationName(),
        buildNumber: DeviceInfo.getBuildNumber(),
        bundle: DeviceInfo.getBundleId(),
        os: Platform.OS,
        iphonex: h>0,
        version: DeviceInfo.getVersion()
      }) +
      ';window.iphonex='+h+'>0;window.openLink=function(data){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"openLink",data});};window.open=function(data){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"open",data});};window.close=function(){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"close",{}})}'; 
    const onWebViewMessage = async (event:any) => {
    console.log('Message received from webview');
    let msgData:any = null;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      console.log(msgData);
    } catch (err) {
      console.warn(err);
      return;
    }
    switch (msgData.targetFunc) {
      case 'post':
        var data = msgData.data;
        MyConfig.post(data.url,data.data?data.data:{},(res:any)=>{
          try{
             res = JSON.parse(res);
          }catch(ex){

          }
          msgData.args = [res];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`,
          );
        });
      break;
      case 'gps':
      
        MyConfig.GPS().then((pos:any)=>{
          console.log(pos);
          msgData.args = [pos];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`,
          );
        });

        break;
       
     
       case 'openLink':
          Linking.canOpenURL(msgData.data).then((supported:any) => {
            if (supported) {
              Linking.openURL(event.url);
               msgData.args = [];
               msgData.isSuccessfull = true;
               myWebView.current.injectJavaScript(
                `window.postMessage('${JSON.stringify(msgData)}', '*');`,
               );
            }else{
               alert(event.url+ "can not support.");
            }
          });
       break;
       case 'notification':
          MyConfig.notification.local(msgData.data);
       break;
       
    }
  };
  
  const source = isFile?{uri:isFile}:{html:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"><style>body{margin:0;padding:0}</style><body>'+html+'</body>'};
  // alert(html);
    return (
       <WebView
       ref={myWebView}
         useWebKit={true}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
        scrollEnabled={false}
        onLoad={onLoad}
        startInLoadingState
        onMessage={onWebViewMessage} 
        allowFileAccess={true}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        sharedCookiesEnabled={true}
        injectedJavaScriptForMainFrameOnly={false}
        androidHardwareAccelerationDisabled={true}
        onShouldStartLoadWithRequest={(event)=>{
          
          return MyConfig.webview.onShouldStartLoadWithRequest(event,(url:any)=>{
             
            if(config&&config?.webview){
               try{
                let f = config?.webview.split(",").filter((a:any)=>{
                   return url.includes(a);
                 });

                 if(f.length==0){
                   //no allow
                   return false;
                 }
               }catch(e){}
               
            }
              
             return true;
          });
        }}
            style={[{flex: 1},style]}
            source={source} />
    );
  }
);
const styles = StyleSheet.create({
   
});
export default EmbedWebview;

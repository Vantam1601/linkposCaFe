import React, { memo,useRef,useEffect,useState} from 'react';
import { KeyboardAvoidingView,Dimensions, Platform, SafeAreaView, StyleSheet, View,PermissionsAndroid,Linking,Share } from 'react-native';
import HeaderBack from 'src/components/HeaderBack';
import { COLOR } from 'src/theme/color';
import { ShortTerm } from 'src/old/type/interface';
import FastImagePlaceholder from 'src/components/FastImage';
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";
import DeviceInfo from 'react-native-device-info'; 
import RNFS from 'react-native-fs';
 
import { useNavigation } from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-status-bar-height';
 
import * as MyConfig from "src/helpers/config";
import {AppRoutes} from "src/navigator/app-routes";
import { storage } from "src/helpers/storage";
import EmbedWebview from "src/old/screens/webview/component/embed";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
 

const MyWebViewScreen = memo((navigationRoute: any) => {
  const document_ = (Platform.OS === 'android'?RNFS.MainBundlePath:RNFS.DocumentDirectoryPath)+"/";
  const { route } = navigationRoute;
  const params = route?.params;
  console.log(params);
  const myWebView = useRef<any>();
  const navigation = useNavigation();

  const config: any = useTypedSelector((state) => state.app.appJson);

  const [laucher,setLauncher] = useState<any>("");
  const show_laucher = ()=>{
    return  <View style={{zIndex:10,backgroundColor: COLOR.main_color,position: "absolute",left:0,top:0,height:height,width:width}}>
        <EmbedWebview html={laucher} />
       </View>  
  };

  const [jscode, setJscode] = useState('');
  const [mainurl,setMainurl] = useState<string>(params?.url);
 
  useEffect(() => {
    
    initData()
    
  }, []);
  

  const initData = async () => {
    const [w_t] = await Promise.all([
      await storage.get("w_t"),
    ]);
    

    let main_url = mainurl+(mainurl.includes("?")?"&":"?")+"w_t="+w_t;
     

    if(Platform.OS === 'ios' && main_url.includes("android_asset")){

      main_url = "file://"+main_url.replace("file:///android_asset/",RNFS.MainBundlePath+"/assets/");
     
    }

   
    
    var laucher_ = params.laucher; 
    if(laucher_){
      setLauncher(laucher_);

      setTimeout(function(){
        setLauncher("");
      },(params.timer?params.timer:2)*1000);
    }


    setMainurl(main_url); 
  };

 
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
      case 'hasPermission': 
           var data = msgData.data;
           var name = data.name;
           let granted:any = 0;
          switch (name) {
            case "camera":
            case "CAMERA":
               granted =  await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.CAMERA );

                 
              break;
            
            case "gps":
            case "GPS":
               granted= await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
              break;
          }

          msgData.args = [granted];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
          ); 
      break;
      case 'app_ready': 
           setLauncher("");
      break;
      case 'db':
        var data = msgData.data;
          
          try_db(db_path(data.db?data.db:"default.db")).then(function(db){
            if(!db)return;
            
              switch (data.ac){
                case "query":
                case "queryNone":
                   // console.log("sqlite "+db.database+" connected");

                    db.query(data.sql,data.args).then(function(res){
                       
                       msgData.args = [res];
                        msgData.isSuccessfull = true;
                        myWebView.current.injectJavaScript(
                          `window.postMessage('${JSON.stringify(msgData)}', '*');`,
                      ); 
                    },function(err){
                      console.log(err);
                       msgData.args = [err.message];
                        msgData.isSuccessfull = true;
                        myWebView.current.injectJavaScript(
                          `window.postMessage('${JSON.stringify(msgData)}', '*');`,
                      ); 
                    });
                break;
                case "table": 
                    db.table(data.tb,data.sql).then(function(res){
                        console.log("sqlite table "+data.tb+" created.");
                        msgData.args = [];
                        msgData.isSuccessfull = true;
                        myWebView.current.injectJavaScript(
                          `window.postMessage('${JSON.stringify(msgData)}', '*');`,
                      ); 
                    });
                break;
              }
       
          }); 
      break;
      case 'contacts':

          if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
              title: 'Danh bạ',
              message: 'Cho phép ứng dụng truy cập vào danh bạ.',
            }).then(() => {
              loadContacts(function(res){
                msgData.args = [res];
                msgData.isSuccessfull = true;
                myWebView.current.injectJavaScript(
                  `window.postMessage('${JSON.stringify(msgData)}', '*');`,
                );
              });
            });
          } else {
            loadContacts(function(res){
              msgData.args = [res];
                msgData.isSuccessfull = true;
                myWebView.current.injectJavaScript(
                  `window.postMessage('${JSON.stringify(msgData)}', '*');`,
                );
            });
          }
      break;
      case 'post':
        var data = msgData.data;
        Config.server.rawpost(data.url,data.data?data.data:{},function(res){
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

      case 'logingoogle':
        console.log('Login');
        //logOut();
        loginWithGoogle(function (user) {
   
          msgData.args = [user];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`,
          );
        });

        break;
      case 'adsfooter':
        var data = msgData.data;
        if(data.id){
          setBannerAds(data.id);
        }
        
        if(data.show){
          setFooterAds(true);
        }else{
          setFooterAds(false);
        } 
          
      break;
      case 'ads':
         showInterstitialAd(msgData.data.id,function(){
            msgData.args = [];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
            );
         });
      break;
      case 'ads_popup':
          navigation.navigate(AppRoutes.ADS,{
           show:true,
           callback:function(res:any){
              msgData.args = [];
              msgData.isSuccessfull = true;
              myWebView.current.injectJavaScript(
                `window.postMessage('${JSON.stringify(msgData)}', '*');`,
              );
           }
         });
      break;
      case 'gps':
        
        MyConfig.GPS().then((pos:any)=>{
         
          msgData.args = [pos];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`,
          );
        });

        break;
      case 'scan': 
        //goi view sceen
        navigation.push("ScanQR", {
          title:msgData.data.title?msgData.data.title:"Scan QR Code",
          desc:msgData.data.desc?msgData.data.desc:"Scan Qrcode for details",
          lang:msgData.data.lang?msgData.data.lang:"en",
          image:msgData.data.image?msgData.data.image:"",
          handleDataQR: function (code) {
         
            msgData.args = [code];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
            );
          }
        });
         
        break;
      case 'chat':
        
        const user = msgData.data;
        navigation.push("CHAT", user);
      break;
       
      case 'share':
        let title:any = msgData.title?msgData.title:DeviceInfo.getApplicationName();
        let settings:any=null;
        if (msgData.message && msgData.url) {
            settings= {
              title: title,
              message: msgData.message + msgData.url
            };
        } else {
          if (msgData.url) {
            settings={
              title: title,
              message:msgData.url
            };
          } else {
            settings={
              title: title,
              message: msgData.message + msgData.url
            };
          }
        }


        try {
            const result = await Share.share(settings);

            if (result.action === Share.sharedAction) {
              if (result.activityType) {
              } else {
              }
            } else if (result.action === Share.dismissedAction) {
            }
          } catch (error) {
            // Alert.alert(error.message);
          } 

        break;
       case 'back':
          navigation.goBack();
       break;
       
       case 'open':
          var data = msgData.data;
          if(typeof data =="string"){
              data ={
                 url:data
              };
          }

          navigation.push("WebViewOpen",data);
       break;
       case 'openLink':
        try{
           Linking.openURL(msgData.data);
         }catch(ex){}
         
         msgData.args = [];
         msgData.isSuccessfull = true;
         myWebView.current.injectJavaScript(
          `window.postMessage('${JSON.stringify(msgData)}', '*');`,
         );
       break;
       case 'notification':
          MyConfig.notification.local(msgData.data);
       break;
       case 'stop_record':
         
          // alert(audioPath);
       break;
       case 'play_record':
        
         let options=   { SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "wav",
            MeteringEnabled: true,};
            

            AudioRecorder.prepareRecordingAtPath(audioPath,options).then(
              success=>{
                AudioRecorder.startRecording(success=>{
                                 }).catch(console.error);
             }).catch(console.error);
       break;
       case 'readFolder':
          
          RNFS.readDir(document_).then(function(list) {
             msgData.args = [list];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          }).catch((err) => {
             msgData.args = [];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          });
       break;
       case 'readFile':
          
          RNFS.readFile(document_+msgData.data, 'utf8').then(function(s) {
             msgData.args = [s];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          }).catch((err) => {
             msgData.args = [err];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          });
       break;
       case 'writeFile':
          var data =msgData.data;
          RNFS.readFile(document_+data.file,data.text, 'utf8').then(function() {
             msgData.args = [1];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          }).catch((err) => {
             msgData.args = [err];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          });
       break;
       case 'unlink':
          var data =msgData.data;
          RNFS.readFile(document_+data).then(function() {
             msgData.args = [1];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          }).catch((err) => {
             msgData.args = [err];
             msgData.isSuccessfull = true;
             myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`,
             );
          });
       break;
    }
  };
  const showWebview = (e:any)=>{
     if(myWebView.current){

      let h = getStatusBarHeight();
      var code =
        Platform.OS === 'android'
          ? "window.root_local ='file:///android_asset/';"
          : "window.root_local = '"+RNFS.MainBundlePath+"/assets/'";
      code +="window.document_path='"+document_+"';";
      let code1=
        'window.AhluDevice=' +
        JSON.stringify({
          mac: DeviceInfo.getUniqueId(),
          appName: DeviceInfo.getApplicationName(),
          buildNumber: DeviceInfo.getBuildNumber(),
          bundle: DeviceInfo.getBundleId(),
          os: Platform.OS,
          iphonex: h>0,
          version: DeviceInfo.getVersion()
        })+';';
       let code2 = 'window.iphonex='+h+'>0;window.openLink=function(data){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"openLink",data});};window.open=function(data){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"open",data});};window.close=function(){if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage({targetFunc:"close",{}})}'; 
      // alert(code);
   
        myWebView.current.injectJavaScript(
            `${code2}`,
        ); 
        myWebView.current.injectJavaScript(
            `${code1}`,
        ); 
        myWebView.current.injectJavaScript(
            `${code}`,
        ); 
     }
  };
  const abc=()=>{
    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "absolute" : "height"} style={{flex: 1}}>
      <WebView 
        ref={myWebView}
        bounces={params?.bounces?params.bounces:false}
        useWebKit={true}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
        scrollEnabled={true}
        onLoad={showWebview}
        onMessage={onWebViewMessage}
        allowFileAccess={true}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        sharedCookiesEnabled={true}
        injectedJavaScriptForMainFrameOnly={false}
        source={{ uri: mainurl}} 
        injectedJavaScript={jscode}
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
        style={{ height:300 }} />
    </KeyboardAvoidingView>
  };

  const a=()=>{
    return <><SafeAreaView/>
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>

        <View><HeaderBack  title={params?.title} /></View>
        <View style={{ flex: 1 }}>{abc()}</View>
      </SafeAreaView></>
  };
  return (
    <View style={styles.container}>
      {laucher?show_laucher():null}
      {params?.hasheader?a():abc()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  }
 
});

export default MyWebViewScreen;

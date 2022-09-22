import React, { memo, useRef, useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  PermissionsAndroid,
  Linking,
  Share,
  KeyboardAvoidingView,
} from "react-native";

import { COLOR } from "src/theme/color";
import { ShortTerm } from "src/old/type/interface";
import FastImagePlaceholder from "src/components/FastImage";
import { WebView } from "react-native-webview";
import HTML from "react-native-render-html";
import DeviceInfo from "react-native-device-info";
import RNFS from "react-native-fs";

import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { notification, GPS, webview } from "src/helpers/config";
import { AppRoutes } from "src/navigator/app-routes";
import { storage } from "src/helpers/storage";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { DeviceEventEmitter } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const MyMainScreen = memo((navigationRoute: any) => {
  const document_ =
    (Platform.OS === "android"
      ? RNFS.MainBundlePath
      : RNFS.DocumentDirectoryPath) + "/";
  const { route } = navigationRoute;
  const params = route.params;
  const insets = useSafeAreaInsets();
  const myWebView = useRef<any>();
  const navigation = useNavigation();
  const config: any = useTypedSelector((state) => state.app.appJson);
  const [token, setToken] = useState("");
  const [devicetoken, setDevicetoken] = useState("");

  const [jscode, setJscode] = useState("");
  // const [mainurl,setMainurl] = useState<string>("");

  // let mainurl = "file:///android_asset/index.html";
  let mainurl = "https://linkpos.giaiphap.xyz/login.php";

  // if(Platform.OS === 'ios' && mainurl.includes("android_asset")){
  //   mainurl = "file://"+mainurl.replace("file:///android_asset/",RNFS.MainBundlePath+"/assets/");
  // }

  const onAndroidBackPress = () => {
    if (myWebView.current) {
      myWebView.current.injectJavaScript(`if(window.onBack)window.onBack();`);
    }
    return false;
  };
  const initData = async () => {
    const w_t: any = await storage.get("w_t");
    const device_token: any = await storage.get("token_device");
    setToken(w_t);
    setDevicetoken(device_token);
  };
  useEffect(() => {
    initData();

    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    // navigation.push("ScanQRM", {
    //   title:"Scan QR Code",
    //   desc:"Scan Qrcode for details",
    //   lang:"en",
    //   image:"",
    //   handleDataQR: function (code: any) {

    //   }
    // });

    DeviceEventEmitter.addListener("notification", broadcastReciever);
  }, []);

  const broadcastReciever = (data: any) => {
    if (data.page) {
      const routes = navigation.dangerouslyGetState().routeNames;
      navigation.navigate(data.page, data.data);
    }
    // alert(JSON.stringify(data));
  };

  const onWebViewMessage = async (event: any) => {
    console.log("Message received from webview");
    let msgData: any = null;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      console.log(msgData);
    } catch (err) {
      console.warn(err);
      return;
    }
    switch (msgData.targetFunc) {
      case "hasPermission":
        var data = msgData.data;
        var name = data.name;
        let granted: any = 0;
        switch (name) {
          case "camera":
          case "CAMERA":
            granted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.CAMERA
            );

            break;

          case "gps":
          case "GPS":
            granted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            break;
        }

        msgData.args = [granted];
        msgData.isSuccessfull = true;
        myWebView.current.injectJavaScript(
          `window.postMessage('${JSON.stringify(msgData)}', '*');`
        );
        break;
      case "app_ready":
        break;
      case "db":
        var data = msgData.data;

        try_db(db_path(data.db ? data.db : "default.db")).then(function (db) {
          if (!db) return;

          switch (data.ac) {
            case "query":
            case "queryNone":
              // console.log("sqlite "+db.database+" connected");

              db.query(data.sql, data.args).then(
                function (res) {
                  msgData.args = [res];
                  msgData.isSuccessfull = true;
                  myWebView.current.injectJavaScript(
                    `window.postMessage('${JSON.stringify(msgData)}', '*');`
                  );
                },
                function (err) {
                  console.log(err);
                  msgData.args = [err.message];
                  msgData.isSuccessfull = true;
                  myWebView.current.injectJavaScript(
                    `window.postMessage('${JSON.stringify(msgData)}', '*');`
                  );
                }
              );
              break;
            case "table":
              db.table(data.tb, data.sql).then(function (res) {
                console.log("sqlite table " + data.tb + " created.");
                msgData.args = [];
                msgData.isSuccessfull = true;
                myWebView.current.injectJavaScript(
                  `window.postMessage('${JSON.stringify(msgData)}', '*');`
                );
              });
              break;
          }
        });
        break;
      case "contacts":
        if (Platform.OS === "android") {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: "Danh bạ",
              message: "Cho phép ứng dụng truy cập vào danh bạ.",
            }
          ).then(() => {
            loadContacts(function (res) {
              msgData.args = [res];
              msgData.isSuccessfull = true;
              myWebView.current.injectJavaScript(
                `window.postMessage('${JSON.stringify(msgData)}', '*');`
              );
            });
          });
        } else {
          loadContacts(function (res) {
            msgData.args = [res];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          });
        }
        break;
      case "post":
        var data = msgData.data;
        Config.server.rawpost(
          data.url,
          data.data ? data.data : {},
          function (res) {
            try {
              res = JSON.parse(res);
            } catch (ex) {}
            msgData.args = [res];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          }
        );
        break;

      case "logingoogle":
        console.log("Login");
        //logOut();
        loginWithGoogle(function (user) {
          msgData.args = [user];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`
          );
        });

        break;
      case "adsfooter":
        var data = msgData.data;
        if (data.id) {
          setBannerAds(data.id);
        }

        if (data.show) {
          setFooterAds(true);
        } else {
          setFooterAds(false);
        }

        break;
      case "ads":
        showInterstitialAd(msgData.data.id, function () {
          msgData.args = [];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`
          );
        });
        break;
      case "ads_popup":
        navigation.navigate(AppRoutes.ADS, {
          show: true,
          callback: function (res: any) {
            msgData.args = [];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          },
        });
        break;
      case "gps":
        GPS().then((pos: any) => {
          msgData.args = [pos];
          msgData.isSuccessfull = true;
          myWebView.current.injectJavaScript(
            `window.postMessage('${JSON.stringify(msgData)}', '*');`
          );
        });

        break;
      case "scan":
        //goi view sceen
        navigation.push("ScanQR", {
          title: msgData.data.title ? msgData.data.title : "Scan QR Code",
          desc: msgData.data.desc
            ? msgData.data.desc
            : "Scan Qrcode for details",
          lang: msgData.data.lang ? msgData.data.lang : "en",
          image: msgData.data.image ? msgData.data.image : "",
          handleDataQR: function (code) {
            msgData.args = [code];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          },
        });

        break;
      case "chat":
        const user = msgData.data;
        navigation.push("Chat", user);
        break;

      case "share":
        let title: any = msgData.title
          ? msgData.title
          : DeviceInfo.getApplicationName();
        let settings: any = null;
        if (msgData.message && msgData.url) {
          settings = {
            title: title,
            message: msgData.message + msgData.url,
          };
        } else {
          if (msgData.url) {
            settings = {
              title: title,
              message: msgData.url,
            };
          } else {
            settings = {
              title: title,
              message: msgData.message + msgData.url,
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
      case "back":
        navigation.goBack();
        break;

      case "open":
        var data = msgData.data;
        if (typeof data == "string") {
          data = {
            url: data,
          };
        }

        navigation.push("WebViewOpen", data);
        break;
      case "openLink":
        try {
          Linking.openURL(msgData.data);
        } catch (ex) {}

        msgData.args = [];
        msgData.isSuccessfull = true;
        myWebView.current.injectJavaScript(
          `window.postMessage('${JSON.stringify(msgData)}', '*');`
        );
        break;
      case "notification":
        notification.local(msgData.data);
        break;
      case "stop_record":
        // alert(audioPath);
        break;
      case "play_record":
        let options = {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "wav",
          MeteringEnabled: true,
        };

        AudioRecorder.prepareRecordingAtPath(audioPath, options)
          .then((success) => {
            AudioRecorder.startRecording((success) => {}).catch(console.error);
          })
          .catch(console.error);
        break;
      case "readFolder":
        RNFS.readDir(document_)
          .then(function (list) {
            msgData.args = [list];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          })
          .catch((err) => {
            msgData.args = [];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          });
        break;
      case "readFile":
        RNFS.readFile(document_ + msgData.data, "utf8")
          .then(function (s) {
            msgData.args = [s];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          })
          .catch((err) => {
            msgData.args = [err];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          });
        break;
      case "writeFile":
        var data = msgData.data;
        RNFS.readFile(document_ + data.file, data.text, "utf8")
          .then(function () {
            msgData.args = [1];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          })
          .catch((err) => {
            msgData.args = [err];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          });
        break;
      case "unlink":
        var data = msgData.data;
        RNFS.readFile(document_ + data)
          .then(function () {
            msgData.args = [1];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          })
          .catch((err) => {
            msgData.args = [err];
            msgData.isSuccessfull = true;
            myWebView.current.injectJavaScript(
              `window.postMessage('${JSON.stringify(msgData)}', '*');`
            );
          });
        break;
    }
  };
  const showWebview = (e: any) => {};
  const local =
    Platform.OS === "android"
      ? "file:///android_asset/"
      : RNFS.MainBundlePath + "/assets/";
  const top = insets.top > 24 ? insets.top : 24;
  const props = JSON.stringify(params ? params : {});
  const config_ = JSON.stringify(config ? config : {});
  const padding = `window.onload = function(){
     window.params = ${props};
     window.MobileConfig = ${config_};
     window.close=function(){
        if(window.ReactNativeWebView){
          window.ReactNativeWebView.postMessage({targetFunc:"close"});
        }
     };
     document.head.insertAdjacentHTML("beforeend", "<style>.padTop{padding-top:${top}px!important}.padBottom{padding-bottom:${insets.bottom}px!important}.padLeft{padding-left:${insets.left}px!important}.padRight{padding-right:${insets.right}px!important}.pad{padding:${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px}<\/style>");
     if(window.$){
       window.$(document).ready(function(){
         $("body").addClass("pad");
      });
     }
     
  }`;

  const INJECTED_JAVASCRIPT = `(function() {
    ${jscode}
    window.document_path = '${document_}';
    window.root_local='${local}';
    window.authtoken='${token}';
    window.AhluDevice= ${JSON.stringify({
      mac: DeviceInfo.getUniqueId(),
      appName: DeviceInfo.getApplicationName(),
      buildNumber: DeviceInfo.getBuildNumber(),
      bundle: DeviceInfo.getBundleId(),
      os: Platform.OS,
      insets: insets,
      iphonex: getStatusBarHeight() > 0,
      version: DeviceInfo.getVersion(),
      device: DeviceInfo.isTablet() ? 1 : width < 920 ? "phone" : "desktop",
      platform: Platform.OS,
      deviceToken: devicetoken ? devicetoken : "",
    })};
    ${padding}
      
    
    
  })();`;

  console.log(INJECTED_JAVASCRIPT);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "absolute" : "height"}
        style={{ flex: 1 }}
      >
        <WebView
          ref={myWebView}
          bounces={false}
          useWebKit={true}
          originWhitelist={["*"]}
          allowsInlineMediaPlayback={true}
          scrollEnabled={false}
          onLoad={showWebview}
          onMessage={onWebViewMessage}
          allowFileAccess={true}
          domStorageEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          mixedContentMode="always"
          sharedCookiesEnabled={true}
          injectedJavaScriptForMainFrameOnly={false}
          source={{ uri: mainurl }}
          injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
          onShouldStartLoadWithRequest={(event: any) => {
            return webview.onShouldStartLoadWithRequest(event, (url: any) => {
              if (config && config?.webview) {
                try {
                  let f = config?.webview.split(",").filter((a: any) => {
                    return url.includes(a);
                  });

                  if (f.length == 0) {
                    //no allow
                    return false;
                  }
                } catch (e) {}
              }
              return true;
            });
          }}
          style={{ height: 300 }}
        />
      </KeyboardAvoidingView>
      <SafeAreaView />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
});

export default MyMainScreen;

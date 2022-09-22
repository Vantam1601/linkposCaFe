import React from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  LogBox,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import io from "socket.io-client";
import { notification } from "src/helpers/config";
import { SOCKET_URL } from "src/helpers/constants";
import { setConfigAxios } from "src/helpers/httpClient";
import { storage } from "src/helpers/storage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { getUserNotificaionReportAction } from "src/old/stores/app/app.actions";
import { meActionWithStorage } from "src/old/stores/auth/auth.actions";
import { RootNavigator } from "./root.navigator";

LogBox.ignoreAllLogs();

const App = () => {
  const dispatch = useTypedDispatch();
  const [success, setSuccess] = React.useState(false);
  const [splash, setShowSplash] = React.useState(true);

  const socketIO = (url: string) => {
    var socket = io(url);
    socket.connect();
    socket.on("connect", () => {
      console.log("connect");
      socket.emit("online");
    });
    socket.on("incommingMessage", () => {
      console.log("called");
    });

    socket.on("new message", (data: any) => {
      DeviceEventEmitter.emit("socket_new_message", data, socket);
      var message = data.message;
      // console.log("socket-> ",message);
      if (typeof message == "object") {
        if (message.pr || message?.bundle == DeviceInfo.getBundleId()) {
          var msg: any = {
            message: message.message ? message.message : "",
          };
          if (message.subtitle) {
            msg.subtitle = message.subtitle;
          }

          if (message.title) {
            msg.title = message.title;
          }

          notification.local(msg);
        }
      } else {
        // console.log(message);
        // notification.local({
        //   title:DeviceInfo.getApplicationName(),
        //   subtitle:data.username?data.username:"Tin nhắn mới",
        //   message:message
        // });
      }
    });
    socket.on("online", (data: any) => {
      DeviceEventEmitter.emit("socket_online", data);
    });
    socket.on("typing", (data: any) => {
      DeviceEventEmitter.emit("socket_typing", data);
    });
    socket.on("untyping", (data: any) => {
      DeviceEventEmitter.emit("socket_untyping", data);
    });
    socket.on("stop typing", (data: any) => {
      DeviceEventEmitter.emit("socket_untyping", data);
    });
    socket.on("user left", (data: any) => {
      DeviceEventEmitter.emit("socket_user_left", data);
    });
    socket.on("user joined", (data: any) => {
      DeviceEventEmitter.emit("socket_user_joined", data);
    });

    //
    DeviceEventEmitter.addListener("typing", (data: any) => {
      socket.on("typing", data);
    });
    DeviceEventEmitter.addListener("untyping", (data: any) => {
      socket.on("untyping", data);
    });
    DeviceEventEmitter.addListener("message", (data: any) => {
      socket.on("message", data);
    });
  };

  const init = React.useCallback(async () => {
    // await RNBootSplash.hide();
    dispatch(getUserNotificaionReportAction());
    try {
      const token = await storage.get("w_t");
      setConfigAxios(token);
      if (token) {
        await dispatch(meActionWithStorage());
        setSuccess(true);
      } else {
        setSuccess(true);
      }
    } catch {
      setSuccess(true);
    }
  }, []);

  React.useEffect(() => {
    init();
    socketIO(SOCKET_URL);
    setTimeout(() => {
      setShowSplash(false);
    }, 2200);
  }, [init]);

  const user = useCurrentUser();
  if (splash) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        {/* <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
          source={require("src/assets/logo.gif")}
        /> */}
        {/* <FastImagePlaceholder style={{
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
          source={require("src/assets/logo.gif")} /> */}
        {/* <FastImage
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
          source={{ uri: "https://linkpos.top/logo.png" }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
      </SafeAreaView>
    );
  }
  if (!success) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const isAuthenticated = user ? true : false;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <RootNavigator initialRouteName={"WebViewLinkPos"} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default App;

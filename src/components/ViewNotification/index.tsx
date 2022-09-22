import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft,faTimes } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo, useEffect, useState,useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { getLastestNotificationAction } from "src/old/stores/app/app.actions";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import EmbedWebview from "src/old/screens/webview/component/embed";
import FastImagePlaceholder from "src/components/FastImage";
import {site_url} from 'src/helpers/config';

const DEVICE_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");
interface RadioProps {
  goBack: () => void;
  show: boolean
}
const ViewNotification = memo((props: RadioProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.show) {
      initData();
    }
  }, [props.show]);

  const initData = async () => {
    try {
      setLoading(true);
      const res: any = await dispatch(getLastestNotificationAction());

      if (res && res.data) {
        setData(res.data);
      }
      setLoading(false);
    } catch (error) {}
  };

  const myWebView = useRef();


  return (
    <View style={styles.main}>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.header} >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ width: 100, position: "absolute", left: 10 }}
            onPress={() => props.goBack()}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size={20}
              style={{ color: COLOR.white }}
            />
          </TouchableOpacity>
          <FastImagePlaceholder style={{borderRadius: 50,width:60,height:60,position: 'absolute',top:-30}} source={site_url("images/logo.png")} />
          <AppText style={{position: 'relative',top:15}} fontWeight={"600"} color={COLOR.white} fontSize={16}>
            {data?.title}
          </AppText>
        </View>

        <View style={{ padding: 4, flex: 1 }}>
          <EmbedWebview html={data?.content?data?.content:""} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    height: height - 200,
    backgroundColor: COLOR.white,
    borderRadius:16
  },
  header : {
    width: width - 50,
    height: 50,
    backgroundColor: COLOR.main_color,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 4,
     borderRadius:16
  },
  main: {
    position: "absolute",
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: "center",
    alignItems: "center",

  },
});

export default ViewNotification;

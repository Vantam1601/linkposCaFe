import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { AppText } from "src/components/Apptext";
import BottomSheet from "src/components/BottomSheet";
import HeaderBack from "src/components/HeaderBack";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch"; 
import { COLOR } from "src/theme/color";

const { width, height } = Dimensions.get("window");
const CAM_VIEW_HEIGHT = Dimensions.get("screen").width * 1.5;
const CAM_VIEW_WIDTH = Dimensions.get("screen").width;
const leftMargin = 100;
// top
const topMargin = 50;
// width (height of portrait orientation)
const frameWidth = 200;
// height (width of portrait orientation)
const frameHeight = 250;
const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
const scanAreaY = topMargin / CAM_VIEW_WIDTH;
const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;

const colorDot = "#Dddddd";
const colorLine = "#CCCCCC";
const landmarkSize = 3;
type Props = {
  route: any;
};
const ScanBarCode = React.memo<Props>(({ route }) => {
  const typeRefProduct = React.useMemo(
    () => React.createRef<BottomSheet>(),
    []
  );
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();
  const intl = useTranslate();

  const [flashOn, setFlashOn] = useState(false);
  const [pending, setPending] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };

  const onSuccess = (e: any) => {
    if (pending) {
      return;
    }
    setPending(true);
    if (e?.data) {
      // Alert.alert("Success", e?.barcodes[0]?.data);
      try{
        let data = JSON.parse(e?.data); 
        //{"ac":"outlet","id":"165"}
        switch (data.ac) {
          case "outlet":
              
          break;
          
          default:
            if(route?.params.handleDataQR){
              route?.params.handleDataQR(e.data);
            } 


          break;
        }
      }catch(ex:any){
        // Alert.alert("Error", ex?.message);

        if(route?.params.handleDataQR){
          route?.params.handleDataQR(e.data);
          
        } 
      }
      navigation.goBack();
      // updateSerial(e?.barcodes[0]?.data, "scan");
    }
    
    setTimeout(() => {
      setPending(false)
    }, 1000);
  };

  const renderCamera = () => {
    const { height, width } = Dimensions.get("window");
    const maskColWidth = (width - 250) / 2;

    return (
      <RNCamera
        flashMode={flashOn ? "torch" : "off"}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        captureAudio={false}
        autoFocusPointOfInterest={{ x: 0.2, y: 0.2 }}
        onBarCodeRead={(data) => onSuccess(data)}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        style={{
          width: width - 100,
          height: width - 100,
          alignSelf: "center",
          overflow: "hidden",
          marginTop: normalize(50),
        }}
      >
        <View style={[styles.maskCenter, { flexDirection: "row" }]}>
          <View style={styles.maskInner}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginLeft: 20,
                marginTop: 20,
                transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
              }}
              source={require("src/assets/icon.png")}
            />
            <Image
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: 20,
                left: 20,
                transform: [{ rotateY: "180deg" }, { rotateX: "0deg" }],
              }}
              source={require("src/assets/icon.png")}
            />
            <Image
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: 20,
                right: 20,
                transform: [{ rotateY: "0deg" }, { rotateX: "0deg" }],
              }}
              source={require("src/assets/icon.png")}
            />
            <Image
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                top: 20,
                right: 20,
                transform: [{ rotateY: "0deg" }, { rotateX: "180deg" }],
              }}
              source={require("src/assets/icon.png")}
            />
          </View>
        </View>
      </RNCamera>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={styles.container}>
        <HeaderBack
          title={route?.params?.title?route?.params?.title:intl.formatMessage({
            id: "label:qr_code",
          })}
        />

        <View style={{ flex: 1, backgroundColor: COLOR.contentColor }}>
          <View style={[styles.maskFrame, { flex: 1, overflow: "hidden" }]}>
            <View
              style={{
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText color={COLOR.white}>
                {route?.params?.desc?route?.params?.desc:intl.formatMessage({
                  id: "label:qr_code_description",
                })}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => setFlashOn(!flashOn)}
              style={styles.btnFlash}
            >
              {!flashOn ? (
                <AppText style={{ fontSize: 14, color: "white" }}>
                  {intl.formatMessage({
                    id: "label:flash_on",
                  })}
                </AppText>
              ) : (
                <AppText style={{ fontSize: 14, color: "white" }}>
                  {intl.formatMessage({
                    id: "label:flash_on",
                  })}
                </AppText>
              )}
            </TouchableOpacity>
            {renderCamera()}
          </View>
          {route?.params?.image?<Image
              style={{
                width: '100%',
                height: 105,
                resizeMode: 'contain'
              }}
              source={{uri:route?.params?.image}}
            />:null}
        </View>
      </SafeAreaView>
    </View>
  );
});
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  btnDone: {
    marginTop: normalize(80),
    alignSelf: "center",
    backgroundColor: COLOR.main_color,
    width: normalize(width - 32),
    height: normalize(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(8),
  },
  btnFlash: {
    width: normalize(100),
    height: normalize(40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: normalize(20),
    right: normalize(10),
  },
  snapButton: {
    height: 60,
    width: 60,
    marginHorizontal: 2,
    borderWidth: 1,
    padding: 5,
    borderColor: "transparent",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    padding: 5,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  autoFocusBox: {
    position: "absolute",
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.4,
  },
  flipText: {
    color: "white",
    fontSize: 15,
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: "darkseagreen",
  },
  facesContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#FFD700",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: "absolute",
    backgroundColor: "red",
  },
  faceText: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent",
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#F00",
    justifyContent: "center",
  },
  textBlock: {
    color: "#F00",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  cameraView: {
    flex: 1,
    justifyContent: "flex-start",
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  maskInner: {
    width: width - 100,
    height: width - 100,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  maskFrame: {
    backgroundColor: "rgba(18,18,18,0.8)",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: { flexDirection: "row", overflow: "hidden" },
});
export default ScanBarCode;

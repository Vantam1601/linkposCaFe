import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import Modal from "react-native-modal";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
  TextInput,
  Text,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { RNCamera } from "react-native-camera";
import { AppText } from "src/components/Apptext";
import BottomSheet from "src/components/BottomSheet";
import HeaderBack from "src/components/HeaderBack";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { AppRoutes } from "src/navigator/app-routes";
import { COLOR } from "src/theme/color";
import FastImagePlaceholder from 'src/components/FastImage';
import {postAsync,site_ajax_url} from 'src/helpers/config';
import MyModal from "src/components/MyModal";
import { Input } from 'react-native-elements';
import EmbedWebview from "src/old/screens/webview/component/embed";
import HeaderCommon from 'src/components/HeaderCommon';
import { faBars, faSearch,faChevronDown,faChevronUp } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { amountFormat,DEFAULT_NO_IMAGE } from "src/helpers/constants";

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
const ScanBarCodeM = React.memo<Props>(({ route }) => {
  const typeRefProduct = React.useMemo(
    () => React.createRef<BottomSheet>(),
    []
  );
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();
  const intl = useTranslate();

  const [flashOn, setFlashOn] = useState(false);
  const [pending, setPending] = useState(false);
  const [mymodal, setMymodal] = useState<any>({show:false,item:null});
  const showModel = (item:any)=>{
    setMymodal({
      show:!mymodal.show,
      item:item
    });
  }

  const show_modal_html=()=>{
    return <View style={{zIndex:10,position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundColor:'#fff'}}>
        <SafeAreaView />
        <Button title="Show modal" onPress={()=>{
          setMymodal(!mymodal);
        }} />
      </View>;
  }

  const goBack = () => {
    if(data.length>0){
      if(route?.params.handleDataQR){
        route?.params.handleDataQR(data);
      } 
    }
    
    navigation.goBack();
  };
  const onSend=async()=>{
     let url = route?.params?.submit;
      if(url){
        let res = await postAsync(url,{qrcode:data});
        if(res?.data){
           
        }
      }
  };

  const renewData = (item:any)=>{
     let find = 0;
     let list =[...data];
        list.every((v:any)=>{
         if(v.id==item.id){
              v.quantity+=1,
              v.subtotal = v.quantity*v.price;
              find = 1;
              return false;
           }
        });
        if(find){
          setData(list);
        }else{ 
          setData((old:any)=>[...data,[item]]);
        }
  };

  const random = ()=>{
    return {"id":1,"quatity":1,"title":"title "+Date.now(),image:"https://cdn-icons-png.flaticon.com/512/685/685669.png","price":100000}
  };
  const [data, setData] = useState<any>([random()]);
  
  useEffect(() => {
     
     
  }, []);

  // setInterval(() =>{
  //      let item = random();
  //       renewData(item);
  //    },10*1000);

  const onSuccess = async (e: any) => {
    if (pending) {
      return;
    }
    setPending(true);
    if (e?.data) {
      // Alert.alert("Success", e?.barcodes[0]?.data);

      try{
        let item:any = JSON.parse(e?.data);
        
        renewData(item);
      }catch(e){
        Alert.alert(e?.message);

        let url = route?.params?.fetch;
        if(url){
          let res = await postAsync(url,{qrcode:e?.data});
          if(res?.data){
             try{
                let item:any = JSON.parse(res?.data);
                renewData(item);

              }catch(e){}
          }
        }
      }
      
    }

    setTimeout(() => {
      setPending(false);
    }, 1000);
  };
  const onChange = (item:any,quantity:any) => {

      data.every((v:any)=>{
         if(v.id==item.id){
            v.quantity=quantity*1,
            v.subtotal = v.quantity*v.price
            return false;
         }
      });

      // console.log(data);
      setData((old:any)=>[...data]);
  };

  const total_money = () => {
    let total  = 0;
    data.map((v:any)=>{
      if(v.subtotal){
       total+= v.subtotal;
      }else{
        total+= (v.price+"")*1;
      }
    });

    return total;
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

  const renderItemCate = (item: any, index: number, type: any) => {
    return (
      <View 
        style={{alignItems: 'center',flex:1,padding:8,display: 'flex',flexDirection:'row',marginBottom:16,justifyContent:'space-between', backgroundColor:"#fff", marginRight: 10, borderRadius: 8, borderWidth: 0.5, borderColor: COLOR.borderWhiteGray }}
        onPress={() => {

        }}
      >
        <AppText style={{flex:0,paddingHorizontal:8,justifyContent:'center',alignItems: 'center' }}
         fontSize={13} fontWeight="600">
            {index+1}
        </AppText>
        <TouchableOpacity  onPress={()=>showModel(item)}>
            <FastImagePlaceholder needProgress resizeMode="contain" style={{marginRight:8,width: 55, height: 75, borderRadius: 8 }} source={item?.image} />
        
        </TouchableOpacity>
        <View style={{flex:1}}>
          <AppText numberOfLines={1} fontSize={13} fontWeight="600">
            {item?.title ? item?.title : item}
          </AppText>
          <AppText numberOfLines={1} fontSize={13} fontWeight="600">
            Price: {amountFormat(item?.price)} x {amountFormat(item?.quantity)} = {amountFormat(item?.subtotal)}
          </AppText>
          <Input
            multiline={false} 
            onChangeText={(val) => onChange(item,val)}
 
            value={item?.quatity}
            inputContainerStyle={{
              borderColor: COLOR.borderWhiteGray,
              borderBottomWidth: 1,
            }} 
          />
          
        </View>
      </View>
    )
  };
  const [topmost,setTopmost] = useState<any>(null);

  let icons_right = [
    {
      onPress: function(){
        setTopmost(topmost?null:{zIndex:10,position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundColor:'#fff'});
      },
      icon:(
        <FontAwesomeIcon icon={topmost?faChevronDown:faChevronUp} size={20} style={{ color: COLOR.white, marginRight: normalize(6) }} />
      )
    }
  ];
  return (
    <View style={styles.container}>
     
      <SafeAreaView />
      <SafeAreaView style={styles.container}>
        <HeaderCommon left={true} title={route?.params?.title?route?.params?.title:intl.formatMessage({
            id: "label:qr_code",
          })} icons={icons_right} />
 

        <View style={{ flex: 1, backgroundColor: COLOR.contentColor }}>
          <View style={[styles.maskFrame, { flex: 0, overflow: "hidden",marginBottom:8 }]}>
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
                <AppText style={{ fontSize: normalize(14), color: "white" }}>
                  {intl.formatMessage({
                    id: "label:flash_on",
                  })}
                </AppText>
              ) : (
                <AppText style={{ fontSize: normalize(14), color: "white" }}>
                  {intl.formatMessage({
                    id: "label:flash_on",
                  })}
                </AppText>
              )}
            </TouchableOpacity>
            {renderCamera()}
          </View>
          <View style={[{paddingHorizontal:8,flex:1},topmost?topmost:{}]}>
            <View style={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <AppText style={{ fontSize: normalize(14),paddingVertical:8}}>
                  TC: {data?data.length:0}
              </AppText>

              <AppText style={{ fontSize: normalize(14),paddingVertical:8}}>
                 {amountFormat(total_money())}
              </AppText>

               <TouchableOpacity activeOpacity={0.6} onPress={onSend}  >
                 <AppText>
                    Submit
                  </AppText>
              </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1}}>
              
              <FlatList
                data={data} 
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => renderItemCate(item, index, '1')}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
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
       <Modal isVisible={mymodal.show}>
        
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={{
              flex: 1, 
            }}
            enabled
            keyboardVerticalOffset={50}
            behavior={Platform.OS !== "android" ? "padding" : "height"}
          >
            <View style={{ flex: 1,backgroundColor:"#fff",margin:-32 }}>
              <Button title="Show modal" onPress={ () => {
                  setMymodal({
                    show:!mymodal.show,
                    item: null
                  });
              }} />
              {mymodal.show?<EmbedWebview html={`<style>body{padding:20px;}</style><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"> </script><p id="GFG_UP" style="font-size: 15px; font-weight: bold;"> </p><button onclick="constructTable('#table')"> click here </button> <br><br><div style="width: 100%;overflow-x: scroll;"> <table align="center" class="table" id="table" border="1"> </table> </div><script>var el_up=document.getElementById("GFG_UP"); var list=[${JSON.stringify(mymodal.item)}]; el_up.innerHTML="Click on the button to create " + "the table from the JSON data.<br><br>" + JSON.stringify(list[0]) + "<br>" + JSON.stringify(list[1]) + "<br>" + JSON.stringify(list[2]); function constructTable(selector){var cols=Headers(list, selector); for (var i=0; i < list.length; i++){var row=$('<tr/>'); for (var colIndex=0; colIndex < cols.length; colIndex++){var val=list[i][cols[colIndex]]; if (val==null) val=""; row.append($('<td/>').html(val));}$(selector).append(row);}}function Headers(list, selector){var columns=[]; var header=$('<tr/>'); for (var i=0; i < list.length; i++){var row=list[i]; for (var k in row){if ($.inArray(k, columns)==-1){columns.push(k); header.append($('<th/>').html(k));}}}$(selector).append(header); return columns;}</script>`} />:null}
              
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal> 
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
export default ScanBarCodeM;

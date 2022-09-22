import React, { memo, useState,useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, Dimensions, Image, } from 'react-native';
import { AppText } from 'src/components/Apptext';
import FastImagePlaceholder from 'src/components/FastImage';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from 'src/components/Button';
import HeaderBack from 'src/components/HeaderBack';
import { RNCamera } from 'react-native-camera';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { verificationKYCAction } from 'src/old/stores/app/app.actions';
import { post,site_ajax_url,postAsync,isMobile } from "src/helpers/config";

const { width, height } = Dimensions.get("window");

const VerificationKycScreen = memo(() => {
  const [filePathCmnd, setFilePathCmnd] = useState<string>("");
  const [filePathCmndTwo, setFilePathCmndTwo] = useState<string>("");
  const [filePathBill, setFilePathBill] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const intl = useTranslate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    post(site_ajax_url("user.php?a=get_verify_kyc"),{},(res:any)=>{
 
 
      if (res) {
        
        setData(res.data);
      }
    }); 
  }, []);

  const chooseFile = (type: string) => {
    let options = {
      title: 'Chọn ảnh',
      // customButtons: [
      //   {
      //     name: 'customOptionKey',
      //     title: 'Browse'
      //   },
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth:1024,
      maxHeight:860,
      quantity:0.9
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response?.uri) {
        const a = {uri: response};
        let source: any =  {
            uri:
            Platform.OS === 'android'
              ? a.uri.uri
              : a.uri.uri.replace('file://', ''),
          name: a.uri.type == 'image/jpeg'
              ? `dummy${Date.now()}.jpg`
              : `dummy${Date.now()}.mp4`,
          type: 'image/*',
        };
        switch (type) {
          case 'CMND_ONE':
            setFilePathCmnd(source);
            break;
          case 'CMND_TWO':
            setFilePathCmndTwo(source)
            break;
          case 'CMND_BILL':
            setFilePathBill(source)
            break;
          default:
            return;
        }
      }
      else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      }
    });
  };

  const onSend = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    await dispatch(verificationKYCAction(
      filePathCmnd,
      filePathCmndTwo,
      filePathBill
    ))
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack
        title={"label:kyc"}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vCMNDfront}>
              <TouchableOpacity onPress={() => chooseFile('CMND_ONE')}>
                {
                  filePathCmnd ?
                    <Image
                      source={{ uri: filePathCmnd.uri }}
                      style={[styles.imageNoSelect]}
                    />
                    :
                    <FastImagePlaceholder
                      needProgress
                      source={data?data.front.image:'https://image.shutterstock.com/image-vector/idea-personal-identity-id-card-260nw-771953146.jpg'}
                      // resizeMode="contain"
                      style={[styles.imageNoSelect]}
                    />
                }

              </TouchableOpacity>
              <AppText fontSize={15} style={styles.txtTitle} fontWeight="600">
                {intl.formatMessage({ id: 'label:cmnd_front', })}
              </AppText>
              <View>
              <AppText fontSize={15} style={[styles.txtTitle,{color:COLOR.red}]} fontWeight="600">
                {data?(data.front.confirm==0?(data.front.note?data.front.note:"Chưa duyệt"):"Đã duyệt"):""}
              </AppText>
              </View>
              
            </View>
            <View style={styles.vCMNDbackside}>
              <TouchableOpacity onPress={() => chooseFile('CMND_TWO')}>
                {
                  filePathCmndTwo ?
                    <Image
                      source={{ uri: filePathCmndTwo.uri }}
                      style={[styles.imageNoSelect]}
                    />
                    :
                    <FastImagePlaceholder
                      needProgress
                      source={data?data.back.image:'https://image.shutterstock.com/image-vector/idea-personal-identity-id-card-260nw-771953146.jpg'}
                      // resizeMode="contain"
                      style={[styles.imageNoSelect]}
                    />
                }
              </TouchableOpacity>
              <AppText
                fontSize={15}
                style={styles.txtTitle}
                fontWeight="600"
              >
                {intl.formatMessage({
                  id: 'label:cmnd_backside',
                })}
              </AppText>
              <View>
                <AppText fontSize={15} style={[styles.txtTitle,{color:COLOR.red}]} fontWeight="600">
                  {data?(data.back.confirm==0?(data.back.note?data.back.note:"Chưa duyệt"):"Đã duyệt"):""}
                </AppText>
              </View>
            </View>
            <View style={styles.vElectricityWater}>
              <TouchableOpacity onPress={() => chooseFile('CMND_BILL')}>
                {
                  filePathBill ?
                    <Image
                      source={{ uri: filePathBill.uri }}
                      style={[styles.imageNoSelect]}
                    />
                    :
                    <FastImagePlaceholder
                      needProgress
                      source={data?data.bill.image:'https://us.123rf.com/450wm/dacianlogan/dacianlogan1712/dacianlogan171200010/91897814-vektor-kaufbelegsymbol.jpg?ver=6'}
                      // resizeMode="contain"
                      style={[styles.imageNoSelect]}
                    />
                }

              </TouchableOpacity>
              <AppText
                fontSize={15}
                style={styles.txtTitle}
                fontWeight="600"
              >
                {intl.formatMessage({
                  id: 'label:electricity_water_bill',
                })}
              <View>  
                <AppText fontSize={15} style={[styles.txtTitle,{color:COLOR.red}]} fontWeight="600">
                {data?(data.bill.confirm==0?(data.bill.note?data.bill.note:"Chưa duyệt"):"Đã duyệt"):""}
                </AppText>
              </View>  
              </AppText>
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <View style={styles.vButtonSend}>
          <Button
            buttonStyle={styles.buttonLogin}
            loading={loading}
            onPress={onSend}
            text={intl.formatMessage({
              id: "label:send_kyc",
            })}
            loadingColor={COLOR.white}
            textStyle={styles.txtLogin}
          />
        </View>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  vMain: {
    paddingVertical: 15,
    marginTop: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10
  },
  vCMNDfront: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vCMNDbackside: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vElectricityWater: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNoSelect: {
    width: 125,
    height: 134,
  },
  txtTitle: {
    marginTop: 5,
    marginBottom: 30
  },
  vButtonSend: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 12,
    backgroundColor: COLOR.white,
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 0,
          width: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    borderTopWidth: 2,
    borderTopColor: COLOR.borderGray
  },
  buttonLogin: {
    width: width - 60,
  },
  txtLogin: {
    fontSize: 14,
    color: COLOR.white
  },
});

export default VerificationKycScreen;
 

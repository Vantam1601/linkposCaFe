import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Dimensions, Image, Platform, SafeAreaView,KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { AppText } from 'src/components/Apptext';
import BottomSheet from 'src/components/BottomSheet';
import DropdownButton from 'src/components/DropdownButton';
import HeaderBack from 'src/components/HeaderBack';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useTranslate } from 'src/hooks/useTranslate';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { getConsciousAction, getCountryDistrictAction, getCountryWardsAction, postCreateEmergencyAction } from 'src/old/stores/app/app.actions';
import { Conscious, District } from 'src/old/type/interface';
import { COLOR } from 'src/theme/color';
import * as Yup from "yup";
import { dataTimeEmerency } from 'src/old/mocks/dataHistory';
import Button from 'src/components/Button';
import NeedCategory from 'src/screens/need/component/category';
import { useConfig } from 'src/hooks/useConfigJson';
import { values } from 'lodash';
import ImagePicker from 'react-native-image-picker';
import NeedCategoryEmergency from 'src/screens/need/component/category.child';
import {image,country,removeAccents} from "src/helpers/config";
import TextHeaderSimple from "src/components/TextHeader";
import { amountFormat,DEFAULT_NO_IMAGE } from "src/helpers/constants"; 
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const dataEmergency = [
  {
    type: "people",
    title: "Hiệp sĩ"
  },
  {
    type: "police",
    title: "Công an"
  },
  {
    type: "hospital",
    title: "Trạm y tế"
  },
  {
    type: "lost",
    title: "Mất giấy tờ"
  },
  {
    type: "found",
    title: "Tìm thấy giấy tờ"
  },
  {
    type: "sos2",
    title: "Xe 2 bánh"
  },
  {
    type: "help",
    title: "Xe 4 bánh"
  },
  {
    type: "help",
    title: "Cần giúp đỡ"
  },

  {
    type: "warning",
    title: "Cảnh báo lừa đảo"
  },
  {
    type: "charity",
    title: "Hoạt động thiện nguyện"
  },
  {
    type: "other",
    title: "Khác"
  },
];
const UpdatePostHistorySchema = Yup.object().shape({
  title: Yup.string().required("* Required"),
  phone: Yup.string().required("* Required"),
  description: Yup.string().required("* Required"),
  numberHouse: Yup.string().required("* Required"),
});

type CreatePostHistoryVariables = {
  title: string,
  phone: string,
  description: string,
  numberHouse: string
};
const CreateEmergencyScreen = memo(() => {
  const navigation = useNavigation();
  const user = useCurrentUser();
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const config = useConfig()

  const [loading, setLoading] = useState<boolean>(false);
  const refsConscious = React.createRef<BottomSheet>();
  const refsDistrict = React.createRef<BottomSheet>();
  const refsWards = React.createRef<BottomSheet>();
  const refsCategory = React.createRef<BottomSheet>();

  const [dataConscious, setDataConscious] = useState<Conscious[]>([]);
  const [dataDistrict, setDataDistrict] = useState<District[]>([]);
  const [dataWards, setDataWards] = useState<District[]>([]);
  const [conscious, setConscious] = useState<string>(user?.province ? user?.province : "");
  const [district, setDistrict] = useState<string>(user?.district ? user?.district : "");
  const [wards, setWards] = useState<string>(user?.ward ? user?.ward : "");
  const [category, setCategory] = useState<string>("");
  const [idConscious, setIdConscious] = useState<string>(user?.province_id ? user?.province_id : "");
  const [idDistrict, setIdDistrict] = useState<string>(user?.district_id ? user?.district_id : "");
  const [idWard, setIdWard] = useState<string>(user?.ward_id ? user?.ward_id : "");
  const [categoryChild, setCategoryChild] = useState<string>("");
  const [isIndex, setIsIndex] = useState<number>(-1);
  const [day, setDay] = useState<string>("");
  const [nimage1, setNimage1] = useState<string>("");
  const [nimage2, setNimage2] = useState<string>("");
  const [nimage3, setNimage3] = useState<string>("");
  const [nimage4, setNimage4] = useState<string>("");
  const [dataConfig, setDataConfig] = useState<any>([])

  const { control, handleSubmit, errors } = useForm<CreatePostHistoryVariables>({
    resolver: yupResolver(UpdatePostHistorySchema),
  });

  const [cachecategory, setCachecategory] = useState<any>({});
  useEffect(() => {
    getData()
    getDataConfig()
  }, []);


   const getData = async () => {

    country.init().then((res:any)=>{
      

      let provinces:any = res.tinh_tp;
      //
      cachecategory.province = provinces;
      setDataConscious(provinces);
      setCachecategory(cachecategory);
      // if (user?.province_id && user?.province_id != "") {
      //   let ditrict = await getDataDitrict(user?.province_id);
      //   setDataDistrict(ditrict)
      //   setConscious(user?.province)
      //   setIdConscious(user?.province_id)
      //   if (user?.district_id && user?.district_id != "") {
      //     let wards = await getDataWards(user?.district_id);
      //     setDataWards(wards)
      //     setDistrict(user?.district)
      //     setIdDistrict(user?.district_id)
      //     if (user?.ward_id && user?.ward_id != "") {
      //       setWards(user?.ward)
      //       setIdWard(user?.ward_id)
      //     }
      //   }
      // }
    });
  }
  const getDataConfig = () => {
    let arr: any;
    arr = config?.shop?.categories;
    const objectArray = Object.entries(arr);
    let array: any = [];
    objectArray.forEach(([key, value]) => {
      array.push({
        title: key,
        data: Object.keys(value),
        dataChild: Object.values(value),
      });
    });
    setDataConfig(array)
  }

  const onSelectConscious = async (value: any) => {

    if (value != null) {
      let id = value?.code;
      let name = value?.name;
     
      let arr:any = country.toDistrict(id);
      cachecategory.district = arr;
      setCachecategory(cachecategory);

      setDataDistrict(arr)
      setConscious(name);
      setIdConscious(id)
      if (id != idConscious) {
        setDistrict("");
        setWards("")
      }
    } else {
      setConscious("");
      setDistrict("");
      setWards("")
    }
  };
  const onSelectDistrict = async (value: any) => {
    if (value != null) {
      let id = value?.code;
      let name = value?.name;
     

      let arr:any = country.toWard(id);
      cachecategory.ward = arr;
      setCachecategory(cachecategory);
      setDataWards(arr);
      setDistrict(name);
      setIdDistrict(id);
      if (id != idDistrict) {
        setWards("");
      }
    } else {
      setDistrict("");
      setWards("");
    }
  };
  const onSelectWards = (value: any) => {
    if (value != null) {
      setWards(value?.name);
      setIdWard(value?.code)
    } else {
      setWards("")
    }
  };

 

  const onCreate = async (value: CreatePostHistoryVariables) => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn tạo tin này ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Đồng ý",
          onPress: () => onAgreeCreate(value)
        }
      ]
    );
  };

  const chooseFile = (type: string) => {
    let options = {
      title: 'Chọn ảnh',
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
          case 'nimage1':
            setNimage1(source)
            break;
          case 'nimage2':
            setNimage2(source)
            break;
          case 'nimage3':
            setNimage3(source)
            break;
          case 'nimage4':
            setNimage4(source)
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
        Alert.alert(response.customButton);
      }
    });
  };

  const onAgreeCreate = async (value: any) => {
    if (loading) {
      return
    }
    setLoading(true);
    setTimeout(()=>{
      Toast.show({
        type: "success",
        text2: "Đăng tin khẩn cấp thành công 👋",
      });

      setLoading(false);
      navigation.goBack();
      
    },1000);
     dispatch(postCreateEmergencyAction(
      nimage1,
      nimage2,
      nimage3,
      nimage4,

      value?.title,
      value?.phone,
      value?.description,
      categoryChild,

      value?.numberHouse,
      idConscious,
      conscious,
      idDistrict,
      district,
      idWard,
      wards,
      day
    ));
  };
  
  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <HeaderBack title={'history:create_emergency'}  />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        
         <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          enabled
          keyboardVerticalOffset={50}
          behavior={Platform.OS !== "android" ? "padding" : "height"}
        >
         <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={[styles.vCard]}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "history:title",
                })}
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoFocus
                    autoCapitalize="none"
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.title ? errors.title.message : ""
                    }
                    multiline={false}
                    onChangeText={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    inputContainerStyle={{
                      borderColor: COLOR.borderWhiteGray,
                      borderBottomWidth: 1,
                    }}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.title ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="title"
                rules={{ required: true }}
                defaultValue=""
              />

            </View>
            <View style={styles.vTextTitle}>
            </View>
            <View style={[styles.vCard]}>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "history:phone",
                })}
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.phone ? errors.phone.message : ""
                    }
                    multiline={false}
                    onChangeText={(val) => onChange(val)}
                    onBlur={onBlur}
                    keyboardType={'numeric'}
                    maxLength={10}
                    value={value}
                    inputContainerStyle={{
                      borderColor: COLOR.borderWhiteGray,
                      borderBottomWidth: 1,
                    }}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.phone ? 30 : 16 },
                    ]}
                    style={styles.textInput}
                  />
                )}
                name="phone"
                rules={{ required: true }}
                defaultValue={user?user?.phone:""}
              /> 
              {/* </View>
            <View style={[styles.vCard]}> */}
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "Loại khẩn cấp",
                })}
              </AppText>
              {/* <NeedCategoryEmergency
                bsRef={refsCategory}
                title={category}
                // idProps={idDistrict}
                data={dataEmergency}
                stylesProps={{ margin: 10, }}
                onChange={onSelectCategory}
              /> */}
              <NeedCategoryEmergency
                bsRef={refsCategory}
                title={intl.formatMessage({ id: 'category:'+category, })}
                category={category}
                data={dataEmergency}
                stylesProps={{ margin: 10 }}
                onChange={(value: any) => {
                  setCategoryChild(value);
                }}
              />
            </View>
            <TextHeaderSimple title={intl.formatMessage({ id: "create:description", })+" (2,000 kí tự)"} />
            <View style={[styles.vCard]}>
               
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                     multiline={true}
                    autoCapitalize="none"
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.description ? errors.description.message : ""
                    }
                    placeholder={intl.formatMessage({
                      id: "input:input_descrif",
                    })}
                    onChangeText={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    inputContainerStyle={{
                      borderColor: COLOR.borderWhiteGray,
                      borderBottomWidth: 1,
                    }}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.description ? 30 : 16,height:200 },
                    ]}
                    numberOfLines={10}
                    style={styles.textInput}
                  />
                )}
                name="description"
                maxLength={2000}
                rules={{ required: true }}
                defaultValue=""
              />
              
            </View>
            <TextHeaderSimple title={intl.formatMessage({ id: "create:address", })} />
             
            <View style={[styles.vCard]}>
              <View>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:province_city",
                  })}
                </AppText>
                <DropdownButton
                  bsRef={refsConscious}
                  title={conscious}
                  idProps={idConscious}
                  data={dataConscious}
                  stylesProps={{ margin: 10, }}
                  onChange={onSelectConscious}
                  onSearch ={(text:any) => {
                    if(cachecategory?.province){
                        let filterData:any = [];
                        const str = removeAccents(text.trim().toLowerCase());
                        if (text) {
                          cachecategory?.province.map((item:any)=>{
                            console.log(item);
                            var b = (item.name?item.name:item).toLowerCase()
                            var a = removeAccents(b);
                            // console.log(a,"=",str,"=",a.includes(str));
                            if (a.includes(str) ) {
                                filterData.push(item);
                            }
                          });
                          
                        }else{
                          filterData = cachecategory.province;
                        }
                       setDataConscious(filterData); 
                    }
                      
                  }}
                  />

                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:district",
                  })}
                </AppText>
                <DropdownButton
                  bsRef={refsDistrict}
                  title={district}
                  idProps={idDistrict}
                  data={dataDistrict}
                  stylesProps={{ margin: 10, }}
                  onChange={onSelectDistrict}
                  onSearch ={(text:any) => {
                    if(cachecategory?.district){
                        let filterData:any = [];
                        const str = removeAccents(text.trim().toLowerCase());
                        if (text) {
                          cachecategory?.district.map((item:any)=>{
                            console.log(item);
                            var b = (item?.name?item.name:item).toLowerCase()
                            var a = removeAccents(b);
                            // console.log(a,"=",str,"=",a.includes(str));
                            if (a.includes(str) ) {
                                filterData.push(item);
                            }
                          });
                          
                        }else{
                          filterData = cachecategory.district;
                        }
                       setDataDistrict(filterData); 
                    }
                      
                  }}
                   />

                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:wards",
                  })}
                </AppText>
                <DropdownButton
                  bsRef={refsWards}
                  title={wards}
                  data={dataWards}
                  idProps={idWard}
                  stylesProps={{ margin: 10, }}
                  onChange={onSelectWards}
                  onSearch ={(text:any) => {
                    if(cachecategory?.ward){
                        let filterData:any = [];
                        const str = removeAccents(text.trim().toLowerCase());
                        if (text) {
                          cachecategory?.ward.map((item:any)=>{
                            console.log(item);
                            var b = (item?.name?item.name:item).toLowerCase()
                            var a = removeAccents(b);
                            // console.log(a,"=",str,"=",a.includes(str));
                            if (a.includes(str) ) {
                                filterData.push(item);
                            }
                          });
                          
                        }else{
                          filterData = cachecategory.ward;
                        }
                       setDataWards(filterData); 
                    }
                      
                  }}
                   />
              </View>
              <AppText style={styles.txtLabel}>
                {intl.formatMessage({
                  id: "history:apartment_number",
                })}
              </AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    autoCapitalize="none"
                    errorStyle={styles.textError}
                    errorMessage={
                      errors.numberHouse ? errors.numberHouse.message : ""
                    }
                    onChangeText={(val) => onChange(val)}
                    onBlur={onBlur}
                    value={value}
                    inputContainerStyle={{
                      borderColor: COLOR.borderWhiteGray,
                      borderBottomWidth: 1,
                    }}
                    containerStyle={[
                      styles.input,
                      { marginBottom: errors.numberHouse ? 30 : 16 },
                    ]}
                    numberOfLines={10}
                    style={styles.textInput}
                  />
                )}
                name="numberHouse"
                rules={{ required: true }}
                defaultValue=""
              />
            </View> 
            <TextHeaderSimple title={intl.formatMessage({ id: "history:post_an_avatar", })} />  
            <View style={[styles.vCard]}>
              <View style={{
                flexDirection: 'row',
                flexWrap: "wrap",
                marginTop: 10,
                paddingHorizontal: 15,
              }}>

                <TouchableOpacity style={[styles.vImageChild, { marginRight: 5 }]} onPress={() => chooseFile('nimage1')}>
                  <Image
                    style={styles.imgItemChild}
                    resizeMode="stretch"
                    source={{
                      uri: nimage1 ? nimage1?.uri : DEFAULT_NO_IMAGE
                    }}
                  />
                  <AppText
                    style={{ marginTop: 5, textAlign: 'left' }}
                    fontWeight='600'
                    fontSize={14}>
                    {intl.formatMessage({
                      id: 'history:image',
                    })}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.vImageChild, { marginLeft: 5 }]} onPress={() => chooseFile('nimage2')}>
                  <Image
                    style={styles.imgItemChild}
                    resizeMode="stretch"
                    source={{
                      uri: nimage2  ? nimage2?.uri : DEFAULT_NO_IMAGE
                    }}
                  />
                  <AppText
                    style={{ marginTop: 5, textAlign: 'left' }}
                    fontWeight='600'
                    fontSize={14}>
                    {intl.formatMessage({
                      id: 'history:image',
                    })}
                  </AppText>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row',
                flexWrap: "wrap",
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
                <TouchableOpacity style={[styles.vImageChild, { marginRight: 5 }]} onPress={() => chooseFile('nimage3')}>
                  <Image
                    style={styles.imgItemChild}
                    resizeMode="stretch"
                    source={{
                      uri: nimage3 ? nimage3?.uri : DEFAULT_NO_IMAGE
                    }}
                  />
                  <AppText
                    style={{ marginTop: 5, textAlign: 'left' }}
                    fontWeight='600'
                    fontSize={14}>
                    {intl.formatMessage({
                      id: 'history:image',
                    })}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.vImageChild, { marginLeft: 5 }]} onPress={() => chooseFile('nimage4')}>
                  <Image
                    style={styles.imgItemChild}
                    resizeMode="stretch"
                    source={{
                      uri: nimage4  ? nimage4?.uri : DEFAULT_NO_IMAGE
                    }}
                  />
                  <AppText
                    style={{ marginTop: 5, textAlign: 'left' }}
                    fontWeight='600'
                    fontSize={14}>
                    {intl.formatMessage({
                      id: 'history:image',
                    })}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.vCard, { alignItems: 'center', justifyContent: 'center' }]}>
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit(onCreate)}
                text={intl.formatMessage({
                  id: "history:create_request",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtLogin}
              />
            </View>
          </View>
           </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.contentColor,
  },
  vMain: {
    marginHorizontal: 12
  },
  vCard: {
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    paddingVertical: 12,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    marginBottom: 0,
    borderRadius: 6,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 8,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 30,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
    marginBottom: 10,
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  textError: {
    position: "absolute",
    color: COLOR.txtRed,
    // marginTop: 20,
    // marginBottom: 5,
    textAlign: "right",
    bottom: -35,
    right: 5,
  },
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  vItem: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.borderWhiteGray,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  txtDay: {
    fontSize: 15,
    textAlignVertical: "center",
  },
  vImage: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 7,
    marginHorizontal: 15,
    borderRadius: 6,
    borderColor: COLOR.borderWhiteGray
  },
  vImageChild: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 6,
    borderColor: COLOR.borderWhiteGray
  },
  imgItem: {
    width: 320,
    height: 150
  },
  imgItemChild: {
    width: 135,
    height: 70
  },
  buttonLogin: {
    width: width - 60,
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
});

export default CreateEmergencyScreen;



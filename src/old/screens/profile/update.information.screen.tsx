import React, { memo, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Conscious, District } from "src/old/type/interface";
import { AppText } from "src/components/Apptext";
import { yupResolver } from "@hookform/resolvers/yup";
import FastImagePlaceholder from "src/components/FastImage";
import ProfileItem from "src/components/ProfileItem";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import RadioButton from "src/components/RadioButton";
import HeaderBack from "src/components/HeaderBack";
import DropdownButton from "src/components/DropdownButton";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import {
  updateProfileAction,
  getDataAdressAction,
  getConsciousAction,
  getCountryDistrictAction,
  getCountryWardsAction,
} from "src/old/stores/app/app.actions";
import BottomSheet from "src/components/BottomSheet";
import Input from "src/components/AppInputElement";
import {image,country,removeAccents} from "src/helpers/config";

const { width, height } = Dimensions.get("window");

const UpdateInformationSchema = Yup.object().shape({
  name: Yup.string().required("* Required"),
  phonenumber: Yup.string().required("* Required"),
  email: Yup.string().required("* Required"),
  cmnd: Yup.string().required("* Required"),
  numberHouse: Yup.string().required("* Required"),
});

type UpdateInformationVariables = {
  name: string;
  phonenumber: string;
  email: string;
  cmnd: string;
  numberHouse: string;
};

const UpdateInformationScreen = memo(() => {
  const user = useCurrentUser();
  const [fullname, setFullname] = useState<string>(
    user?.fullname ? user?.fullname : ""
  );
  const [email, setEmail] = useState<string>(user?.email ? user?.email : "");
  const [phone, setPhone] = useState<string>(user?.phone ? user?.phone : "");
  const [cmnd, setCMND] = useState<string>(user?.cmnd ? user?.cmnd : "");
  const [gender, setGender] = useState<string>(
    user?.gender ? user?.gender : ""
  );
  const [numberHouse, setNumberHouse] = useState<string>(
    user?.street ? user?.street : ""
  );
  const [selectGender, setSelectGender] = useState<number>(
    user?.gender === "Nam" ? 0 : 1
  );
  const [dataConscious, setDataConscious] = useState<Conscious[]>([]);
  const [dataDistrict, setDataDistrict] = useState<District[]>([]);
  const [dataWards, setDataWards] = useState<District[]>([]);
  const [conscious, setConscious] = useState<string>(
    user?.province ? user?.province : ""
  );
  const [district, setDistrict] = useState<string>(
    user?.district ? user?.district : ""
  );
  const [wards, setWards] = useState<string>(user?.ward ? user?.ward : "");
  const [idConscious, setIdConscious] = useState<string>(
    user?.province_id ? user?.province_id : ""
  );
  const [idDistrict, setIdDistrict] = useState<string>(
    user?.district_id ? user?.district_id : ""
  );
  const [idWard, setIdWard] = useState<string>(
    user?.ward_id ? user?.ward_id : ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const refsConscious = React.createRef<BottomSheet>();
  const refsDistrict = React.createRef<BottomSheet>();
  const refsWards = React.createRef<BottomSheet>();

  const { control, handleSubmit, errors } = useForm<UpdateInformationVariables>(
    {
      resolver: yupResolver(UpdateInformationSchema),
    }
  );
  const [cachecategory, setCachecategory] = useState<any>({});
   
  useEffect(() => {
    getData();
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

  const onChangeFullName = (txt: string) => {
    setFullname(txt);
  };
  const onChangePhone = (txt: string) => {
    setPhone(txt);
  };
  const onChangeCMND = (txt: string) => {
    setCMND(txt);
  };
  const onChangeNumberHouse = (txt: string) => {
    setNumberHouse(txt);
  };
  const onSelectGender = (type: any) => {
    let genders = "";
    if (type === 0) {
      genders = "male";
      setSelectGender(type);
    } else {
      genders = "female";
      setSelectGender(type);
    }
    setGender(genders);
  };
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
      setIdWard(value?.id)
    } else {
      setWards("")
    }
  };
  const onUpdateProfile = async () => {
    await dispatch(
      updateProfileAction(
        fullname,
        gender,
        phone,
        cmnd,
        numberHouse,
        conscious,
        idConscious,
        district,
        idDistrict,
        wards,
        idWard
      )
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack
        rightPress={onUpdateProfile}
        isReady
        titleRight={"label:update"}
        title={"label:personal_information"}
      />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: "center", 
            }}
            behavior={Platform.OS !== "android" ? "padding" : "height"}
          >
            <View style={{ marginHorizontal: 12 }}>
              <View style={styles.viewLable}>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:fullname",
                  })}
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoFocus
                      autoCapitalize="none"
                      multiline={false}
                      onChangeText={(val: string) => {
                        onChangeFullName(val);
                        onChange(val);
                      }}
                      onBlur={onBlur}
                      value={fullname}
                      containerStyle={styles.input}
                      style={styles.textInput}
                    />
                  )}
                  name="name"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <View style={{ margin: 10 }}>
                  <AppText style={styles.txtGender}>
                    {intl.formatMessage({
                      id: "label:gender",
                    })}
                  </AppText>
                  <View style={{ flexDirection: "row" }}>
                    <RadioButton
                      title={"label:male"}
                      onPress={onSelectGender}
                      type={0}
                      stylesProps={
                        selectGender == 0 ? COLOR.light_blue : "gray"
                      }
                    />
                    <RadioButton
                      title={"label:female"}
                      onPress={onSelectGender}
                      type={1}
                      stylesProps={
                        selectGender == 1 ? COLOR.light_blue : "gray"
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.viewLable}>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:email",
                  })}
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      multiline={false}
                      onChangeText={(val: string) => onChange(val)}
                      onBlur={onBlur}
                      value={email}
                      disabled
                      containerStyle={styles.input}
                      style={[
                        styles.textInput,
                        { backgroundColor: COLOR.contentColor },
                      ]}
                    />
                  )}
                  name="email"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <View style={{ height: 10 }} />
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:phone",
                  })}
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      multiline={false}
                      onChangeText={(val: string) => {
                        onChangePhone(val);
                        onChange(val);
                      }}
                      onBlur={onBlur}
                      value={phone}
                      keyboardType="numeric"
                      maxLength={10}
                      containerStyle={styles.input}
                      style={styles.textInput}
                    />
                  )}
                  name="phonenumber"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
              <View style={styles.viewLable}>
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:cmnd",
                  })}
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      multiline={false}
                      onChangeText={(val: string) => {
                        onChangeCMND(val);
                        onChange(val);
                      }}
                      onBlur={onBlur}
                      value={cmnd}
                      keyboardType="numeric"
                      maxLength={20}
                      containerStyle={styles.input}
                      style={styles.textInput}
                    />
                  )}
                  name="cmnd"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
              <View style={styles.viewLable}>
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
                <AppText style={styles.txtLabel}>
                  {intl.formatMessage({
                    id: "label:number_house_street_town",
                  })}
                </AppText>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      multiline={false}
                      onChangeText={(val: string) => {
                        onChangeNumberHouse(val);
                        onChange(val);
                      }}
                      onBlur={onBlur}
                      value={numberHouse}
                      containerStyle={styles.input}
                      style={styles.textInput}
                    />
                  )}
                  name="numberHouse"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  viewLable: {
    backgroundColor: COLOR.white,
    marginTop: 12,
    borderRadius: 6,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.72,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginLeft: 8,
    marginTop: 5,
  },
  input: {
    width: "100%",
    height: 30,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
    marginBottom: 10,
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  txtGender: {
    marginLeft: -2,
    marginTop: 10,
  },
});

export default UpdateInformationScreen;

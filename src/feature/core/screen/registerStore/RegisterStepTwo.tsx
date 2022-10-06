import React, { memo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,SafeAreaView,Text,Linking
} from "react-native";
import { images } from "src/assets/images";

import { StackScreenProps } from "@react-navigation/stack";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import DropdownButton from "src/components/DropdownButton";
import HeaderBack from "src/components/HeaderBack";
import { push } from "src/navigator/RootNavigation";
import { COLOR } from "src/theme/color";
import { CoreStackParamList } from "../../router/core.navigator";
import { coreRoutes } from "../../router/CoreRouter";

const { width, height } = Dimensions.get("window");

interface GroupCategory {
  name: string;
  id: string;
}

const listCategory: GroupCategory[] = [
  {
    name: "Sức khoẻ làm đẹp",
    id: "Sức khoẻ làm đẹp",
  },
  {
    name: "Khách sạn nhà trọ",
    id: "Khách sạn nhà trọ",
  },
  {
    name: "Ẩm thực",
    id: "Ẩm thực",
  },
  {
    name: "Bán lẻ",
    id: "Bán lẻ",
  },
  {
    name: "Giải trí",
    id: "Giải trí",
  },
  {
    name: "Dịch vụ",
    id: "Dịch vụ",
  },
  {
    name: "Cơ sở sản xuất",
    id: "Cơ sở sản xuất",
  },
];

const listSubCategory: GroupCategory[] = [
  {
    name: "Karaoke",
    id: "Karaoke",
  },
  {
    name: "Bán hàng",
    id: "Bán hàng",
  },
  {
    name: "Cà phê",
    id: "Cà phê",
  },
  {
    name: "Trà sữa",
    id: "Trà sữa",
  },
  {
    name: "Spa – Thẩm mỹ viện",
    id: "Spa – Thẩm mỹ viện",
  },
  {
    name: "Bida",
    id: "Bida",
  },
  {
    name: "Cửa hàng Mỹ phẩm",
    id: "Cửa hàng Mỹ phẩm",
  },
  {
    name: "Thời trang – Phụ kiện",
    id: "Thời trang – Phụ kiện",
  },
  {
    name: "Hoa – Quà tặng",
    id: "Hoa – Quà tặng",
  },
  {
    name: "GAS",
    id: "GAS",
  },
  {
    name: "Gara sửa xe",
    id: "Gara sửa xe",
  },
  {
    name: "Khách sạn",
    id: "Khách sạn",
  },
  {
    name: "Khác",
    id: "Khác",
  } 
];

interface Props
  extends StackScreenProps<CoreStackParamList, coreRoutes.RegisterStepTwo> {}

const RegisterStepTwo = memo((props: Props) => {
  const { data } = props.route.params;
  // dataFrom
  const [loading, setLoading] = useState<boolean>(false);
  const [subCategory, setsubCategory] = useState("");
  const [subCategorySelected, setsubCategorySelected] = useState();
  const [group, setGroup] = useState(undefined);
  const [step, setStep] = useState(0);

  const handleSubmit = () => {
    if (step === 0) {
      return setStep(1);
    }
    data.append("group", group?.id);
    data.append("category_text", group?.name);
    data.append("subcategory", subCategorySelected?.id || subCategory);
    data.append("subcategory_text", subCategorySelected?.name || subCategory);

    push(coreRoutes.RegisterStepThree, {
      data: data,
    });
  };

  const renderItem = ({ item, index }: { item: Category; index: number }) => {
    
    return (
      <TouchableOpacity
        onPress={() => {
          setGroup(item);
          setStep(1);
        }}
        key={index}
        style={{
          paddingHorizontal: 5,
          width: "50%",
        }}
      >
        <View
          style={{
            height: 80,
            borderWidth: 1,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
            borderColor: COLOR.borderGray,
            backgroundColor:
              group?.id === item.id ? COLOR.bgBlue_white : COLOR.main_color,
          }}
        >
          <AppText color={COLOR.white} style={styles.txtName}>
            {item.name}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const getdata = () => {
    if (!subCategory) {
      return listSubCategory;
    } else {
      return listSubCategory.filter((item) =>
        `${item.name}`.includes(subCategory)
      );
    }
  };

  const renderChooseCategory = () => {
    return (
      <View>
        <AppText style={styles.txtGroupLabel}>
          {`Nhóm ngành: `}
          <AppText style={styles.txtGroup}>{group?.name}</AppText>
        </AppText>
        <DropdownButton
          keyView="name"
          idProps={subCategorySelected?.id}
          placeholder={"Nhập ngành nghề"}
          autoBack={true}
          title={
            subCategorySelected?.name ||
            subCategory ||
            "-- Chọn nhành kinh doanh --"
          }
          data={getdata()}
          stylesProps={{
            margin: 10,
            backgroundColor: COLOR.bgWhite,
            borderRadius: 5,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: COLOR.borderGray,
          }}
          enableSearch={true}
          onChange={(item) => setsubCategorySelected(item)}
          onSearch={(val) => {
            setsubCategorySelected(undefined);
            setsubCategory(val);
          }}
        />

        <View style={{
                backgroundColor: COLOR.white,
                
                minHeight: 70,
                margin: 10,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}>
              
                  <View style={{borderRadius:8,borderWidth:1,borderColor:"#cecece",paddingVertical:8,paddingHorizontal:16}}> 
                  <Text>Thiết bị đề nghị:</Text>
                  <Text> Đường truyền internet và có 1 trong 3 thiết bị sau:</Text>
                  <Text> Laptop.</Text>
                  <Text> Máy tính để bàn.</Text>
                  <Text> Máy tính bảng.</Text>
                  </View>

                  <View style={{marginTop:16}}>
                     <TouchableOpacity onPress={()=>{
                        Linking.openURL("https://linkpos.giaiphap.xyz/huong-dan.php")
                     }}>
                       <Text style={{color:"blue"}}>Tìm hiểu thêm</Text>
                     </TouchableOpacity>
                  </View>
              </View>
      </View>
    );
  };

  const renderChooseGroup = () => {
    return 
      (<FlatList
        data={listCategory}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
      />) 
    
  };

  const onBack = () => {
    setStep(0);


  };

  return (
    <View style={styles.container}>
      <HeaderBack title={`Đăng ký cửa hàng`} />
      <ImageBackground source={images.background} style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLOR.bgWhite,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <View style={{flex:1}}>
              <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <Image
                  style={styles.tinyLogo}
                  resizeMode="contain"
                  source={images.infoShop}
                />
              </View>

              
             
                {step ==1 ? renderChooseCategory() : <FlatList
                data={listCategory}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, index) => `${index}`}
                numColumns={2}
              /> }
              
            </View>
            <View style={{ alignItems: "center",flexDirection:'row',justifyContent:'space-around'}}>
              {step === 1 && (
                <Button
                  buttonStyle={styles.buttonBack}
                  loading={loading}
                  onPress={onBack}
                  text={"Quay lại"}
                  loadingColor={COLOR.white}
                  textStyle={styles.txtLogin}
                />
              )}

              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={handleSubmit}
                text={"Tiếp tục"}
                loadingColor={COLOR.white}
                textStyle={styles.txtLogin}
              />
            </View>
          </View>
        </View>
        <SafeAreaView />
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  btnRegister: {},
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white,
    textAlign: "center",
  },
  txtGroupLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.main_color,
    textAlign: "center",
  },
  txtGroup: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.main_color,
    textAlign: "center",
  },
  btnSkip: {
    borderWidth: 1,
    borderColor: COLOR.blue,
    padding: 4,
    marginTop: 20,
    borderRadius: 12,
  },
  viewRegister: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
  },
  btnForgot: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  textForgot: {
    fontSize: 13,
  },
  textRegister: {
    fontSize: 13,
    fontWeight: "500",
    width: 200,
    textAlign: "center",
  },
  textSkip: {
    fontSize: 13,
    fontWeight: "500",
  },
  textError: {
    position: "absolute",
    color: COLOR.error,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "right",
    bottom: -25,
    right: 0,
  },
  buttonLogin: {
    marginTop: 20,
    width: '45%',
  },
  buttonBack: {
    marginTop: 20,
    width: '45%',
    backgroundColor: COLOR.bgSilver_Gray,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    marginBottom: 6,
    fontWeight: "600",
  },
  viewInput: {
    // borderWidth: 1,
  },
  input: {
    width: width - 60,
    height: 46,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  txtLogo: {
    textAlign: "center",
    fontWeight: "500",
  },
  txtName: {
    textAlign: "center",
    lineHeight: 30,
    fontSize: 20,
    borderColor: COLOR.borderGray,
  },
  viewLogo: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  coverTop: {
    width,
    height: 130,
    backgroundColor: "#0aa99a",
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    zIndex: 1,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
});

export default RegisterStepTwo;

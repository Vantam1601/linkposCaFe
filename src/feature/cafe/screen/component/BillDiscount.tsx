import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Input from "src/components/AppInputElement";
import { COLOR } from "src/theme/color";
import { AppText } from "src/components/Apptext";
const { width, height } = Dimensions.get("window");
interface Props {
  value: number;
  onSetValue?: () => void;
  total: Number;
}

interface ItemDiscount {
  id: number;
  value: number;
  name: string;
}
const listDiscount: ItemDiscount[] = [
  
  {
    id: 0,
    value: 0,
    name: "0",
  },{
    id: 1,
    value: 5,
    name: "5%",
  },
  {
    id: 1,
    value: 10,
    name: "10%",
  },
  {
    id: 1,
    value: 15,
    name: "15%",
  },
  {
    id: 1,
    value: 20,
    name: "20%",
  },
  {
    id: 1,
    value: 25,
    name: "25%",
  },
  {
    id: 1,
    value: 30,
    name: "30%",
  },
];

const BillDiscount = (props: Props) => {
  const renderDisCount = (item: ItemDiscount) => {
    return (
      <TouchableOpacity
        onPress={() => props.onSetValue(`${(props.total * item.value) / 100}`)}
        style={{
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          marginHorizontal: 10,
          height: 30,
          minWidth: 50,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText>{item.name}</AppText>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{ padding: 10, backgroundColor: COLOR.bgWhite, marginTop: 10 }}
    >
      <View>
        <ScrollView horizontal style={{ paddingVertical: 10 }}>
          {listDiscount.map(renderDisCount)}
        </ScrollView>
        <AppText style={styles.label} fontWeight="bold">
          {"Giảm giá :"}
        </AppText>
        <Input
          autoCapitalize="none"
          placeholder={"Nhập số tiền cần giảm"}
          multiline={false}
          onChangeText={(val: any) => props.onSetValue(val)}
          value={props.value}
          containerStyle={[
            styles.input,
            // { marginBottom: errors.phonenumber ? 30 : 16 },
          ]}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

export default BillDiscount;

const styles = StyleSheet.create({
  label: {
    paddingVertical: 10,
  },
  viewInput: {
    marginTop: 30,
  },
  input: {
    height: 46,
    backgroundColor: COLOR.borderGray,
    textAlignVertical: "center",
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  textInput: {},
});

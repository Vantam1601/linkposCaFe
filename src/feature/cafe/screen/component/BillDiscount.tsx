import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "src/components/AppInputElement";
import { COLOR } from "src/theme/color";
import { AppText } from "src/components/Apptext";
const { width, height } = Dimensions.get("window");
interface Props {
  value: number;
  onSetValue?: () => void;
}
const BillDiscount = (props: Props) => {
  return (
    <View
      style={{ padding: 10, backgroundColor: COLOR.bgWhite, marginTop: 10 }}
    >
      <View>
        <AppText style={styles.label} fontWeight="bold">
          {"Giảm giá :"}
        </AppText>
        <Input
          autoCapitalize="none"
          placeholder={"Nhap mã code"}
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

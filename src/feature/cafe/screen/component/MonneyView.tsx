import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import { COLOR } from "src/theme/color";
const { width, height } = Dimensions.get("window");
interface Props {
  value: number;
  onSetValue?: (val: any) => void;
  total: number;
}
const MonneyView = (props: Props) => {
  const { value, total } = props;
  const monney = Number(value) - Number(total);
  return (
    <View style={{ padding: 10, backgroundColor: COLOR.bgWhite }}>
      <View>
        <AppText style={styles.label} fontWeight="bold">
          {"Khách hàng đưa"}
        </AppText>
        <Input
          autoCapitalize="none"
          // autoCompleteType="monney"
          placeholder={"0"}
          multiline={false}
          onChangeText={(val: any) => props.onSetValue(val)}
          value={props.value}
          containerStyle={[styles.input]}
          style={styles.textInput}
        />
      </View>
      <View>
        <AppText style={styles.label} fontWeight="bold">
          {"Tiền thừa: "}
        </AppText>
        <Input
          autoCapitalize="none"
          // autoCompleteType="monney_"
          placeholder={"0"}
          multiline={false}
          onChangeText={(val: any) => props.onSetValue(val)}
          value={`${monney > 0 ? monney : "0"}`}
          containerStyle={[styles.input]}
          style={styles.textInput}
          enable={false}
        />
      </View>
    </View>
  );
};

export default MonneyView;

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

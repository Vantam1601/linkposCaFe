import React from "react";
import { StyleSheet, View } from "react-native";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { COLOR } from "src/theme/color";
interface Props {
  value: number;
  onSetValue?: () => void;
  user?: Record<string, any>;
  onSubmit?: () => void;
  isView: boolean;
}
const BillCustomer = (props: Props) => {
  const show_customer = () => {
    return (
      <View>
        <AppText style={styles.label}>
          {"Khách hàng : "}{" "}
          <AppText style={styles.label} fontWeight="bold">
            {props.user?.fullname}
          </AppText>{" "}
          {" - "}
          <AppText style={styles.label} fontWeight="bold">
            {props.user?.phone}
          </AppText>
        </AppText>
      </View>
    );
  };

  const show_new_customer = () => {
    return (
      <View>
        <Input
          // autoCapitalize={""}
          placeholder={"Nhập tên khách hàng mới"}
          onChangeText={(val: any) => props.onSetFullname(val)}
          containerStyle={[styles.input]}
          style={[styles.textInput]}
        />
      </View>
    );
  };
  return (
    <View
      style={{ padding: 10, backgroundColor: COLOR.bgWhite, marginTop: 10 }}
    >
      <View>
        <AppText style={styles.label} fontWeight="bold">
          {"Khách hàng"}
        </AppText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Input
              keyboardType={"phone-pad"}
              // autoCompleteType="username"
              placeholder={"Nhập số điện thoại"}
              onChangeText={(val: any) => props.onSetValue(val)}
              value={props.value}
              containerStyle={[styles.input]}
              style={[styles.textInput, {}]}
            />
          </View>
          <Button
            type={"success"}
            onPress={props.onSubmit}
            buttonStyle={{}}
            textStyle={{ color: COLOR.textWhite, paddingHorizontal: 16 }}
            text={"Tìm"}
          />
        </View>
        {props.isView
          ? props.user !== undefined
            ? show_customer()
            : show_new_customer()
          : null}
      </View>
    </View>
  );
};

export default BillCustomer;

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

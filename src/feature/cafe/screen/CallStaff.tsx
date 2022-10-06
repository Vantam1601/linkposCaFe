import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import DropdownButton from "src/components/DropdownButton";
import HeaderBack from "src/components/HeaderBack";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CALL_STAFF, GET_STAFF, MERGE_TABLE_ORDER } from "../store/constants";
import Input from "src/components/AppInputElement";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";

interface Props {}

const CallStaff = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [listSelect, setListSelect] = useState<any>([]);
  const loading = useRef<RefObject>(null);
  const [note, setNote] = useState("");

  const dataStaffs = useSelector<RootStateReducer>(
    (state) => state.cafe.staffs
  );
  const [selected, setSelected] = useState();

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    loading.current?.toggleState(true);
    dispatch({
      type: GET_STAFF,
      callback: () => loading.current?.toggleState(false),
    });
  };

  const onSubmit = () => {
    //
    loading.current?.toggleState(true);
    const body = {
      content: `Quầy thu ngân gọi nhân viên ${selected.id_user}`,
      note: note,
    };
    dispatch({
      type: CALL_STAFF,
      payload: body,
      callback: () => loading.current?.toggleState(false),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBack title={`Gọi nhân viên`} />
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <AppText fontWeight="bold" style={styles.txtLabel}>
            {"Nhân viên"}
          </AppText>
        </View>
        <DropdownButton
          keyView="fullname"
          idProps={selected?.id}
          title={selected?.fullname || "-- Chọn nhân viên --"}
          data={dataStaffs || []}
          stylesProps={{
            margin: 10,
            backgroundColor: COLOR.bgWhite,
            borderRadius: 5,
            paddingVertical: 10,
          }}
          onChange={(item) => setSelected(item)}
        />
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <AppText fontWeight="bold" style={styles.txtLabel}>
            {"Ghi chú"}
          </AppText>
          <Input
            autoCapitalize="none"
            placeholder={"Ghi chú..."}
            errorStyle={styles.textError}
            multiline={true}
            onChangeText={(val: any) => setNote(val)}
            value={note}
            containerStyle={[styles.input]}
            style={styles.textInput}
            autoBorder={true}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Button
          onPress={onSubmit}
          textStyle={{ color: COLOR.textWhite }}
          text={"Submit"}
        />
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default CallStaff;

const styles = StyleSheet.create({
  txtLabel: {},
  btnRegister: {},
  txtLogin: { fontWeight: "bold", fontSize: 14, color: COLOR.white },
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
    minHeight: 100,
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
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    marginBottom: 6,
    fontWeight: "600",
  },
  viewInput: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
  },
  txtLogo: {
    fontSize: 26,
    marginTop: 30,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "500",
  },
  viewLogo: {
    alignSelf: "center",
    alignItems: "center",
  },
  coverTop: {},
  container: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
});

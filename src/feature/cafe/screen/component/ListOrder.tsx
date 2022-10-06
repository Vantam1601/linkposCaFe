import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { produce } from "immer";
import moment from "moment";
import React, { useRef, useState,memo} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import HeaderBackCustom from "src/components/HeaderBackCustom";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { SUBMIT_ORDER } from "../store/constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { show_money } from "src/helpers/config";
import normalize from "src/helpers/normalize";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import ListProduct from "./component/ProductOrder";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
interface PropsListOrder {
  data: any[];
  onPressAdd: (item: any) => void;
  onPressDelete: (item: any) => void;
  onChangeNote: (item: any, val: string) => void;
  onSubmit: () => void;
}
const ListOrder = memo((props: PropsListOrder) => {
  const { data, onChangeNote, onPressDelete, onPressAdd, onSubmit } = props;

  const renderProductItem = ({ item, index }) => {
    const data = item.item;
    return (
      <TouchableOpacity
        key={index}
        style={{
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 6,
              }}
              resizeMode="cover"
              source={{
                uri: data.image,
              }}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <AppText fontWeight="bold" fontSize={20}>
              {data.title}
            </AppText>
            <AppText fontWeight="bold" color={COLOR.main_color} fontSize={20}>
              {show_money(data.price)}
            </AppText>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => onPressDelete(data)}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{ flex: 1, height: 40 }}
                text={"-"}
              />
              <Button
                onPress={() => {}}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{
                  flex: 1,
                  backgroundColor: COLOR.bgRedFresh,
                  height: 40,
                }}
                text={item.number}
              />
              <Button
                onPress={() => onPressAdd(data)}
                textStyle={{ color: COLOR.textWhite }}
                buttonStyle={{ flex: 1, height: 40 }}
                text={"+"}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Input
            autoCapitalize="none"
            placeholder={"Ghi chú..."}
            errorStyle={styles.textError}
            multiline={false}
            onChangeText={(val: any) => onChangeNote(data, val)}
            value={item.note}
            containerStyle={[styles.input]}
            style={styles.textInput}
            autoBorder={true}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingBottom: 20, paddingTop: 10 }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
        <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
          <FontAwesome
            name={"remove"}
            size={30}
            color={COLOR.main_color}
            style={{ color: COLOR.main_color, marginRight: normalize(6) }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 50,
            flex: 1,
          }}
        >
          <AppText
            fontSize={20}
            fontWeight="bold"
            style={{ textAlign: "center" }}
          >
            {"Danh sách"}
          </AppText>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ?? []}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${index}`}
      />
      <View
        style={{
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          buttonStyle={{ width: "45%" }}
          onPress={() => {
            onSubmit(true);
          }}
          textStyle={{ color: COLOR.textWhite }}
          text={"Xác nhận & In bill"}
        />

        <Button
          buttonStyle={{ width: "45%" }}
          onPress={() => {
            onSubmit();
          }}
          textStyle={{ color: COLOR.textWhite }}
          text={"Xác nhận"}
        />
      </View>
    </View>
  );
});

export default ListOrder;
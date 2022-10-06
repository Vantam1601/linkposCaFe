import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { produce } from "immer";
import moment from "moment";
import React, { useRef, useState,memo } from "react";
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

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Order> {}

interface PropsList {
  onPressItem: () => void;
}


const ListProduct = memo((props: PropsList) => {
  const data = useSelector<RootStateReducer>(
    (state) => state.cafe.tableAndMenu.products
  );

  const renderProductItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => props.onPressItem(item)}
        style={{
          flex: 1,
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          margin: 10,
          padding: 5,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
          source={{
            uri: item.image,
          }}
        />
        <AppText fontWeight="bold" fontSize={20}>
          {item.title}
        </AppText>
        <AppText fontWeight="bold" color={COLOR.main_color} fontSize={20}>
          {show_money(item.price)}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={data ?? []}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
});

export default  ListProduct;
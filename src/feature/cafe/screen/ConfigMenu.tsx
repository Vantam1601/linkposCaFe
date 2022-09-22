import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { format_money } from "src/helpers/config";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import ToggleSwitch from "toggle-switch-react-native";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";
import { ALLOW_SALE, GET_MENU } from "../store/constants";

interface ItemMenuProps {
  name: string;
  screen: string;
  icon: string;
}

const ItemMenu = (props: ItemMenuProps) => {
  return (
    <View key={props.name} style={{ width: "33.3%", height: 100, padding: 10 }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.bgWhite,
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: COLOR.txtGreen,
          }}
          resizeMode="contain"
          source={props.icon}
        />
        <AppText fontSize={15} fontWeight="bold">
          {props.name}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.ConfigMenu> {}
const ConfigMenu = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const loading = useRef<RefObject>(null);

  const data =
    useSelector<RootStateReducer>((state) => state.cafe.outlet.menu) || [];

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({
      type: GET_MENU,
      callback: setRefreshing(false),
    });
  };

  const onConfirmItem = (item) => {
    loading.current?.toggleState(true);
    dispatch({
      type: ALLOW_SALE,
      payload: {
        id_menu: item.id,
        action: item.allow_sale === 1 ? false : true,
      },
      callback: () => loading.current?.toggleState(false),
    });
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: COLOR.borderGray,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 10,
          }}
          resizeMode="cover"
          source={{
            uri: item.image,
          }}
        />
        <View style={[styles.itemColumn]}>
          <AppText color={COLOR.txtGreen} fontWeight="bold">
            {item.title}
          </AppText>
          <AppText fontWeight="bold">Cost: {format_money(item.price)}</AppText>
        </View>
        <View
          style={[
            {
              paddingHorizontal: 10,
            },
          ]}
        >
          {item && item?.confirmed === 1 ? (
            <AppText>{"Xác nhận"}</AppText>
          ) : (
            <ToggleSwitch
              isOn={item && item?.allow_sale === 1}
              onColor={COLOR.main_color}
              offColor={COLOR.gray}
              size="medium"
              onToggle={() => onConfirmItem(item)}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`ConfigMenu`} />

      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLOR.borderGray,
            backgroundColor: COLOR.white,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <FlatList
            data={data || []}
            renderItem={renderProduct}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
          />
        </View>
      </View>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default ConfigMenu;

const styles = StyleSheet.create({
  itemColumn: {
    minHeight: 50,
    flex: 1,
  },
  itemRow: {
    minWidth: 50,
    alignItems: "center",
  },
  itemRow2: {
    minWidth: 100,
    alignItems: "center",
  },
});

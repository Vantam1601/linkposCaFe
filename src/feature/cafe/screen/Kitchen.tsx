import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { cafeRoutes } from "../router/CafeRouter";
import { LOAD_CART_KITCHEN } from "../store/constants";
interface Props {}

const ItemTable = ({ item, index }) => {
  const onPress = () => {
    push(cafeRoutes.DetailConfirm, {
      id: item.id,
    });
  };

  return (
    <View
      style={{
        minHeight: 100,
        paddingHorizontal: 5,
        borderWidth: 0.5,
        padding: 10,
        borderColor: COLOR.borderGray,
      }}
    >
      {item.status === "doing_kitchen" && (
        <View
          style={{
            backgroundColor: COLOR.bgGreen,
            paddingVertical: 5,
            borderRadius: 5,
            borderColor: COLOR.white,
            paddingHorizontal: 10,
            width: 100,
          }}
        >
          <AppText fontWeight="bold" color={COLOR.white}>
            {"Đang làm"}
          </AppText>
        </View>
      )}
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={{
          backgroundColor: COLOR.bgWhite,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.bgBlue_white,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLOR.white,
          }}
        >
          <AppText fontWeight="bold" color={COLOR.white}>
            {item.name}
          </AppText>
        </View>
        <AppText fontWeight="bold" color={COLOR.main_color}>
          {item.id}
        </AppText>
        <AppText fontSize={16} fontWeight="bold" color={COLOR.blue}>
          {item?.products.length} món
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const Kitchen = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const tables = useSelector<RootStateReducer>(
    (state) => state.cafe.cartKitchen
  );

  React.useEffect(() => {
    onRefresh();
  }, []);

  const renderItem = ({ item, index }) => {
    return <ItemTable key={item.id} item={item} index={index} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({
      type: LOAD_CART_KITCHEN,
      callback: setRefreshing(false),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBack title={`Kitchen`} />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 100,
              height: 70,
            }}
            resizeMode="contain"
            source={images.logo}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            // numColumns={3}
            data={tables ?? []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          />
        </View>
      </View>
    </View>
  );
};

export default Kitchen;

const styles = StyleSheet.create({});

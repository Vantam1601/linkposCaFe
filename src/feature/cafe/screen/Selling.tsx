import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { show_money } from "src/helpers/config";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { cafeRoutes } from "../router/CafeRouter";
import { LOAD_CART } from "../store/constants";
interface Props {}

const ItemTable = ({ item, index }) => {
  const dataOrder = useSelector<RootStateReducer>(
    (state) => state.cafe.cart?.[`tb_${item.id}`]
  );

  const onPress = () => {
    if (!!dataOrder) {
      push(cafeRoutes.Detail, {
        id: item.id,
      });
    } else {
      push(cafeRoutes.Order, {
        item: item,
      });
    }
  };

  return (
    <View style={{ width: "33.33%", minHeight: 100, paddingHorizontal: 5 }}>
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={{
          backgroundColor: dataOrder ? COLOR.bgBlue_white : COLOR.bgWhite,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.bgBlue,
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

        <Image
          style={{
            width: 70,
            height: 70,
          }}
          resizeMode="contain"
          source={images.chair}
        />
        <AppText fontSize={16} fontWeight="bold" color={COLOR.blue}>
          {show_money(dataOrder?.total)}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const Selling = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loading = useRef<RefObject>(null);
  const tables = useSelector<RootStateReducer>(
    (state) => state.cafe.tableAndMenu.tables
  );
  const listArea = React.useMemo(() => {
    return Object.keys(tables ?? {});
  }, [tables]);
  const [currentKey, setCurrentKey] = useState(listArea?.[0] ?? "");

  React.useEffect(() => {
    if (listArea.length > 0) {
      setCurrentKey(listArea[0]);
    } else {
      setCurrentKey("");
    }
  }, [listArea]);

  const renderItem = ({ item, index }) => {
    return <ItemTable key={item.id} item={item} />;
  };

  const renderArea = (item, index) => {
    const isActive = item === currentKey;
    return (
      <TouchableOpacity
        onPress={() => setCurrentKey(item)}
        key={index}
        style={{
          minWidth: 100,
          paddingVertical: 10,
          borderRadius: 10,
          marginRight: 10,
          paddingHorizontal: 10,
          backgroundColor: isActive ? COLOR.main_color : COLOR.bgWhite,
        }}
      >
        <AppText
          color={isActive ? COLOR.white : COLOR.black}
          fontWeight="bold"
          fontSize={16}
        >
          {item}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <View>
          <AppText fontWeight="bold">Khu vực</AppText>
          <ScrollView horizontal style={{ paddingVertical: 10 }}>
            {listArea?.map(renderArea)}
          </ScrollView>
        </View>
        <AppText fontWeight="bold">Danh sách bàn</AppText>
        <View style={{ height: 10 }} />
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    loading.current?.toggleState(true);
    dispatch({
      type: LOAD_CART,
      callback: () => {
        setRefreshing(false);
        loading.current?.toggleState(false);
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
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

          {currentKey && tables ? (
            <View style={{ flex: 1 }}>
              {renderHeader()}
              <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={currentKey ? tables[currentKey]?.child : []}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10 }}></View>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppText>loading data ...</AppText>
              <ActivityIndicator size={"large"} color={COLOR.main_color} />
            </View>
          )}
        </View>
      </ImageBackground>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default Selling;

const styles = StyleSheet.create({});

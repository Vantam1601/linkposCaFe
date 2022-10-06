import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { CHANGE_TABLE_ORDER, LOAD_CART } from "../store/constants";
interface Props {}

const ItemTable = ({ item, index, itemSelect, onPress }) => {
  const dataOrder = useSelector<RootStateReducer>(
    (state) => state.cafe.cart?.[`tb_${item.id}`]
  );

  return (
    <View style={{ width: "33.33%", minHeight: 100, paddingHorizontal: 5 }}>
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={{
          backgroundColor:
            itemSelect?.id === item.id ? COLOR.bgBlue_white : COLOR.bgWhite,
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

        <Image
          style={{
            width: 70,
            height: 70,
          }}
          resizeMode="contain"
          source={images.chair}
        />
        <AppText fontSize={16} fontWeight="bold" color={COLOR.blue}>
          {dataOrder?.total}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const ChangeTable = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const tables = useSelector<RootStateReducer>(
    (state) => state.cafe.tableAndMenu.tables
  );

  const [itemSelected, setItemSelected] = useState(undefined);

  const order = useSelector<RootStateReducer>((state) => state.cafe.cart);

  const listTableCanChange = React.useMemo(() => {
    let listTable = [];
    Object.values(tables).map((item) => {
      listTable = [...listTable, ...item.child];
    });
    //
    let data = listTable?.filter((item) => {
      return !order?.[`tb_${item.id}`];
    });
    return data;
  }, [order, tables]);

  const renderItem = ({ item, index }) => {
    return (
      <ItemTable
        key={item.id}
        item={item}
        itemSelect={itemSelected}
        onPress={() => setItemSelected(item)}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({
      type: LOAD_CART,
      callback: setRefreshing(false),
    });
  };

  const onSubmit = () => {
    dispatch({
      type: CHANGE_TABLE_ORDER,
      payload: {
        from: props.route.params.item.id,
        "table[id]": itemSelected.id,
        "table[name]": itemSelected.name,
      },
      callback: navigation.goBack(),
    });
  };
  // console.log("listTableCanChange", listTableCanChange);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            numColumns={3}
            data={listTableCanChange || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Button
            onPress={onSubmit}
            textStyle={{ color: COLOR.textWhite }}
            text={"Xác nhận"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeTable;

const styles = StyleSheet.create({});

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import DropdownButton from "src/components/DropdownButton";
import HeaderBack from "src/components/HeaderBack";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { LOAD_CART, MERGE_TABLE_ORDER } from "../store/constants";
interface Props {}

interface ItemTableProps {
  item: any;
  index: number;
  isActive: boolean;
  onPress: () => void;
}

const ItemTable = ({ item, index, isActive, onPress }: ItemTableProps) => {
  return (
    <View style={{ width: "33.33%", minHeight: 100, paddingHorizontal: 5 }}>
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={{
          backgroundColor: isActive ? COLOR.bgBlue_white : COLOR.bgWhite,
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
      </TouchableOpacity>
    </View>
  );
};

const MergeTable = (props: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const [listSelect, setListSelect] = useState<any>([]);

  const order = useSelector<RootStateReducer>((state) => state.cafe.cart.all);

  const orderTables = React.useMemo(() => {
    if (!order?.length) {
      return [];
    }
    return order?.filter((item) => !`${item.id}`.includes("takeaway"));
  }, [order]);

  const [tableTo, setTableTo] = useState(orderTables?.[0] || {});

  const checkActive = React.useCallback(
    (item) => {
      return listSelect.find((_item) => _item.id === item.id);
    },
    [listSelect]
  );

  const onSelect = (item) => {
    if (!!checkActive(item)) {
      setListSelect(listSelect.filter((_item: any) => _item.id !== item.id));
    } else {
      setListSelect([item, ...listSelect]);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <ItemTable
        key={item.id}
        item={item}
        isActive={!!checkActive(item)}
        onPress={() => onSelect(item)}
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
    let body = new FormData();
    body.append("to", tableTo.id);

    listSelect.map((item) => {
      body.append("from[]", item.id);
    });
    dispatch({
      type: MERGE_TABLE_ORDER,
      payload: body,
      callback: navigation.goBack(),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBack title={`Nhập bàn`} />

      <View style={{ flex: 1 }}>
        <AppText fontWeight="bold" style={styles.txtLabel}>
          {"Chọn bàn đích"}
        </AppText>
        <DropdownButton
          idProps={tableTo?.id}
          title={tableTo?.name || "-- Chọn bàn cần nhập --"}
          idProps={undefined}
          data={orderTables || []}
          stylesProps={{
            margin: 10,
            backgroundColor: COLOR.bgWhite,
            borderRadius: 5,
          }}
          onChange={(item) => setTableTo(item)}
        />
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={orderTables || []}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index}
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
  );
};

export default MergeTable;

const styles = StyleSheet.create({
  txtLabel: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

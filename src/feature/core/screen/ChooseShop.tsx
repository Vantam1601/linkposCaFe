import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { images } from "src/assets/images";
import HeaderBack from "src/components/HeaderBack";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { push } from "src/navigator/RootNavigation";
import { RootStateReducer } from "src/store/types";
import { COLOR } from "src/theme/color";
import { GET_MYSTORE,LOGOUT} from "../../auth/store/constants";
import ItemShop from "../component/ItemShop";
import LoadingOverlay, {
  RefObject,
} from "../component/loadingPage/LoadingPage";
import { CoreStackParamList } from "../router/core.navigator";
import { coreRoutes } from "../router/CoreRouter"; 

interface Props
  extends StackScreenProps<CoreStackParamList, coreRoutes.ChooseShop> {}

const ChooseShop = (props: Props) => {
  const user = useCurrentUser();
  const loading = useRef<RefObject>(null);
  const store = useSelector<RootStateReducer>((state) => state.auth.myStore);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   loading.current?.toggleState(true);
  //   dispatch({
  //     type: GET_MYSTORE,
  //     callback: () => loading.current?.toggleState(false),
  //   });
  // }, []);

  const createStore = () => {
    push(coreRoutes.RegisterStepOne);
  };

  const renderItem = ({ item, index }) => {
    return <ItemShop loading={loading} key={index} choose={props.route.params.key} item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBack
        title={"Danh sách cửa hàng"}
        titleRight={
          <TouchableOpacity onPress={createStore}>
            <Icon color={COLOR.white} name="md-add" size={30}></Icon>
          </TouchableOpacity>
        }
      />
      <ImageBackground
        source={images.background}
        style={{ flex: 1, paddingTop: getStatusBarHeight() }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ paddingHorizontal: 10 }}
              data={store ? store?.staff?.[props.route.params.key] : []}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
        <SafeAreaView />
      </ImageBackground>
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default ChooseShop;

const styles = StyleSheet.create({});

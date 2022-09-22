import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { AppText } from "src/components/Apptext";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { useTypedDispatch } from "src/hooks/useTypedDispatch";
import { getUserNotificaionAction, getUserNotificaionReportAction } from "src/old/stores/app/app.actions";
import { COLOR } from "src/theme/color";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "nvquang-font-icon/pro-solid-svg-icons";
const widthS = Dimensions.get("window").width;
const widthContent = widthS - 20;
type Props = {};
const NotificationScreen = React.memo<Props>(() => {
  const intl = useTranslate();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState();
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: any = await dispatch(getUserNotificaionAction());
    dispatch(getUserNotificaionReportAction());
    
    if (response && response.data) {
      setData(response.data);
    }
    setLoading(false);
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View
        style={{
          borderBottomColor: COLOR.borderWhiteGray,
          borderBottomWidth: 1,
          paddingBottom: 10,
          paddingLeft: 20,
          backgroundColor:item.read == 1 ? COLOR.white :  COLOR.borderWhiteGray,
          padding: 10
        }}
      >
        <AppText fontWeight={"bold"} fontSize={14}>
          {item.title.trim()}
        </AppText>
        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <FontAwesomeIcon color={COLOR.gray} icon={faClock} size={18} />
          <AppText style={{ marginLeft: 10 }}>
            {moment(item?.created_date).format("YYYY-MM-DD HH:mm:ss")}
          </AppText>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={intl.formatMessage({
            id: "label:notification",
          })}
        />
        {loading ? <ActivityIndicator /> : null}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id.toString()}
          showsHorizontalScrollIndicator={true}
        />
      </SafeAreaView>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  item: {
    width: widthContent / 4,
    height: widthContent / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NotificationScreen;

import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import BottomSheet from "src/components/BottomSheet";
import HeaderBack from "src/components/HeaderBack";
import { useTranslate } from "src/hooks/useTranslate";
import { getListWifiAction } from "src/old/stores/app/app.actions";
import { COLOR } from "src/theme/color";
// import MapboxGL from '@react-native-mapbox-gl/maps';

// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiYWhsdSIsImEiOiJja3B0ODM0aXEwMHUzMnZyM21tdnNzc2FvIn0.6dAfESP_bzUMu9t9j2dNSQ"
// );
const widthS = Dimensions.get("window").width;

type Props = {
  fetch?: any
};
const Map = React.memo<Props>(
  ({ fetch }) => {
  const intl = useTranslate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setSetData] = useState<any>([]);

  var getData = fetch();
  
  const CENTER_COORD = [159.068744, -31.549887];
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderBack title={"home:wifi"} />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        {/* <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Street}
        > */}
          {/* <MapboxGL.MarkerView coordinate={CENTER_COORD}>
            <View style={styles.marker} />
          </MapboxGL.MarkerView> */}
        {/* </MapboxGL.MapView> */}
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  map: {
    flex: 1,
  },
});

export default Map;

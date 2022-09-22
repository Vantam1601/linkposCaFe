import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { TypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate"; 
import { COLOR } from "src/theme/color";
import Button from "src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "src/navigator/app-routes";
import Geolocation from "@react-native-community/geolocation";
import { setLocation } from "src/old/stores/app/app.slice";
import { useTypedSelector } from "src/hooks/useTypedSelector"; 
import ViewAds from "src/components/ViewAds";

  
const AdsScreen = memo((navigationRoute: any) => {
 const intl = useTranslate();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { route } = navigationRoute;
  const params = route?.params?.value;
  const config: any = useTypedSelector((state) => state.app.appJson);

  useEffect(() => {
     if(!config||!config.ads.enabled){
       if(route?.params?.callback){
         route?.params?.callback();
       }
       
     }
  }, []);

  return (
    <View style={styles.wrap}>
      <ViewAds show={route?.params?.show}
        onDone={() => {
           if(route?.params?.callback){
             route?.params?.callback();
           }

            navigation.goBack();
        }}
      /> 
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  
});

export default AdsScreen;

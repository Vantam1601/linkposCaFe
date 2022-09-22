import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { AppText } from "src/components/Apptext";
import Button from "src/components/Button";
import FastImagePlaceholder from "src/components/FastImage";
import HeaderHome from "src/components/HeaderHome";
import { useTranslate } from "src/hooks/useTranslate";
import { AppRoutes } from "src/navigator/app-routes";
import { getDataAdressAction } from "src/old/stores/app/app.actions";
import { getData } from "src/old/stores/app/app.service";
import { HomeData, Slide, SlideIntro } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { string } from "yup/lib/locale";
import {post,site_ajax_url} from "src/helpers/config";
import i18next from 'i18next';
import {fetch_lang} from "src/helpers/constants";

const DEVICE_WIDTH = Dimensions.get("window").width;

const IntroAuthScreen = memo(() => {
  const [data, setData] = useState<any>([
   
  ]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const intl = useTranslate();
  const navigation = useNavigation();
  useEffect(() => {
    post(site_ajax_url("public.php?a=intro"),{},(res:any)=>{
        setData(res.slides); 
    });
  }, []);
  const onNavigater = (name: string) => {
    switch (name) {
      case "createAccount":
        navigation.navigate(AppRoutes.REGISTER)
        break;
      case "Login":
        navigation.navigate(AppRoutes.LOGIN)
        break;
      case "Skip":
        navigation.navigate(AppRoutes.APP);
        break;
      default:
        return;
    }
  }
  const pagination = () => {
    return (
      <View style={styles.viewDot}>
        <Pagination
          dotsLength={data?.length as number}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: COLOR.gray,
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: COLOR.borderWhiteGray,
          }}
          inactiveDotOpacity={0.6}
          inactiveDotScale={1}
        />
      </View>
    );
  };

  const _renderItem = (item: any, index: number) => {
    var l = i18next.language;
    return (
      <View style={{ justifyContent: "center", alignItems: "center", }}>
        <View style={styles.vTitleIntro}>
          <AppText
            style={styles.txtSilder}
          >
            {fetch_lang("title",item)}
          </AppText>
          <AppText
            style={styles.txtSilder}
          >
            {fetch_lang("subtext",item)}
          </AppText>
        </View>
        <FastImagePlaceholder
          source={item.image}
          resizeMode={"contain"}
          style={styles.img}
          needProgress
        />
      </View>
    );
  };
  return (
    <View style={styles.wrap}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <ScrollView style={[styles.container]}>
          <Carousel
            autoplay={true}
            loop={true}
            containerCustomStyle={{ height: 250 }}
            data={data}
            renderItem={({ item, index }) => _renderItem(item, index)}
            sliderWidth={DEVICE_WIDTH}
            itemWidth={DEVICE_WIDTH}
            onSnapToItem={(slideIndex) => setActiveSlide(slideIndex)}
          />
          {pagination()}
          <View style={styles.vButton}>
            <Button
              buttonStyle={styles.buttonCreate}
              // loading={loading}
              onPress={() => onNavigater('createAccount')}
              text={intl.formatMessage({
                id: "label:create_account",
              })}
              loadingColor={COLOR.white}
              textStyle={styles.txtLoginCreate}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              // loading={loading}
              onPress={() => onNavigater('Login')}
              text={intl.formatMessage({
                id: "label:login",
              })}
              loadingColor={COLOR.white}
              textStyle={styles.txtLogin}
            />
            <Button
              buttonStyle={styles.buttonSkip}
              // loading={loading}
              onPress={() => onNavigater('Skip')}
              text={intl.formatMessage({
                id: "label:skip",
              })}
              loadingColor={COLOR.white}
              textStyle={styles.txtLogin}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  viewDot: {
    position: "absolute",
    top: 205,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  wrap: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  vTitleIntro: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  img: {
    width: DEVICE_WIDTH - 25,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  txtSilder: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500'
  },
  vButton: {
    marginTop: 150,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCreate: {
    width: DEVICE_WIDTH - 30,
  },
  buttonLogin: {
    width: DEVICE_WIDTH - 30,
    marginTop: 10,
    backgroundColor: COLOR.bgWhite,
    borderWidth: 1,
    borderColor: COLOR.borderRed
  },
  buttonSkip: {
    width: DEVICE_WIDTH - 30,
    marginTop: 10,
    backgroundColor: COLOR.bgWhite,
    borderWidth: 1,
    borderColor: COLOR.borderBlue
  },
  txtLoginCreate: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.black
  },

});

export default IntroAuthScreen;

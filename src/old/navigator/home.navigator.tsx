import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { AppRoutes } from "./app-routes";

import HomeScreen from "src/old/screens/home.screen";
import InsertCodeScreen from "src/old/screens/insert.code.screen";

import type { RootStackParamList } from "./root.navigator";
import { AppTabParamList } from "./tab.navigator";

import NotificationScreen from "src/old/screens/notification/notification";

import GameScreen from "src/old/screens/game.screen";

import CheckInScreen from "src/old/screens/checkin.screen";
import RegulationScreen from "src/old/screens/regulation.screen";

import Printer from "src/old/screens/printer";
import AdsScreen from "src/old/screens/ads.screen";

import MapboxScreen from "src/old/screens/map/mapbox.screen";
import MyWebview from "src/old/screens/webview";

import ListCommnetScreen from "src/old/screens/comment/list.commnet.screen";
import ReportScreen from "src/old/screens/report.screen";

//IMPORTPLUGIN//
export type HomeStackParamList = {
  //DEFINEPLUGIN//

  [AppRoutes.RootChat]: undefined;
  [AppRoutes.SHOP_REPORT]: undefined;
  [AppRoutes.NEED_REPORT]: undefined;
  [AppRoutes.NEEDJOB]: undefined;
  [AppRoutes.NEED_EAT]: undefined;
  [AppRoutes.COMMENT]: undefined;
  [AppRoutes.REPORT]: undefined;
  [AppRoutes.HOME]: undefined;
  [AppRoutes.PRINTER]: undefined;
  [AppRoutes.ADS]: undefined;
  [AppRoutes.DETAIL_HOME]: undefined;
  [AppRoutes.DETAIL_HOME_SHOP]: undefined;
  [AppRoutes.INSERT_CODE]: undefined;
  [AppRoutes.SERVICE_CATEGORY_CHILD]: undefined;
  [AppRoutes.SHOP_CATEGORY_CHILD]: undefined;
  [AppRoutes.DETAIL_SERVICE_CATEGORY]: undefined;
  [AppRoutes.SEARCH]: undefined;
  [AppRoutes.SEARCHSHOP]: undefined;
  [AppRoutes.SEARCHNEED]: undefined;
  [AppRoutes.SERVICE_CATEGORY_VERTICAL]: undefined;
  [AppRoutes.NEED_OUTSITE_MARKET]: undefined;
  // --------------------------
  [AppRoutes.STORE_CATEGORY]: undefined;
  [AppRoutes.SERVICE_CATEGORY_HORIZONTAL]: undefined;
  [AppRoutes.NEED_SHORT_TERM]: undefined;
  [AppRoutes.LIST_NEW_EVENT]: undefined;
  [AppRoutes.LIST_NEW_EVENT_CHILD]: undefined;
  [AppRoutes.WEB_VIEW]: undefined;
  [AppRoutes.NOTIFICATION]: undefined;
  [AppRoutes.QRCODE]: undefined;
  [AppRoutes.LIST_EMERGENCY]: undefined;
  // --------------------------------
  [AppRoutes.CREATE_REQUEST]: undefined;
  [AppRoutes.DETAIL_PROMOTION]: undefined;
  [AppRoutes.CREATE_SHOP]: undefined;
  // ----------------------------------
  [AppRoutes.FEED_BACK]: undefined;
  [AppRoutes.GAME]: undefined;
  [AppRoutes.FAQ]: undefined;
  [AppRoutes.CONTACT]: undefined;
  [AppRoutes.DETAIL_WIFI]: undefined;
  [AppRoutes.SHOP_COUNTRY]: undefined;
  [AppRoutes.NEED_COUNTRY]: undefined;
  [AppRoutes.EMERGENCY_CHILD]: undefined;
  [AppRoutes.EMERGENCY_REPORT]: undefined;
  [AppRoutes.DETAIL_EMERGENCY]: undefined;
  [AppRoutes.FIND_DOCUMENT]: undefined;
  [AppRoutes.CHECK_IN]: undefined;
  [AppRoutes.REGULATION]: undefined;

  [AppRoutes.WIFI]: undefined;
  [AppRoutes.WIFI_MAP]: undefined;
  [AppRoutes.MAPBOXSIMPLE]: undefined;
  [AppRoutes.MYWEBVIEW]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, AppRoutes.HOME_TAB>,
    StackNavigationProp<HomeStackParamList>
  >
>;

export const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.HOME}>
      <Stack.Screen
        name={AppRoutes.HOME}
        options={{
          title: "hOME",
          headerShown: false,
        }}
        component={HomeScreen}
      />

      <Stack.Screen
        name={AppRoutes.ADS}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        component={AdsScreen}
      />

      <Stack.Screen
        name={AppRoutes.INSERT_CODE}
        options={{
          headerShown: false,
        }}
        component={InsertCodeScreen}
      />

      {/* <Stack.Screen
        name={AppRoutes.WEB_VIEW}
        options={{
          headerShown: false,
        }}
        component={WebViewScreen}
      /> */}

      <Stack.Screen
        name={AppRoutes.NOTIFICATION}
        options={{
          headerShown: false,
        }}
        component={NotificationScreen}
      />

      <Stack.Screen
        name={AppRoutes.GAME}
        options={{
          headerShown: false,
        }}
        component={GameScreen}
      />

      <Stack.Screen
        name={AppRoutes.CHECK_IN}
        options={{
          headerShown: false,
        }}
        component={CheckInScreen}
      />

      <Stack.Screen
        name={AppRoutes.MAPBOXSIMPLE}
        options={{
          headerShown: false,
        }}
        component={MapboxScreen}
      />

      <Stack.Screen
        name={AppRoutes.COMMENT}
        options={{
          headerShown: false,
        }}
        component={ListCommnetScreen}
      />

      <Stack.Screen
        name={AppRoutes.MYWEBVIEW}
        options={{
          headerShown: false,
        }}
        component={MyWebview}
      />
    </Stack.Navigator>
  );
};

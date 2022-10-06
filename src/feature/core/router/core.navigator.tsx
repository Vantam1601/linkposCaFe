import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { CafeNavigator } from "src/feature/cafe/router/CafeNavigator";

import MyShop from "src/feature/core/screen/MyShop";
import { AppRoutes } from "src/navigator/app-routes";

import type { RootStackParamList } from "../../../navigator/root.navigator";
import ChooseShop from "../screen/ChooseShop";
import Dashboard from "../screen/Dashboard";
import RegisterStepOne from "../screen/registerStore/RegisterStepOne";
import RegisterStepThree from "../screen/registerStore/RegisterStepThree";
import RegisterStepTwo from "../screen/registerStore/RegisterStepTwo";
import { coreRoutes } from "./CoreRouter";

import QRcode from "src/old/screens/qr/qr";
import Webview from "src/old/screens/webview/";

import FingerQrcode from "../../cafe/screen/FingerQrcode";
import MyBoardOpen from "../../cafe/screen/MyBoardOpen";

import SellFingerHistory from "../../cafe/screen/sell/FingerHistory";
import SellReport from "../../cafe/screen/sell/Report";
import SellInvToday from "../../cafe/screen/sell/InvToday";
import SellConfig from "../../cafe/screen/sell/Config";

import DetailOrder from "../../cafe/screen/DetailCashierOutlet";

import CashierFingerHistory from "../../cafe/screen/sell/FingerHistory";
import CashierConfig from "../../cafe/screen/sell/Config";


import Profile from "../screen/Profile";
import InfoProfile from "../screen/InfoProfile";
import UpdatePassword from "../../auth/screen/UpdatePassword";



import ComingSoon from "../screen/ComingSoon";


const pages = {
  QRcode: QRcode,
  Webview: Webview,
  SellFingerHistory: SellFingerHistory,
  FingerQrcode: FingerQrcode,
  MyBoardOpen: MyBoardOpen,
  SellConfig: SellConfig,
  SellReport: SellReport,
  SellInvToday: SellInvToday,

  CashierConfig: CashierConfig,
  CashierFingerHistory: CashierFingerHistory,
  DetailOrder: DetailOrder,

  UpdatePassword:UpdatePassword,

  ComingSoon:ComingSoon
};

export type CoreStackParamList = {
  [coreRoutes.MY_STORE]: undefined;
  [coreRoutes.DASH_BOARD]: undefined;
  [coreRoutes.RegisterStepOne]: undefined;
  [coreRoutes.RegisterStepTwo]: {
    data: FormData;
  };
  [coreRoutes.RegisterStepThree]: {
    data: FormData;
  };
  [coreRoutes.ChooseShop]: {
    key: string;
  };
  [coreRoutes.Profile]: undefined;
  [coreRoutes.InfoProfile]: undefined;
};

const Stack = createStackNavigator<CoreStackParamList>();

export type AuthStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  StackNavigationProp<CoreStackParamList>
>;

export const CoreNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={coreRoutes.MY_STORE}>
      <Stack.Screen
        name={coreRoutes.MY_STORE}
        options={{
          title: "My Shop",
          headerShown: false,
        }}
        component={MyShop}
      />
      <Stack.Screen
        name={coreRoutes.DASH_BOARD}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={Dashboard}
      />
      <Stack.Screen
        name={coreRoutes.CAFE}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={CafeNavigator}
      />
      <Stack.Screen
        name={coreRoutes.ChooseShop}
        options={{
          title: "Choose shop",
          headerShown: false,
        }}
        component={ChooseShop}
      />
      <Stack.Screen
        name={coreRoutes.RegisterStepOne}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={RegisterStepOne}
      />
      <Stack.Screen
        name={coreRoutes.RegisterStepTwo}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={RegisterStepTwo}
      />
      <Stack.Screen
        name={coreRoutes.RegisterStepThree}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={RegisterStepThree}
      />
      {Object.entries({
        ...pages,
      }).map(([name, component]) => (
        <Stack.Screen
          name={name}
          options={{
            headerShown: false,
            title: name,
          }}
          key={name}
          component={component}
        />
      ))}
      <Stack.Screen
        name={coreRoutes.Profile}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name={coreRoutes.InfoProfile}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={InfoProfile}
      />
    </Stack.Navigator>
  );
};

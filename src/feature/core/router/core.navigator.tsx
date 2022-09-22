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
import Dashboard from "../screen/Dashboard";
import RegisterStepOne from "../screen/registerStore/RegisterStepOne";
import { coreRoutes } from "./CoreRouter";

export type CoreStackParamList = {
  [coreRoutes.MY_STORE]: undefined;
  [coreRoutes.DASH_BOARD]: undefined;
  [coreRoutes.RegisterStepOne]: undefined;
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
        name={coreRoutes.RegisterStepOne}
        options={{
          title: "CAFE Shop",
          headerShown: false,
        }}
        component={RegisterStepOne}
      />
    </Stack.Navigator>
  );
};

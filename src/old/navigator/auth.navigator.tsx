import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import LoginScreen from "src/feature/auth/screen/login";
// import RegisterEmailScreen from 'src/screens/user/register.email.screen';

import { AppRoutes } from "./app-routes";
import type { RootStackParamList } from "./root.navigator";

export type AuthStackParamList = {
  [AppRoutes.LOGIN]: undefined;
  [AppRoutes.REGISTER]: undefined;
  [AppRoutes.REGISTEROTP]: undefined;
  [AppRoutes.REGISTEREMAIL]: undefined;
  [AppRoutes.FORGOT_PASSWORD]: undefined;
  [AppRoutes.FORGOT_PASSWORD_OTP]: undefined;
  [AppRoutes.FORGOT_PASSWORD_OTP_NEW]: undefined;
  [AppRoutes.INTRO_AUTH]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.AUTH>,
  StackNavigationProp<AuthStackParamList>
>;

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.INTRO_AUTH}>
      <Stack.Screen
        name={AppRoutes.LOGIN}
        options={{
          title: "Login",
          headerShown: false,
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

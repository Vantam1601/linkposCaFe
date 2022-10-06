import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";

import LoginScreen from "src/feature/auth/screen/login";
import { AppRoutes } from "src/navigator/app-routes";
// import RegisterEmailScreen from 'src/screens/user/register.email.screen';

import type { RootStackParamList } from "../../../navigator/root.navigator";
import VerifyPassScreen from "../screen/verify_pass";
import UpdatePassword from "../screen/UpdatePassword";
import { authRoutes } from "./AuthRouter";



export type AuthStackParamList = {
  [authRoutes.LOGIN]: undefined;
  [authRoutes.REGISTER]: undefined;
  [authRoutes.FORGOT_PASSWORD]: undefined;
  [authRoutes.FORGOT_PASSWORD_OTP]: undefined;
  [authRoutes.FORGOT_PASSWORD_OTP_NEW]: undefined;
  [authRoutes.UPDATE_PASSWORD]: undefined;
  [authRoutes.VERIFY_PASSS]: {
    username: string;
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.AUTH>,
  StackNavigationProp<AuthStackParamList>
>;

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={authRoutes.LOGIN}>
      <Stack.Screen
        name={authRoutes.LOGIN}
        options={{
          title: "Login",
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name={authRoutes.VERIFY_PASSS}
        options={{
          title: "Verify Pass",
          headerShown: false,
        }}
        component={VerifyPassScreen}
      />

      
    </Stack.Navigator>
  );
};

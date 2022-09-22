import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import CreateScreen from 'src/old/screens/create.screen';
import IntroCreateShopScreen from 'src/old/screens/intro.screate.shop.screens';
import { AppRoutes } from './app-routes';
import type { RootStackParamList } from './root.navigator';
import { AppTabParamList } from './tab.navigator';

export type CreateStackParamList = {
  [AppRoutes.CREATE]: undefined;
  [AppRoutes.CREATE_REQUEST]: undefined;
  [AppRoutes.CREATE_EMERHENCY]: undefined;
  [AppRoutes.CREATE_SHOP]: undefined;
  [AppRoutes.INTRO_CREATE_SHOP]: undefined;
};

const Stack = createStackNavigator<CreateStackParamList>();


export type DiscountStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, AppRoutes.CREATE_TAB>,
    StackNavigationProp<CreateStackParamList>
  >
>;

export const CreateNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.CREATE}>
      <Stack.Screen
        name={AppRoutes.CREATE}
        options={{
          headerShown: false,
        }}
        component={CreateScreen}
      />
      <Stack.Screen
        name={AppRoutes.CREATE_REQUEST}
        options={{
          headerShown: false,
        }}
        component={CreateRequestScreen}
      />
      <Stack.Screen
        name={AppRoutes.CREATE_EMERHENCY}
        options={{
          headerShown: false,
        }}
        component={CreateEmergencyScreen}
      />
      <Stack.Screen
        name={AppRoutes.CREATE_SHOP}
        options={{
          headerShown: false,
        }}
        component={CreateShopScreen}
      />
      <Stack.Screen
        name={AppRoutes.INTRO_CREATE_SHOP}
        options={{
          headerShown: false,
        }}
        component={IntroCreateShopScreen}
      />
    </Stack.Navigator>
  );
};

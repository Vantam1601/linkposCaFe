import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoutes } from './app-routes';
import type { RootStackParamList } from './root.navigator';
import { AppTabParamList } from './tab.navigator';

export type DiscountStackParamList = {
  [AppRoutes.DISCOUNT]: undefined;
  [AppRoutes.DETAIL_PROMOTION]: undefined;
  [AppRoutes.CONTACT]: undefined;
  [AppRoutes.FAQ]: undefined;
  [AppRoutes.DISCOUNT_PROVINCE_DISTRICT]: undefined;
  [AppRoutes.DISCOUNT_COUNTRY]: undefined;
};

const Stack = createStackNavigator<DiscountStackParamList>();


export type DiscountStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, AppRoutes.DISCOUNT_TAB>,
    StackNavigationProp<DiscountStackParamList>
  >
>;

export const DiscountNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.DISCOUNT}>
       
    </Stack.Navigator>
  );
};

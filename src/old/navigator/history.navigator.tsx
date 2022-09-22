import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import HistoryScreen from 'src/old/screens/history.screen';
import HistoryNeedScreen from 'src/old/screens/history.need.screen';
import HistoryWorkScreen from 'src/old/screens/history.work.screen';
import HistoryShopScreen from 'src/old/screens/history.shop.screen'; 
import { AppRoutes } from './app-routes';
import type { RootStackParamList } from './root.navigator';
import { AppTabParamList } from './tab.navigator';
 
export type HistoryStackParamList = {
  [AppRoutes.HISTORY]: undefined;
  [AppRoutes.HISTORY_NEED]: undefined;
  [AppRoutes.HISTORY_WORK]: undefined;
  [AppRoutes.CREATE_REQUEST]: undefined;
  [AppRoutes.UPDATE_POST]: undefined;
  [AppRoutes.HISTORY_SHOP]: undefined;
  [AppRoutes.UPDATE_HISTORY_SHOP]: undefined;
  [AppRoutes.DETAIL_HOME]: undefined;
  [AppRoutes.DETAIL_HOME_SHOP]: undefined;
};

const Stack = createStackNavigator<HistoryStackParamList>();


export type DiscountStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, AppRoutes.HISTORY_TAB>,
    StackNavigationProp<HistoryStackParamList>
  >
>;

export const HistoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.HISTORY}>
 

 
    </Stack.Navigator>
  );
};

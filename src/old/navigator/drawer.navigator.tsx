import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AppRoutes } from "./app-routes";
import { AppNavigator } from "./tab.navigator";
import { CustomDrawerContent } from "./Drawer"

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Stack" component={AppNavigator} />
    </Drawer.Navigator>
  );
}
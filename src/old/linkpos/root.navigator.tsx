import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { AppRoutes } from "../../navigator/app-routes";
import { AuthNavigator } from "../../feature/auth/router/auth.navigator";
import { AppNavigator } from "../../navigator/tab.navigator";
import { DrawerNavigator } from "../../navigator/drawer.navigator";


import WebViewLinkPos from "./webview.screen";
import WebViewOpen from "src/old/screens/webview";
import ScanQR from "src/old/screens/qr/qr";
import ScanQRM from "src/old/screens/qr/qr.m";



export type RootStackParamList = {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.APP]: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

type RootStackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<RootStackNavigatorProps>
): React.ReactElement => {
  const user = useCurrentUser();
  
  
 
  return (
    <Stack.Navigator {...props} headerMode="none">
      <Stack.Screen name={AppRoutes.APP} component={DrawerNavigator} />
      <Stack.Screen name={"WebViewLinkPos"} component={WebViewLinkPos} />
      <Stack.Screen name={"WebViewOpen"} component={WebViewOpen} />
      <Stack.Screen name={"ScanQR"} component={ScanQR} />
      <Stack.Screen name={"ScanQRM"} component={ScanQRM} />
    </Stack.Navigator>
  );
};

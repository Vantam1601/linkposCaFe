import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import { useCurrentUser } from "src/hooks/useCurrentUser";
import { AppRoutes } from "./app-routes";
import { AuthNavigator } from "./auth.navigator";

// import WebViewLinkPos from "src/linkpos/webview.screen";
// import WebViewAZS from "src/azs/webview.screen";
// import WebViewOpen from "src/screens/webview/";

export type RootStackParamList = {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.APP]: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

type RootStackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<RootStackNavigatorProps>
): React.ReactElement => {
  // const user = useCurrentUser();

  return (
    <Stack.Navigator {...props} headerMode="none">
      <Stack.Screen name={AppRoutes.AUTH} component={AuthNavigator} />
      {/* {!user ? (
        <Stack.Screen name={AppRoutes.AUTH} component={AuthNavigator} />
      ) : null}
      <Stack.Screen name={AppRoutes.APP} component={DrawerNavigator} /> */}
    </Stack.Navigator>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import { CoreNavigator } from "src/feature/core/router/core.navigator";
import { AuthNavigator } from "../feature/auth/router/auth.navigator";
import { AppRoutes } from "./app-routes";

import { RootStateReducer } from "src/store/types";

export type RootStackParamList = {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.APP]: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

type RootStackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<RootStackNavigatorProps>
): React.ReactElement => {
  const token = useSelector<RootStateReducer>((state) => state.auth.token);

  return (
    <Stack.Navigator {...props} headerMode="none">
      {!token ? (
        <Stack.Screen name={AppRoutes.AUTH} component={AuthNavigator} />
      ) : (
        <Stack.Screen name={AppRoutes.APP} component={CoreNavigator} />
      )}
    </Stack.Navigator>
  );
};

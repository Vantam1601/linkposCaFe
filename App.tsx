import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { navigationRef } from "src/navigator/RootNavigation";
import { i18n } from "./src/locales";
import RNBootSplash from "react-native-bootsplash";

moment.updateLocale("vi", {
  relativeTime: {
    future: "%s",
    past: "%s trước",
    s: "giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "hơn %d năm",
  },
});
moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a min",
    mm: "%d min",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

import {
  Colors,
  Spacings,
  ThemeManager,
  Typography,
} from "react-native-ui-lib";
import AppStatusBar from "src/components/AppStatusBar";
import { AppRoutes } from "src/navigator/app-routes";
import { RootNavigator } from "src/navigator/root.navigator";
import { persistor, store } from "src/store/store";
import { COLOR } from "src/theme/color";
import SocketController from "src/feature/core/SocketController";

Colors.loadColors({
  primaryColor: "#2364AA",
  secondaryColor: "#81C3D7",
  textColor: "##221D23",
  errorColor: "#E63B2E",
  successColor: "#ADC76F",
  warnColor: "##FF963C",
});

Typography.loadTypographies({
  heading: { fontSize: 36, fontWeight: "600" },
  subheading: { fontSize: 28, fontWeight: "500" },
  body: { fontSize: 18, fontWeight: "400" },
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16,
});

// with plain object
ThemeManager.setComponentTheme("Card", {
  borderRadius: 8,
});

// with a dynamic function
ThemeManager.setComponentTheme("Button", (props: any, context: any) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0,
    };
  }
});
//setup

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <SocketController />
            <NavigationContainer
              ref={navigationRef}
              fallback={<Text>Loading...</Text>}
              theme={DefaultTheme}
              onReady={() => {
                RNBootSplash.hide();
              }}
            >
              <AppStatusBar backgroundColor={COLOR.main_color} />
              <RootNavigator initialRouteName={AppRoutes.AUTH} />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
          </SafeAreaProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

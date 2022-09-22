import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React from "react";
import { AppRoutes } from "src/navigator/app-routes";
import type { RootStackParamList } from "../../../navigator/root.navigator";
import { TableModal } from "../modal";
import Cashier from "../screen/Cashier";
import DetailOrder from "../screen/DetailOrder";
import Kitchen from "../screen/Kitchen";
import Loader from "../screen/Loader";
import Order from "../screen/Order";
import { cafeRoutes } from "./CafeRouter";
import ChangeTable from "../screen/ChangeTable";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import MergeTable from "../screen/MergeTable";
import Report from "../screen/Report";
import BottomTabLayout from "./BottomTabLayout";
import Bill from "../screen/Bill";
import BottomTabLayoutKitchen from "./BottomTabLayoutKitchen";
import DetailConfirm from "../screen/DetailConfirm";
import Selling from "../screen/Selling";
import BottomTabLayoutKitchenCashier from "./BottomTabLayoutKitchenCashier";
import ConfigMenu from "../screen/ConfigMenu";
import CallStaff from "../screen/CallStaff";
import DetailCashierOutlet from "../screen/DetailCashierOutlet";
import CashierToday from "../screen/CashierToday";

export type CafeStackParamList = {
  [cafeRoutes.Kitchen]: undefined;
  [cafeRoutes.Selling]: undefined;
  [cafeRoutes.ConfigMenu]: undefined;
  [cafeRoutes.Home]: undefined;
  [cafeRoutes.CallStaff]: undefined;
  [cafeRoutes.CashierToday]: undefined;
  [cafeRoutes.DetailCashierOutlet]: {
    id: number | string;
  };
  [cafeRoutes.Detail]: {
    id: number | string;
  };
  [cafeRoutes.Order]: {
    item: TableModal;
  };
  [cafeRoutes.Review]: {
    data: Record<string, any>;
  };
  [cafeRoutes.ChangeTable]: {
    item: TableModal;
  };
  [cafeRoutes.Bill]: {
    item: TableModal;
  };
  [cafeRoutes.DetailConfirm]: {
    id: number;
  };
  [cafeRoutes.Loader]: {
    screen: string;
  };
  [cafeRoutes.Cashier]: {
    screen: string;
  };
};

export type TabStackParamList = {
  [cafeRoutes.Selling]: undefined;
  [cafeRoutes.Takeaway]: undefined;
  [cafeRoutes.MergeTable]: undefined;
  [cafeRoutes.Report]: undefined;
};

const Stack = createStackNavigator<CafeStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

const TabSelling = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => <BottomTabLayout {...props} />}
    >
      <Tab.Screen name={cafeRoutes.Selling} component={Selling} />
      <Tab.Screen name={cafeRoutes.Takeaway} component={Order} />
      <Tab.Screen name={cafeRoutes.MergeTable} component={MergeTable} />
      <Tab.Screen name={cafeRoutes.Report} component={Report} />
    </Tab.Navigator>
  );
};

const TabCashier = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => (
        <BottomTabLayoutKitchenCashier {...props} />
      )}
    >
      <Tab.Screen name={cafeRoutes.Cashier} component={Cashier} />
      <Tab.Screen name={cafeRoutes.Takeaway} component={Order} />
      <Tab.Screen name={cafeRoutes.MergeTable} component={MergeTable} />
      <Tab.Screen name={cafeRoutes.Report} component={Report} />
    </Tab.Navigator>
  );
};

const TabKitchen = createBottomTabNavigator<TabStackParamList>();

const TabSellingKitChen = () => {
  return (
    <TabKitchen.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => (
        <BottomTabLayoutKitchen {...props} />
      )}
    >
      <TabKitchen.Screen name={cafeRoutes.Kitchen} component={Kitchen} />
      <TabKitchen.Screen name={cafeRoutes.Report} component={Report} />
    </TabKitchen.Navigator>
  );
};

export type AuthStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  StackNavigationProp<CafeStackParamList>
>;

export const CafeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={cafeRoutes.Loader}>
      <Stack.Screen
        name={cafeRoutes.Loader}
        options={{
          title: "Loading",
          headerShown: false,
        }}
        component={Loader}
      />
      <Stack.Screen
        name={cafeRoutes.Home}
        options={{
          title: "Home",
          headerShown: false,
        }}
        component={TabSelling}
      />
      <Stack.Screen
        name={cafeRoutes.HomeKitChen}
        options={{
          title: "Loading",
          headerShown: false,
        }}
        component={TabSellingKitChen}
      />
      <Stack.Screen
        name={cafeRoutes.HomeCashier}
        options={{
          title: "Loading",
          headerShown: false,
        }}
        component={TabCashier}
      />
      <Stack.Screen
        name={cafeRoutes.Detail}
        options={{
          title: "Loading",
          headerShown: false,
        }}
        component={DetailOrder}
      />
      <Stack.Screen
        name={cafeRoutes.Order}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={Order}
      />
      <Stack.Screen
        name={cafeRoutes.ChangeTable}
        options={{
          title: "ChangeTable",
          headerShown: false,
        }}
        component={ChangeTable}
      />
      <Stack.Screen
        name={cafeRoutes.Bill}
        options={{
          title: "ChangeTable",
          headerShown: false,
        }}
        component={Bill}
      />
      <Stack.Screen
        name={cafeRoutes.DetailConfirm}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={DetailConfirm}
      />
      <Stack.Screen
        name={cafeRoutes.ConfigMenu}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={ConfigMenu}
      />
      <Stack.Screen
        name={cafeRoutes.CallStaff}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={CallStaff}
      />
      <Stack.Screen
        name={cafeRoutes.DetailCashierOutlet}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={DetailCashierOutlet}
      />
      <Stack.Screen
        name={cafeRoutes.CashierToday}
        options={{
          title: "Order",
          headerShown: false,
        }}
        component={CashierToday}
      />
    </Stack.Navigator>
  );
};

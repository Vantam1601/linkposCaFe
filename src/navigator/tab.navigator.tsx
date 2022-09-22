// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// import { faClock, faHomeLg, faList, faPlus, faUser } from "nvquang-font-icon/pro-solid-svg-icons";
// import React from "react";
// import { COLOR } from "src/theme/color";
// import { AppRoutes } from "./app-routes";
// import MyBottomBar from "./Bottom";
// import { CreateNavigator } from "./create.navigator";
// import { DiscountNavigator } from "./discount.navigator";
// import { HistoryNavigator } from "./history.navigator";
// import { HomeNavigator } from "./home.navigator";
// import { ProfileNavigator } from "./profile.navigator";
// import { Dimensions } from 'react-native';

// import { useTranslate } from "src/hooks/useTranslate";

// export type AppTabParamList = {
//   [AppRoutes.HOME_TAB]: undefined;
//   [AppRoutes.DISCOUNT_TAB]: undefined;
//   [AppRoutes.CREATE_TAB]: undefined;
//   [AppRoutes.HISTORY_TAB]: undefined;
//   [AppRoutes.PROFILE_TAB]: undefined;
// };

// const Tab = createBottomTabNavigator<AppTabParamList>();

// export const AppNavigator = () => {
//   const intl = useTranslate();
//   const { width, height } = Dimensions.get("window");

//   const display = (text:string)=>{
//     return width<376?"":intl.formatMessage({ id: text, });
//   }

//   const getTabBarVisibility = (route: any) => {
//     const routeName = getFocusedRouteNameFromRoute(route) || "";
//     const allowRoute: string[] = ["",
//     AppRoutes.HOME,
//     AppRoutes.DISCOUNT,
//     AppRoutes.CREATE_TAB,
//     AppRoutes.HISTORY,
//     AppRoutes.PROFILE];
//     if (!allowRoute.includes(routeName)) {
//       return false;
//     }
//     return true;
//   };
//   return (
//     <Tab.Navigator tabBar={(props) => <MyBottomBar {...props} />}>
//       <Tab.Screen
//         name={AppRoutes.HOME_TAB}
//         options={(props) => {
//           return {
//             title: "Home",
//             icon: faHomeLg,
//             tabBarLabel:  display("nav:home"),
//             tabBarVisible: getTabBarVisibility(props.route),
//           };
//         }}
//         component={HomeNavigator}
//       />
//       <Tab.Screen
//         name={AppRoutes.DISCOUNT_TAB}
//         options={(props) => {
//           return {
//             icon: faClock,
//             tabBarLabel: display("nav:promotion"),
//             tabBarVisible: getTabBarVisibility(props.route),
//           };
//         }}
//         component={DiscountNavigator}
//       />
//       <Tab.Screen
//         name={AppRoutes.CREATE_TAB}
//         options={(props) => {
//           return {
//             icon: faPlus,
//             tabBarLabel: "",
//             tabBarVisible: getTabBarVisibility(props.route),
//           };
//         }}
//         component={CreateNavigator}
//       />
//       <Tab.Screen
//         name={AppRoutes.HISTORY_TAB}
//         options={(props) => {
//           return {
//             icon: faList,
//             tabBarLabel: display("nav:history"),
//             tabBarVisible: getTabBarVisibility(props.route),
//           };
//         }}
//         component={HistoryNavigator}
//       />
//       <Tab.Screen
//         name={AppRoutes.PROFILE_TAB}
//         options={(props) => {
//           return {
//             icon: faUser,
//             tabBarLabel: display("nav:account"),
//             tabBarVisible: getTabBarVisibility(props.route),
//           };
//         }}
//         component={ProfileNavigator}
//       />
//     </Tab.Navigator>
//   );
// };

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { useNavigation } from "@react-navigation/native";
// // import LottieView from "lottie-react-native";
// import React, { useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useCurrentUser } from "src/hooks/useCurrentUser";
// import { AppRoutes } from "src/navigator/app-routes";
// import { COLOR } from "src/theme/color";
// import { useTranslate } from "src/hooks/useTranslate";

// const DEVICE_WIDTH = Dimensions.get("window").width;
// export const isAndroid = Platform.OS === "android";
// const styles = StyleSheet.create({
//   wrap: {
//     flexDirection: "row",
//     height: 67,
//     paddingLeft: 14,
//     paddingRight: 14,
//     backgroundColor: COLOR.white,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     ...Platform.select({
//       ios: {
//         shadowColor: COLOR.gray,
//         shadowOffset: {
//           height: -2,
//           width: 2,
//         },
//         shadowRadius: 2,
//         shadowOpacity: 0.22,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//   },
//   imageButton: {
//     width: 21,
//     height: 21,
//   },
//   pen: {
//     width: 44,
//     height: 44,
//     backgroundColor: COLOR.main_color,
//     borderRadius: 44,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 35,
//   },
//   wrapPen: {
//     // borderWidth: 5,
//     borderColor: "white",
//     borderRadius: 50,
//   },
//   wrapModal: {
//     height: "100%",
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.48)",
//     paddingHorizontal: 16,
//     paddingBottom: 34,
//   },
//   buttonOption: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   overlay: {
//     position: "absolute",
//     opacity: 0.48,
//     backgroundColor: COLOR.black,
//     width: "100%",
//     height: "100%",
//   },
//   btnAction: {
//     width: 56,
//     height: 56,
//     borderRadius: 999,
//     backgroundColor: COLOR.main_color,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 8,
//   },
// });

// const MyBottomBar = ({ state, descriptors, navigation }: any) => {
//   const focusedOptions = descriptors[state.routes[state.index].key].options;
//   const intl = useTranslate();
//   const user = useCurrentUser();
//   const { navigate } = useNavigation();
//   const [showOption, setShowOption] = useState(false);

//   if (focusedOptions.tabBarVisible === false) {
//     return null;
//   }

//   const title = focusedOptions?.title as string;

//   const handleRequireLogin = () => {
//     // Alert.alert(intl.formatMessage({ id: "label:you_need_login", }), "", [
//     //   { text: intl.formatMessage({ id: "label:cancel", }) },
//     //   {
//     //     text: intl.formatMessage({ id: "label:login", }),
//     //     style: "destructive",
//     //     onPress: () => {
//     //       navigation.navigate(AppRoutes.AUTH, { screen: AppRoutes.LOGIN });
//     //     },
//     //   },
//     // ]);

//     // Alert.alert(intl.formatMessage({ id: "label:you_need_login"}), "", [
//     //   { text: intl.formatMessage({ id: "label:cancel"}) },
//     //   {
//     //     text: intl.formatMessage({ id: "label:login", }),
//     //     style: "destructive",
//     //     onPress: () => {

//     //     },
//     //   },
//     // ]);
//     navigation.navigate(AppRoutes.AUTH, { screen: AppRoutes.LOGIN });
//   };

//   return (
//     <>
//       <View
//         style={[
//           styles.wrap,
//           { backgroundColor: title !== "" ? "white" : undefined, zIndex: 99 },
//         ]}
//       >
//         {state.routes.map((route: any, index: number) => {
//           const { options } = descriptors[route.key];
//           const isFocused = state.index === index;
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//                 ? options.title
//                 : route.name;
//           const icon = options.tabBarIcon;
//           const onPress = () => {
//             setShowOption(false);
//             const event = navigation.emit({
//               type: "tabPress",
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               if (
//                 !user &&
//                 [AppRoutes.HISTORY_TAB, AppRoutes.CREATE_TAB, AppRoutes.PROFILE_TAB].includes(
//                   route.name
//                 )
//               ) {
//                 handleRequireLogin();
//               } else {
//                 navigate(route.name, { withAnimation: true });
//               }
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: "tabLongPress",
//               target: route.key,
//             });
//           };

//           return (
//             <TouchableOpacity
//               activeOpacity={0.9}
//               key={index}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingBottom: 10,
//               }}
//               onPress={onPress}
//               onLongPress={onLongPress}
//             >
//               {index === 2 ? (
//                 <View
//                   style={{
//                     backgroundColor: COLOR.white,
//                     width: 60,
//                     height: 60,
//                     borderRadius: 30,
//                     marginTop: -30,
//                     ...Platform.select({
//                       ios: {
//                         shadowColor: COLOR.gray,
//                         shadowOffset: {
//                           height: 0,
//                           width: 0,
//                         },
//                         shadowRadius: 2,
//                         shadowOpacity: 0.22,
//                       },
//                       android: {
//                         elevation: 10,
//                       },
//                     }),
//                   }}
//                 >
//                   <LottieView
//                     loop
//                     autoPlay={true}
//                     style={{ width: 60 }}
//                     speed={0.7}
//                     source={require("src/assets/animation/plus4.json")}
//                   />
//                 </View>
//               ) : (
//                 <FontAwesomeIcon
//                   color={isFocused ? COLOR.main_color : "#757575"}
//                   icon={options.icon}
//                   size={20}
//                 />
//               )}

//               <Text
//                 style={{
//                   color: isFocused ? COLOR.main_color : "#757575",
//                   marginTop: 3,
//                   fontSize: 12,
//                 }}
//               >
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </>
//   );
// }

// export default MyBottomBar;

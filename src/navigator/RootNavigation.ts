import { NavigationContainerRef, StackActions } from "@react-navigation/native";
import { createRef } from "react";
export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name: string, params?: object) {
  if (navigationRef?.current) {
    navigationRef?.current?.navigate(name, params);
  }
}

export function push(name: string, params?: object) {
  if (navigationRef?.current) {
    try {
      navigationRef.current?.dispatch(StackActions.push(name, params));
    } catch (error) {
      // alert('lỗi gócreen');
    }
  }
}

export function replace(name: string, params?: object) {
  if (navigationRef?.current) {
    try {
      navigationRef.current?.dispatch(StackActions.replace(name, params));
    } catch (error) {
      // alert('lỗi gócreen');
    }
  }
}

export function navigateReset(name: string) {
  if (navigationRef?.current) {
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: name }],
    });
  }
}

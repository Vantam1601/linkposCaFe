
import { NavigationContainerRef } from '@react-navigation/native';
import React, { createRef, useEffect } from 'react';
import { AppRoutes } from './app-routes';
export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name: string, params?: object) {
  if (navigationRef?.current) {
    navigationRef?.current?.navigate(name, params)
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


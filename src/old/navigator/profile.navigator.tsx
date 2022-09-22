import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
// ----
import ProfileScreen from 'src/old/screens/profile/profile.screen';
import MemberScreen from 'src/old/screens/member.screen';
import InformationScreen from 'src/old/screens/profile/information.screen';
import WalletPointScreen from 'src/old/screens/point/wallet.point.screen';
import LoadsPointScreen from 'src/old/screens/point/deposit.points.screen';
import UpdateInformationScreen from 'src/old/screens/profile/update.information.screen';
import VerificationKycScreen from 'src/old/screens/profile/verification.kyc.screen';
import VerificationPhoneScreen from 'src/old/screens/profile/verification.phone.screen';
import VerificationEmailScreen from 'src/old/screens/profile/verification.email.screen';
import DeleteAccountScreen from 'src/old/screens/delete.account.screen';
import ChangePasswordScreen from 'src/old/screens/change.password.screen';
import ChangeOTPScreen from 'src/old/screens/change.otp.screen';
import WithdrawPointsScreen from 'src/old/screens/point/withdraw.points.screen';
import GiftScreeen from 'src/old/screens/gift.screen';
import DetailGiftScreen from 'src/old/screens/detail.gifft.screen';
import DetailLoadPointScreen from 'src/old/screens/point/detail.deposit.points.screen';
import TransferPaymentScreen from 'src/old/screens/point/withdraw.detail.payments.screen';
import SupportOtpScreen from 'src/old/screens/support.otp.screen';
import MemberGroupScreen from 'src/old/screens/member.group.screen';
import LanguageScreen from 'src/old/screens/language.screen';
import HistoryWalletScreen from 'src/old/screens/point/history.screen';
import HistoryWorkScreen from 'src/old/screens/history.work.screen';

// ----
import { AppRoutes } from './app-routes';
import type { RootStackParamList } from './root.navigator';
import { AppTabParamList } from './tab.navigator';

export type ProfileStackParamList = {
  [AppRoutes.HistoryWalletScreen]: undefined;
  [AppRoutes.PROFILE]: undefined;
  [AppRoutes.MEMBER]: undefined;
  [AppRoutes.INFORMATION]: undefined;
  [AppRoutes.WALLET_POINT]: undefined;
  [AppRoutes.LOAD_POINT]: undefined;
  [AppRoutes.WITHDRAW_POINT]: undefined;
  [AppRoutes.GIFT]: undefined;
  [AppRoutes.UPDATE_INFORMATION]: undefined;
  [AppRoutes.VERIFICATION_KYC]: undefined;
  [AppRoutes.VERIFICATION_PHONE]: undefined;
  [AppRoutes.VERIFICATION_EMAIL]: undefined;
  [AppRoutes.CHANGE_PASSWORD]: undefined;
  [AppRoutes.CHANGE_OTP]: undefined;
  [AppRoutes.DELETE_ACCOUNT]: undefined;
  [AppRoutes.DETAIL_GIFT]: undefined;
  [AppRoutes.DETAIL_LOAD_POINT]: undefined;
  [AppRoutes.TRANSFER_PAYMENTS]: undefined;
  [AppRoutes.SUPPORT_OTP]: undefined;
  [AppRoutes.MEMBER_GROUP]: undefined;
  [AppRoutes.LANGUAGE]: undefined;
  [AppRoutes.HISTORY_WORK]: undefined;
}
const Stack = createStackNavigator<ProfileStackParamList>();


export type DiscountStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, AppRoutes.PROFILE_TAB>,
    StackNavigationProp<ProfileStackParamList>
  >
>;

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AppRoutes.PROFILE}>
      <Stack.Screen
        name={AppRoutes.PROFILE}
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={AppRoutes.MEMBER}
        options={{
          headerShown: false,
        }}
        component={MemberScreen}
      />
      <Stack.Screen
        name={AppRoutes.INFORMATION}
        options={{
          headerShown: false,
        }}
        component={InformationScreen}
      />
      {/* WALLET */}
      <Stack.Screen
        name={AppRoutes.WALLET_POINT}
        options={{
          headerShown: false,
        }}
        component={WalletPointScreen}
      />
      <Stack.Screen
        name={AppRoutes.LOAD_POINT}
        options={{
          headerShown: false,
        }}
        component={LoadsPointScreen}
      />
      <Stack.Screen
        name={AppRoutes.WITHDRAW_POINT}
        options={{
          headerShown: false,
        }}
        component={WithdrawPointsScreen}
      />
      <Stack.Screen
        name={AppRoutes.GIFT}
        options={{
          headerShown: false,
        }}
        component={GiftScreeen}
      />
      <Stack.Screen
        name={AppRoutes.UPDATE_INFORMATION}
        options={{
          headerShown: false,
        }}
        component={UpdateInformationScreen}
      />
      <Stack.Screen
        name={AppRoutes.VERIFICATION_KYC}
        options={{
          headerShown: false,
        }}
        component={VerificationKycScreen}
      />
      <Stack.Screen
        name={AppRoutes.VERIFICATION_PHONE}
        options={{
          headerShown: false,
        }}
        component={VerificationPhoneScreen}
      />
      <Stack.Screen
        name={AppRoutes.VERIFICATION_EMAIL}
        options={{
          headerShown: false,
        }}
        component={VerificationEmailScreen}
      />
      <Stack.Screen
        name={AppRoutes.CHANGE_PASSWORD}
        options={{
          headerShown: false,
        }}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={AppRoutes.CHANGE_OTP}
        options={{
          headerShown: false,
        }}
        component={ChangeOTPScreen}
      />
      <Stack.Screen
        name={AppRoutes.DELETE_ACCOUNT}
        options={{
          headerShown: false,
        }}
        component={DeleteAccountScreen}
      />
      <Stack.Screen
        name={AppRoutes.DETAIL_GIFT}
        options={{
          headerShown: false,
        }}
        component={DetailGiftScreen}
      />
      <Stack.Screen
        name={AppRoutes.DETAIL_LOAD_POINT}
        options={{
          headerShown: false,
        }}
        component={DetailLoadPointScreen}
      />
      <Stack.Screen
        name={AppRoutes.TRANSFER_PAYMENTS}
        options={{
          headerShown: false,
        }}
        component={TransferPaymentScreen}
      />
      <Stack.Screen
        name={AppRoutes.SUPPORT_OTP}
        options={{
          headerShown: false,
        }}
        component={SupportOtpScreen}
      />
      <Stack.Screen
        name={AppRoutes.MEMBER_GROUP}
        options={{
          headerShown: false,
        }}
        component={MemberGroupScreen}
      />
       <Stack.Screen
        name={AppRoutes.LANGUAGE}
        options={{
          headerShown: false,
        }}
        component={LanguageScreen}
      />

      <Stack.Screen
        name={AppRoutes.HistoryWalletScreen}
        options={{
          headerShown: false,
        }}
        component={HistoryWalletScreen}
      />
      <Stack.Screen
        name={AppRoutes.HISTORY_WORK}
        options={{
          headerShown: false,
        }}
        component={HistoryWorkScreen}
      />
    </Stack.Navigator>
  );
};

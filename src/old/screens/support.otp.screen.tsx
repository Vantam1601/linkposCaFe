import React, { memo } from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { HOT_LINE } from 'src/helpers/constants';
import { useTranslate } from 'src/hooks/useTranslate';
import { AppRoutes } from 'src/navigator/app-routes';
import { COLOR } from 'src/theme/color';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SupportOtpScreen = memo(() => {
  const intl = useTranslate();
  const navigation = useNavigation();


  const onCallSupport = () => {
    Linking.openURL(`tel:${HOT_LINE}`)
  };
  const onNavigator = () => {
    navigation.navigate(AppRoutes.VERIFICATION_EMAIL)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
       <KeyboardAwareScrollView>
        <HeaderBack
          title={"label:support_otp"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <TouchableOpacity
            onPress={onNavigator}
            style={styles.vLabel}
          >
            <AppText
              fontSize={15}
              fontWeight={'500'}
            >
              {intl.formatMessage({
                id: 'translation:by_email_address',
              })}
            </AppText>
          </TouchableOpacity>
          <View style={[styles.vLabel, { marginTop: 10, flexDirection: 'row' }]}>
            <AppText
              fontSize={15}
              fontWeight={'500'}
            >
              {intl.formatMessage({
                id: 'label:contact_hotline',
              })}
              {': '}
            </AppText>
            <TouchableOpacity onPress={onCallSupport}>
              <AppText
                fontSize={15}
                color={COLOR.textBlue}
                fontWeight={'600'}
              >
                {`+${HOT_LINE}`}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
       </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  vLabel: {
    marginHorizontal: 12,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  }
});

export default SupportOtpScreen;

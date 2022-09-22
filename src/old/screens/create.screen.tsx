import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Image, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { AppRoutes } from 'src/navigator/app-routes';
import { COLOR } from 'src/theme/color';

const CreateScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"create:title"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 10, marginBottom: 50 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(AppRoutes.CREATE_REQUEST)}
              style={[styles.vCard, { alignItems: 'center' }]}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: 'https://cdn.dribbble.com/users/101713/screenshots/4893997/writer_illustration.jpg' }}
                style={{ height: 200, width: '80%' }}
                resizeMode="stretch"
              />
              <AppText style={{ position: 'absolute', left: 10, bottom: 5, fontWeight: '500' }}>
                {intl.formatMessage({
                  id: "create:short_term_demand",
                })}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(AppRoutes.INTRO_CREATE_SHOP)}
              style={[styles.vCard, { alignItems: 'center' }]}
              activeOpacity={0.7}>
              <Image
                source={{ uri: 'https://img.freepik.com/free-vector/people-standing-store-queue_23-2148594615.jpg' }}
                style={{ height: 200, width: '80%' }}
                resizeMode="stretch"
              />
              <AppText style={{ position: 'absolute', left: 10, bottom: 5, fontWeight: '500' }}>
                {intl.formatMessage({
                  id: "create:create_shop",
                })}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(AppRoutes.CREATE_EMERHENCY)}
              style={[styles.vCard, { alignItems: 'center' }]}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: 'https://image.freepik.com/free-vector/emergency-vector-banner_36298-47.jpg' }}
                style={{ height: 200, width: '80%' }}
                resizeMode="stretch"
              />
              <AppText style={{ position: 'absolute', left: 10, bottom: 5, fontWeight: '500' }}>
                {intl.formatMessage({
                  id: "create:sos",
                })}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>

  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  vCard: {
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    paddingVertical: 12,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    marginBottom: 0,
    borderRadius: 6,
  },
});

export default CreateScreen;

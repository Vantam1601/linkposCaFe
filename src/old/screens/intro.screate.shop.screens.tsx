import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Dimensions, Platform } from 'react-native';
import { AppText } from 'src/components/Apptext';
import Button from 'src/components/Button';
import FastImagePlaceholder from 'src/components/FastImage';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { AppRoutes } from 'src/navigator/app-routes';
import { COLOR } from 'src/theme/color';

const { width } = Dimensions.get("window");

const IntroCreateShopScreen = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();
  const intl = useTranslate();

  const onNavigater = () => {
    navigation.navigate(AppRoutes.CREATE_SHOP)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"create:title_shop"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <View style={styles.vCard}>
            <View style={styles.viewImage}>
              <FastImagePlaceholder
                needProgress
                source={'https://image.freepik.com/free-vector/set-coffee-shop-tools-accessories-with-man-woman-barista-uniform-isolated-horizontal-vector-illustration_48369-33548.jpg'}
                resizeMode="stretch"
                style={styles.image}
              />
              <AppText
                fontSize={14}
                lineHeight={20}
                style={styles.txtConfirm}
              >
                {intl.formatMessage({
                  id: 'create:with_formula',
                })}
                {' "'}
                <AppText
                  lineHeight={20}
                  fontWeight="600"
                  fontSize={14}
                  style={styles.txtConfirm}
                >
                  {intl.formatMessage({
                    id: 'create:need_with_such',
                  })}
                </AppText>
                {'" '}
                <AppText
                  lineHeight={20}
                  fontSize={14}
                  style={styles.txtConfirm}
                >
                  {intl.formatMessage({
                    id: 'create:text_intro_shop',
                  })}
                </AppText>
              </AppText>
              <Button
                buttonStyle={styles.buttonLogin}
                loading={loading}
                onPress={onNavigater}
                text={intl.formatMessage({
                  id: "create:start_immediately",
                })}
                textStyle={styles.txtVerify}
              />
            </View>
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
  viewImage: {
    marginTop: 10,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  txtConfirm: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonLogin: {
    width: width - 30,
    marginTop: 10,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
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
    marginHorizontal: 10,
  },
});

export default IntroCreateShopScreen;

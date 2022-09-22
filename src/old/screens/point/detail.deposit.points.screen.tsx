import React, { memo} from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Platform, Dimensions } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from 'src/navigator/app-routes';

const DetailLoadPointScreen = memo((navigationRoute: any) => {
  const { route } = navigationRoute;
  const params = route?.params;
  const navigation = useNavigation();
 
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:pay"}
          goBackFuntion={()=>{
            navigation.navigate(AppRoutes.WALLET_POINT);
          }}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vTextInstruct}>
              <AppText
                fontSize={15}>
                {intl.formatMessage({
                  id: 'translation:instruct_pay',
                })}
                {':'}
              </AppText>
            </View>
            <View style={[styles.vItemGift]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.vDot} />
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'translation:bank_account',
                  })}
                  {': '}
                  {params?.bank_name}
                </AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.vDot} />
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:account_name',
                  })}
                  {': '}
                  {params?.name_account}
                </AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.vDot} />
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:account_number',
                  })}
                  {': '}
                  {params?.account}
                </AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.vDot} />
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:amount_of_money',
                  })}
                  {': '}
                  {params?.amount}
                </AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.vDot} />
                <AppText
                  fontSize={14}
                  fontWeight='500'
                >
                  {intl.formatMessage({
                    id: 'label:content',
                  })}
                  {': '}
                  {params?.ref}
                </AppText>
              </View>
              <AppText fontSize={14} >
                {params?.description?params?.description:intl.formatMessage({
                  id: 'translation:pay_attention',
                })}
              </AppText>
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
  vMain: {
    marginHorizontal: 12,
  },
  vItemGift: {
    backgroundColor: COLOR.white,
    marginTop: 12,
    borderRadius: 6,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.72,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  vDot: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: COLOR.black,
    marginRight: 10,
  },
  vTextInstruct: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
});

export default DetailLoadPointScreen;

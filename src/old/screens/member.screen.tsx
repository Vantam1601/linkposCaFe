import React, { memo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';
import AccountPointProgres from './profile/AccountPointProgres';

const Data = ['label:new', 'label:copper', 'label:silver', 'label:yellow']
const MemberScreen = memo(() => {
  const [isIndex, setIsIndex] = useState<Number>(0)
  const intl = useTranslate();
  const onSelectTabbar = (index: any) => {
    if (index != isIndex) {
      setIsIndex(index)
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:member"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.vMain}>
            <View style={styles.vPoint}>
              <View style={styles.vTitlePoint}>
                <AppText
                  fontSize={15}
                  color={COLOR.white}
                  fontWeight="600"
                >
                  {intl.formatMessage({
                    id: 'label:demo',
                  })}
                </AppText>
                <AppText
                  fontSize={15}
                  color={COLOR.white}
                  fontWeight="600"
                >
                  {intl.formatMessage({
                    id: 'label:new_member',
                  })}
                </AppText>
              </View>
              <View style={styles.vMainPoint}>

              </View>
              <View style={styles.vFooterPoint}>
                <AppText
                  fontSize={15}
                  color={COLOR.white}
                  fontWeight="600"
                >
                  {intl.formatMessage({
                    id: '0',
                  })}
                </AppText>
                <AppText
                  fontSize={15}
                  color={COLOR.white}
                  fontWeight="500"
                >
                  {intl.formatMessage({
                    id: "label:point",
                  })}
                </AppText>
              </View>
            </View>
            <AppText
              fontSize={15}
              style={styles.txtRankProcess}
              color={COLOR.black}
              fontWeight="600"
            >
              {intl.formatMessage({
                id: 'label:rank_up_process',
              })}
            </AppText>
            <View style={styles.vPointProgres}>
              <AccountPointProgres />
              <AppText
                fontSize={15}
                style={styles.txtRankProcessPoint}
                color={COLOR.black}
              >
                {'98,000 '}
                {intl.formatMessage({
                  id: 'label:point',
                })}
                {' '}
                {intl.formatMessage({
                  id: 'translation:you_can_exchange_gifts',
                })}
              </AppText>
            </View>
            <AppText
              fontSize={15}
              style={styles.txtRankProcess}
              color={COLOR.black}
              fontWeight="600"
            >
              {intl.formatMessage({
                id: 'label:request_rank_and_benefits',
              })}
            </AppText>
            <View style={styles.vRequestAndBenfits}>
              <ScrollView horizontal>
                {Data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.vButtonTabbar, { borderBottomWidth: index === isIndex ? 2 : 0, borderBottomColor: COLOR.borderPurple }]}
                      onPress={() => onSelectTabbar(index)}>
                      <AppText
                        fontSize={15}
                        style={styles.txtRankProcess}
                        color={index != isIndex ? COLOR.textBlue : COLOR.borderPurple}
                        fontWeight="600"
                      >
                        {intl.formatMessage({
                          id: item
                        })}
                      </AppText>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
              <AppText
                fontSize={15}
                fontWeight={'500'}
                style={styles.txtTotalPoint}
                color={COLOR.black}
              >
                {intl.formatMessage({
                  id: 'translation:total_point',
                })}
              </AppText>
              <AppText
                fontSize={15}
                style={[styles.txtTotalPoint, { marginTop: 5 }]}
                color={COLOR.black}
              >
                {'0-500.000 '}
                {intl.formatMessage({
                  id: 'label:point'
                })}
              </AppText>
              <AppText style={[styles.txtDetail,{marginTop: 30}]}>
                {intl.formatMessage({
                  id: 'translation:in_this_category'
                })}
              </AppText>
              <AppText style={styles.txtDetail}>
                {intl.formatMessage({
                  id: 'translation:maintenance_fee'
                })}
                {': 0.09% (Max 1.100 point)/month'}
              </AppText>
              <AppText style={styles.txtDetail}>
                {intl.formatMessage({
                  id: 'translation:withdrawal_fee'
                })}
                {': Free'}
              </AppText>
              <AppText style={styles.txtDetail}>
                {intl.formatMessage({
                  id: 'translation:redemption_fee'
                })}
                {': 20.000 point'}
              </AppText>
              <AppText style={styles.txtDetail}>
                {intl.formatMessage({
                  id: 'translation:protection_products'
                })}
              </AppText>
              <AppText style={[styles.txtDetail,{marginBottom: 10}]}>
                {intl.formatMessage({
                  id: 'translation:post_max_times'
                })}
                {' '}
                {isIndex == 0 ? '2' : isIndex == 1 ? '4' : isIndex == 2 ? '10' : '20+'}
                {' '}
                {intl.formatMessage({
                  id: 'translation:time'
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
    paddingHorizontal: 12,
  },
  vPoint: {
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: COLOR.main_color,
    paddingHorizontal: 10,
  },
  vTitlePoint: {},
  vMainPoint: { height: 70, },
  vFooterPoint: {
    marginTop: 10,
  },
  txtRankProcess: {
    marginTop: 15
  },
  vPointProgres: {
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  },
  txtRankProcessPoint: {
    marginTop: 5
  },
  vRequestAndBenfits: {
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  },
  vButtonTabbar: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  txtTotalPoint: {
    textAlign: 'center',
    marginTop: 30
  },
  txtDetail: {
    marginTop: 10,
    fontSize: 15,
    color: COLOR.black,
    fontWeight: '500',
    marginLeft: 10
  }
  });

export default MemberScreen;

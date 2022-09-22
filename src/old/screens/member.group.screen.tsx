import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Image, Linking, Platform, SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useTranslate } from 'src/hooks/useTranslate';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { COLOR } from 'src/theme/color';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShare, faTrashAlt } from 'nvquang-font-icon/pro-solid-svg-icons';
import { getMemberGroupAction } from 'src/old/stores/app/app.actions';

const MemberGroupScreen = memo(() => {
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  const user = useCurrentUser();

  const [data, setData] = useState<any>([])

  useEffect(() => {
    getInit();
  }, [])
  const getInit = async () => {
    let rs: any = await dispatch(getMemberGroupAction());
    if (rs && rs?.data) {
      setData(rs?.data)
    }
  }
  const copyToClipboard = () => {
    Clipboard.setString(`https://knbc.vn/register.php/register/?ref=${user?.username}`);
    Toast.show({
      type: "success",
      text2: "Đã coppy thành công" + " 👋",
    });
  };

  const onShare = async () => {
    let url: string = `https://knbc.vn/register.php/register/?ref=${user?.username}`
    try {
      const result = await Share.share({
        title: 'KBNC',
        message: `${url}`,
        url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const _renderItem = (item: any,index: number) => {
    return(
      <View/>
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:member_group"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.vTextTitle}>
              <AppText
                fontSize={14}>
                {intl.formatMessage({
                  id: 'label:friend_invite_link',
                })}
              </AppText>
            </View>
            <View style={[styles.vCard, { paddingHorizontal: 10, }]}>
              <AppText style={{ lineHeight: 20, fontWeight: '600' }}>
                {intl.formatMessage({
                  id: 'label:click_friend_invite_link',
                })}
              </AppText>
              <TouchableOpacity
                style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: COLOR.borderWhiteGray, paddingVertical: 5 }}
                onPress={copyToClipboard}>
                <AppText style={{ lineHeight: 20 }} numberOfLines={3}>
                  {`https://knbc.vn/register.php/register/?ref=${user?.username}`}
                </AppText>
              </TouchableOpacity>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => onShare()} style={{ padding: 5, borderRadius: 8, marginTop: 10, backgroundColor: COLOR.bgBlue, justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    color={COLOR.white}
                    icon={faShare}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.vCard, { paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: 'row' }]}>
              <AppText style={{ lineHeight: 20, fontWeight: '600' }}>
                {intl.formatMessage({
                  id: 'Người giới thiệu',
                })}
              </AppText>
              <AppText style={{ lineHeight: 20, fontWeight: '600' }}>
                {user?.id_parent}
              </AppText>
            </View>
            <View style={[styles.vCard, { paddingHorizontal: 10, }]}>
              <AppText style={{ lineHeight: 20, fontWeight: '600' }}>
                {intl.formatMessage({
                  id: 'Hệ thống thành viên',
                })}
              </AppText>
              <FlatList
                data={data}
                renderItem={({item,index}) => {

                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View >

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
  vTextTitle: {
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
  tinyLogo: {
    width: 125,
    height: 125,
    borderRadius: 12,
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

export default MemberGroupScreen;

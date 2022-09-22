import React, { memo, useEffect, useState } from 'react';
import { Image, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { HOT_LINE } from 'src/helpers/constants';
import { useTranslate } from 'src/hooks/useTranslate';
import { AppRoutes } from 'src/navigator/app-routes';
import { COLOR } from 'src/theme/color';
import { useNavigation } from '@react-navigation/native';
import { useTypedDispatch } from 'src/hooks/useTypedDispatch';
import { getCommentShop, postCommentNewShop, postDeleteCommentShop, postFixCommentShop, postLikeCommentShop } from 'src/old/stores/app/app.actions';
import TreeView from 'src/components/TreeView';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeEvil, faEyeSlash, faFan, faThumbsUp } from 'nvquang-font-icon/pro-solid-svg-icons';
import FastImagePlaceholder from 'src/components/FastImage';
import moment from 'moment';
import Input from 'src/components/AppInputElement';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import CommentItem from './comment.list';

const ListCommnetScreen = memo((navigationRoute: any) => {
  const intl = useTranslate();
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  const { route } = navigationRoute;
  const user = useCurrentUser();
  const params = route?.params?.value;

  const [data, setData] = useState<any>([])
  const [keyWordNew, setKeyWordNew] = useState<string>("");
  const [keyWordUpdate, setKeyWordUpdate] = useState<string>("");
  const [idState, setId] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const [typeAction, setTypeAction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let response: any = await dispatch(getCommentShop(params?.id));
    if (response && response?.data) {
      let data = response.data;

      data?.reverse().map((item:any) => ({ ...item, id: item.id }));
      let map = {}, node, roots = [], i;
      for (i = 0; i < data.length; i++) {
        map[data[i].id] = i;
        data[i].children = [];
      }
      for (i = 0; i < data.length; i += 1) {
        node = data[i];
        if (node.parent !== null && data[map[node.parent]] != undefined) {
          data[map[node.parent]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      setData(roots)
      setKeyWordNew("")
    }
    setLoading(false);
  }

  const onSeand = async () => {
    let date = new Date();
    let ids = `c${date.getTime()}`;
    let rs: any = await dispatch(postCommentNewShop(
      ids,
      null,
      date.toISOString(),
      date.toISOString(),
      keyWordNew,
      "You",
      user?.avatar,
      true,
      0,
      false,
      params?.id
    ));
    if (rs && rs?.data === 1) {
      initData()
    }

  }
  const onComment = async (value: any) => {
    if (typeAction === 'reply') {
      onReply(value)
    } else {
      onFix(value)
    }
  }
  const onReply = async (value: any) => {
    let ids = `c${new Date().getTime()}`;
    let rs: any = await dispatch(postCommentNewShop(
      ids,
      // itemSelect?.parent,
      value?.id,
      value?.created,
      value?.modified,
      keyWordUpdate,
      'You',
      user?.avatar,
      true,
      0,
      false,
      params?.id
    ));

    if (rs && rs?.data === 1) {
      initData()
      setKeyWordUpdate('');
      setId('');
    }
  }
  const onFix = async (value: any) => {
    let rs: any = await dispatch(postFixCommentShop(
      value?.id,
      // itemSelect?.parent,
      value?.parent,
      value?.created,
      value?.modified,
      // value?.content,
      keyWordUpdate,
      value?.fullname,
      value?.profile_picture_url,
      value?.created_by_current_user,
      value?.upvote_count,
      value?.user_has_upvoted,
      params?.id
    ));
    if (rs && rs?.data === 0) {
      initData()
      setKeyWordUpdate('');
      setId('');
    }
  }
  // const onLike = async (value: any) => {
  //   let params2 = {
  //     id: value?.id,
  //     parent: value?.parent,
  //     created: value?.created,
  //     modified: value?.modified,
  //     content: value?.content,
  //     fullname: value?.fullname,
  //     profile_picture_url: value?.profile_picture_url,
  //     created_by_current_user: value?.created_by_current_user ? 1 : 0,
  //     upvote_count: value?.upvote_count === 1 ? 0 : 1,
  //     user_has_upvoted: value?.user_has_upvoted === 0 ? true : false,
  //     id_post: params?.id
  //   }
  //   console.log("params2", params2);

  //   // let rs: any = await dispatch(postLikeCommentShop(
  //   //   value?.id,
  //   //   // itemSelect?.parent,
  //   //   value?.parent,
  //   //   value?.created,
  //   //   value?.modified,
  //   //   value?.content,
  //   //   value?.fullname,
  //   //   value?.profile_picture_url,
  //   //   value?.created_by_current_user,
  //   //   value?.upvote_count === 1 ? 0 : 1,
  //   //   value?.user_has_upvoted === 1 ? false : true,
  //   //   params?.id
  //   // ));
  //   // console.log("rs", rs);

  //   // if (rs && rs.data ===1) {
  //   //   initData();
  //   // }
  // }

  const onDelete = async (value: any) => {
    let rs: any = await dispatch(postDeleteCommentShop(
      value?.id,
      value?.parent,
      value?.created,
      value?.modified,
      value?.content,
      value?.fullname,
      value?.profile_picture_url,
      value?.created_by_current_user,
      value?.upvote_count,
      value?.user_has_upvoted,
      params?.id
    ))
    if (rs && rs.data === 1) {
      initData();
      setId('');
    }
  }
  const onClick = (value: any, type: string) => {
    // if (type === 'like') {
    //   onLike(value)
    //   return
    // }
    if (type === 'reply') {
      setKeyWordUpdate(`@${value?.id_user}`)
    }
    if (type === 'fix') {
      setKeyWordUpdate(value?.content)
    }
    if (value?.id != idState) {
      setId(value?.id);
      setTypeAction(type)
    } else {
      setId('')
      setKeyWordUpdate('')
    }
  }
  const renderItem2 = (item: any, index: number, parent: boolean = false) => {
    return (
      <View>
        <CommentItem item={item} onClick={onClick} idItem={idState} valueInput={keyWordUpdate} onChange={setKeyWordUpdate} onPress={onComment} typeAction={typeAction} onDelete={onDelete} />
        {item.children && renderItemsChild(item.children)}
      </View>
    )
  }

  const renderItemsChild = (items: any) => {
    return (
      <FlatList
        data={items}
        renderItem={({ item, index }) => renderItem2(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }
  const renderItem = (item: any, index: number, parent: boolean = false) => {
    return (
      <View>
        <CommentItem
          item={item}
          onClick={onClick}
          idItem={idState}
          valueInput={keyWordUpdate}
          onChange={setKeyWordUpdate}
          typeAction={typeAction}
          onDelete={onDelete}
          onPress={onComment} />
        <View style={{ marginLeft: 50 }}>
          {item.children && renderItemsChild(item.children)}
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"history:comment"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <View style={styles.vCard}>
            <AppText style={[styles.txtAction, { color: COLOR.black }]}>
              {intl.formatMessage({
                id: 'home:store_reviews',
              })}
              {` "${params?.title}"`}
            </AppText>
          </View>
          <View style={styles.vCard}>
            {user?(<View style={{ marginHorizontal: 15, marginBottom: 10 }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
                />
                <Input
                  autoCapitalize="none"
                  multiline={false}
                  onChangeText={(val: string) => {
                    setKeyWordNew(val)
                  }}
                  placeholder={intl.formatMessage({
                    id: "input:create_comment_new",
                  })}
                  value={keyWordNew}
                  containerStyle={[
                    styles.input,
                    { marginBottom: 5, marginTop: 10 },
                  ]}
                  style={styles.textInput}
                />
              </View>
              <View style={{ width: '100%', height: 30, alignItems: 'flex-end', marginTop: 5 }}>
                <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: COLOR.bgBlue_white, borderRadius: 4 }} onPress={onSeand}>
                  <AppText style={{ fontWeight: '500', fontSize: 16, color: COLOR.textWhite }}>
                    {intl.formatMessage({
                      id: 'history:send',
                    })}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>):(<View style={{ marginHorizontal: 15, marginBottom: 10 }}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate(AppRoutes.LOGIN);
              }}>
                <AppText style={{ fontWeight: '500', fontSize: 16}}>
                      {intl.formatMessage({
                        id: 'label:please_login',
                      })}
                </AppText>
              </TouchableOpacity>
            </View>)}
            
            <View style={{ height: 1, backgroundColor: COLOR.bgDark_blue }} />
            <FlatList
              data={data}
              onRefresh={() => initData()}
              refreshing={loading as boolean}
              renderItem={({ item, index }) => renderItem(item, index, true)}
              keyExtractor={(item, index) => index.toString()}
            />
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
  vLabel: {
    marginHorizontal: 12,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  vItem: {
    marginVertical: 5
  },
  vTxtName: {
    marginLeft: 10,
    flex: 1
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
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  vAction: {
    flexDirection: 'row',
    height: 30,
    marginLeft: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.borderWhiteGray,
    marginTop: 5
  },
  txtName: {
    fontWeight: 'bold',
    color: COLOR.textBlue
  },
  txtDate: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.black
  },
  txtAction: {
    fontWeight: 'bold',
    color: COLOR.textGray
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: COLOR.white,
    textAlignVertical: "center",
    borderWidth: 0.5,
    borderRadius: 4,
  },
  textInput: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
});

export default ListCommnetScreen;

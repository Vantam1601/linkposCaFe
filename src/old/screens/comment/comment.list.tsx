import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";
import { faChevronRight, faThumbsUp } from "nvquang-font-icon/pro-solid-svg-icons";
import React, { memo } from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Input from "src/components/AppInputElement";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { renderPrice, renderTextTypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { FeatureNeed } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const widthS = Dimensions.get("window").width;

const WIDTH_ITEM = widthS - 20;
interface Props {
  item?: any;
  index?: number;
  onPress?: any;
  length?: number;
  onClick?: any;
  idItem?: string;
  valueInput?: string;
  onChange?: any,
  child?: boolean,
  typeAction?: string,
  onDelete?: any
}
const CommentItem = memo(({ item, index, onPress, length, onClick, idItem, valueInput, onChange, child, typeAction, onDelete }: Props) => {
  const intl = useTranslate();
  const user = useCurrentUser();

  const formatArrayImage = () => {
    try {
      if (item?.gallery) {
        const arr = JSON.parse(item?.gallery)
        if (arr && arr.length) {
          return arr[0]
        }
      }

      return item?.image
    } catch (error) {
      return item?.image
    }
  }

  return (
    <View style={[styles.vItem]}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: item?.profile_picture_url }}
          resizeMode="contain"
          style={[styles.image]}
        />
        <View style={styles.vTxtName}>
          <AppText style={styles.txtName}>{item?.fullname}</AppText>
          <AppText numberOfLines={10}>{item?.content}</AppText>
        </View>
        <AppText style={styles.txtDate}>{moment(item?.created).format('DD/MM/YYYY')}</AppText>
      </View>
      {user?<View style={styles.vAction}>
        <TouchableOpacity style={{ marginRight: 30 }}
          onPress={() => onClick(item, 'reply')}>
          <AppText style={styles.txtAction}>
            {intl.formatMessage({
              id: 'home:reply',
            })}
          </AppText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ marginRight: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => onClick(item, 'like')}>
          <AppText style={styles.txtAction}>{`${item?.upvote_count} `}</AppText>
          <FontAwesomeIcon
            color={!item?.user_has_upvoted ? COLOR.borderWhiteGray : COLOR?.bgBlue}
            icon={faThumbsUp}
            size={22}
            style={{ marginTop: -8 }}

          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => onClick(item, 'fix')}>
          <AppText style={styles.txtAction}>
            {intl.formatMessage({
              id: 'home:fix',
            })}
          </AppText>
        </TouchableOpacity>
      </View>:null}
      {item?.id === idItem ?
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Input
              autoCapitalize="none"
              multiline
              onChangeText={(val: string) => {
                onChange(val)
              }}
              placeholder={intl.formatMessage({
                id: "input:create_comment_new",
              })}
              value={valueInput}
              containerStyle={[
                styles.input,
                { marginBottom: 5, marginTop: 10, width: '90%' },
              ]}
              style={styles.textInput}
            />
          </View>
          <View style={{ width: '100%', height: 30, justifyContent: 'flex-end', marginTop: 5, flexDirection: 'row' }}>
            {typeAction === 'fix' ?
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  backgroundColor: COLOR.bgRedFresh,
                  borderRadius: 4
                }}
                onPress={() => onDelete(item)}>
                <AppText style={{ fontWeight: '500', fontSize: 16, color: COLOR.textWhite }}>
                  {intl.formatMessage({
                    id: 'history:delete',
                  })}
                </AppText>
              </TouchableOpacity>
              : null
            }
            <View style={{ width: 10 }} />
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: COLOR.bgBlue_white,
                borderRadius: 4
              }}
              onPress={() => onPress(item)}>
              <AppText style={{ fontWeight: '500', fontSize: 16, color: COLOR.textWhite }}>
                {intl.formatMessage({
                  id: 'history:send',
                })}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        : null}
      <View style={{
        width: '100%', height: 1, 
        backgroundColor: COLOR.borderWhiteGray
      }}>

      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
    borderColor: COLOR.borderWhiteGray
  },
  textInput: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
});

export default CommentItem;

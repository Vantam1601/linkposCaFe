import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { url } from "inspector";
import { faChevronRight } from "nvquang-font-icon/pro-light-svg-icons";
import React, { memo } from "react";
import { StyleSheet, View, Pressable, Platform, ViewStyle, Image } from "react-native";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { style_base } from "src/helpers/stylesheet";

interface InformationItemProps {
  title?: string;
  stylesProps?: ViewStyle,
  onPress?: () => void,
  txtRight?: string,
  badeCode?: string
}
const InformationItem = memo((props: InformationItemProps) => {
  const { title, stylesProps, onPress, txtRight, badeCode } = props;
  const intl = useTranslate();
  return (
    <Pressable
      style={[styles.itemContentRow, stylesProps]}
      onPress={onPress}
    >
      <View style={{ flex: 1, marginBottom: 10 }}>
        <AppText
          fontSize={15}
          fontWeight="600"
          style={styles.txtTitle}
        >
          {intl.formatMessage({
            id: title,
          })}
        </AppText>
        {badeCode && <AppText
          fontSize={14}
          style={styles.txtBadcode}
        >
          {intl.formatMessage({
            id: badeCode,
          })}
        </AppText>
        }
      </View>
      
      {
        txtRight ?
          <AppText
            fontSize={15}
            fontWeight="600"
            style={styles.txtTitle}
          >
            {intl.formatMessage({
              id: txtRight,
            })}
          </AppText>
          :
          <FontAwesomeIcon
            color={COLOR.white}
            icon={faChevronRight}
            size={14}
          />
      } 
    </Pressable>
  )
});

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    // borderRadius: 15,
    overflow: "hidden",
  },
  itemContentRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
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
    marginTop: 8,
    padding: 12,
    marginBottom: 0,
    borderRadius: 8,
    height: 70,
    width: '100%'
  },

  viewBorderBottom: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 10,
    paddingVertical: 5,
    borderBottomColor: COLOR.borderGray,
  },
  txtTitle: {
    color: COLOR.white,
  },
  txtBadcode: {
    color: COLOR.white,
    marginTop: 5
  }
});

export default InformationItem;

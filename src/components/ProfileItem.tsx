import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { url } from "inspector";
import { faChevronRight } from "nvquang-font-icon/pro-light-svg-icons";
import React, { memo } from "react";
import { StyleSheet, View, Pressable, Platform, ViewStyle, Switch, TouchableOpacity } from "react-native";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";

interface ProfileItemProps {
  icon?: string;
  title?: string;
  stylesProps?: ViewStyle,
  onPress?: () => void,
  isSwitch?: boolean,
  switchValue?: boolean,
  onSwitch?: () => void,
  isBottom?: boolean,
}
const ProfileItem = memo((props: ProfileItemProps) => {
  const { icon, title, stylesProps, onPress, isSwitch, switchValue, onSwitch, isBottom } = props;
  const intl = useTranslate();
  const user = useCurrentUser();
  return (
    <TouchableOpacity
      activeOpacity={isSwitch ? 1 : 0.7}
      style={styles.itemContentRow}
      onPress={onPress}
    >
      {icon &&
        <FastImagePlaceholder
          needProgress
          source={icon}
          resizeMode="contain"
          style={[styles.image]}
        />
      }
      <View style={[styles.viewBorderBottom, { marginLeft: icon ? 10 : 0, borderBottomWidth: isBottom ? 1 : 0 }]}>
        <AppText
          fontSize={14}
          style={[styles.txtTitle, { marginLeft: icon ? 10 : 0 }]}
          fontWeight="600"
        >
          {intl.formatMessage({
            id: title,
          })}
        </AppText>
        {isSwitch ?
          <View style={{marginTop: -8}}>
            <Switch
              value={switchValue}
              onValueChange={onSwitch}
              trackColor={{ true: COLOR.bgGreen, false: 'pink' }}
              thumbColor={COLOR.bgWhite}
            />
          </View>
          :
          <FontAwesomeIcon
            color={COLOR.gray}
            icon={faChevronRight}
            style={{ marginLeft: 10, alignSelf: 'center', marginBottom: 8, marginTop: -8 }}
            size={14}
          />
        }

      </View>
    </TouchableOpacity>
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
    padding: 10,
    marginBottom: 0,
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
    marginLeft: 8,
    flex: 1,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -4
  }
});

export default ProfileItem;

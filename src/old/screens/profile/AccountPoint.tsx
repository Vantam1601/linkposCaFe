import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "nvquang-font-icon/pro-light-svg-icons";
import React, { memo } from "react";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useCurrentUserPoint } from "src/hooks/useCurrentUserPoint";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import AccountPointProgres from "./AccountPointProgres";
import {site_url} from "src/helpers/config";
type Props = {
  styleContainer: StyleProp<ViewStyle>;
  onPress?: any
};
const AccountPoint = memo<Props>(({ styleContainer,onPress }) => {
  const userPoint = useCurrentUserPoint();
  const intl = useTranslate();
  return (
    <TouchableOpacity style={[styleContainer]} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <FastImagePlaceholder
          needProgress
          source={site_url("svg/updrage.png")}
          resizeMode="contain"
          style={[styles.image]}
        />
        <AppText
          fontSize={14}
          style={{ marginLeft: 20, flex: 1 }}
          fontWeight="600"
        >
          {intl.formatMessage({
            id: "label:new_member",
          })}
        </AppText>

        <AppText fontSize={14}>
          {userPoint?.in}{" "}
          {intl.formatMessage({
            id: userPoint?.in ?? 0 > 0 ? "label:points" : "label:point",
          })}
        </AppText>

        <FontAwesomeIcon
          color={COLOR.gray}
          icon={faChevronRight}
          style={{ marginLeft: 10, marginTop: 2, }}
          size={14}
        />
      </View>
      <AccountPointProgres />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  viewText: {
    marginLeft: 20,
    justifyContent: "center",
  },
  container: {
    height: 100,
    backgroundColor: COLOR.main_color,
    flexDirection: "row",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default AccountPoint;

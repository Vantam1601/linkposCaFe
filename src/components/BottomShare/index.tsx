import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { url } from "inspector";
import { faChevronRight } from "nvquang-font-icon/pro-light-svg-icons";
import React, { memo } from "react";
import { StyleSheet, View, Pressable, Platform, ViewStyle, Text } from "react-native";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import BottomSheet from "../BottomSheet";

interface Props {
     icon?: string;
     title?: string;
     stylesProps?: ViewStyle,
     onPress?: () => void,
     sheetRefPersion?: any;
     heightProps?: any
}
const BottomShare = memo((props: Props) => {
     const { icon, title, stylesProps, onPress, sheetRefPersion, heightProps } = props;
     const intl = useTranslate();
     const user = useCurrentUser();
     return (
          <BottomSheet
               ref={sheetRefPersion}
               duration={300}
               styleProps={styles.vContainer}
               height={heightProps}
          >
               <View style={styles.vMain}>
                    {/* <Text>222</Text> */}
               </View>

          </BottomSheet>
     )
});

const styles = StyleSheet.create({
     vContainer: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
     },
     vMain: {
          padding: 12
     }

});

export default BottomShare;

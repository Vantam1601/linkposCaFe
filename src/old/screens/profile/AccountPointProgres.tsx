import React, { memo } from "react";
import {
  Animated,
  Dimensions, StyleProp,
  StyleSheet, ViewStyle
} from "react-native";
import { MAX_POINT } from "src/helpers/constants";
import { useCurrentUserPoint } from "src/hooks/useCurrentUserPoint";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";

const widthS = Dimensions.get("window").width;

const AccountPointProgres = memo(() => {
  const userPoint = useCurrentUserPoint();
  const [widthVal] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const userPointIn = 1000;
    const newWidth = Math.round((userPointIn * (widthS - 12 * 4)) / MAX_POINT);
    Animated.timing(widthVal, {
      toValue: newWidth,
      duration: 600,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={styles.viewSlide}>
      <Animated.View
        style={[
          styles.viewSlideChildren,
          { width: widthVal },
        ]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  viewSlide: {
    height: 10,
    backgroundColor: COLOR.shadow,
    width: widthS - 48,
    marginBottom: 6,
    marginTop: 10,
    borderRadius: 8,
},
viewSlideChildren: { height: 10, backgroundColor: COLOR.main_color, width: widthS - 48, marginBottom: 6, borderRadius: 8, },


});

export default AccountPointProgres;

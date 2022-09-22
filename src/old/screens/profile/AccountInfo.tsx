import React, { memo } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { AppText } from "src/components/Apptext";
import FastImagePlaceholder from "src/components/FastImage";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { COLOR } from "src/theme/color";
import {image,country} from "src/helpers/config";

const AccountInfo = memo(() => {
  const user = useCurrentUser();

  let img = user?.avatar?user?.avatar:image.default();
  return (
    <View style={styles.container}>
      <View>
        <FastImagePlaceholder
          needProgress
          source={img}
          // resizeMode="stretch"
          style={[styles.image]}
        />
      </View>
      <View style={styles.viewText}>
        <AppText color={COLOR.white} fontSize={18} fontWeight={"600"}>{user?.fullname}</AppText>
        <AppText color={COLOR.white} fontSize={14} fontWeight={"600"}>{user?.username}</AppText>
        <AppText color={COLOR.white} fontSize={14} fontWeight={"600"}>{user?.ip}</AppText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewText: {
    marginLeft: 20,
    justifyContent: 'center'
  },
  container: {
    height: 100,
    backgroundColor: COLOR.main_color,
    padding: 12,
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2 ,
    overflow: "hidden",
  },
  viewImageUser: {
    width: 80,
    height: 80,
    backgroundColor: '#CECECE',
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AccountInfo;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CafeStackParamList } from "../router/CafeNavigator";
import { cafeRoutes } from "../router/CafeRouter";

interface Props
  extends StackScreenProps<CafeStackParamList, cafeRoutes.Review> {}

const ReviewOrder = (props: Props) => {
  return (
    <View>
      <Text>ReviewOrder</Text>
    </View>
  );
};

export default ReviewOrder;

const styles = StyleSheet.create({});

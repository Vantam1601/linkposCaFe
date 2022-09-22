import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { Ref } from "react";
import { COLOR } from "src/theme/color";

type LoadingProps = {
  isLoading?: boolean;
};

export interface RefObject {
  toggleState: (val: boolean) => void;
}

const Loading = React.forwardRef((props: LoadingProps, ref: Ref<RefObject>) => {
  const { isLoading = false } = props;

  const [loadingState, setLoadingState] = React.useState<boolean>(false);

  const toggleState = React.useCallback(
    (val: boolean) => {
      setLoadingState(val);
    },
    [setLoadingState]
  );

  React.useImperativeHandle(ref, () => {
    return { toggleState };
  });

  if (loadingState || isLoading) {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            paddingHorizontal: 30,
            backgroundColor: COLOR.white,
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <ActivityIndicator size={"large"} color={COLOR.main_color} />
        </View>
      </View>
    );
  } else {
    return null;
  }
});

const LoadingOverlay = React.memo(Loading);
export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

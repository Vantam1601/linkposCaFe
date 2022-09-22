import React from "react";
import { View, Modal, Animated, StyleSheet } from "react-native";
import { PanResponderInstance } from "react-native";
import { PanResponder, TouchableOpacity } from "react-native";
import { ViewStyle, StyleProp } from "react-native";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right",
] as Array<
  | "portrait"
  | "portrait-upside-down"
  | "landscape"
  | "landscape-left"
  | "landscape-right"
>;

export type Props = {
  animationType?: "none" | "fade" | "slide";
  onlyHeader?: boolean;
  height?: number;
  minClosingHeight?: number;
  duration?: number;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  closeOnPressBack?: boolean;
  keyboardAvoidingViewEnabled?: boolean;
  onClose?: () => void;
  customStyles?: {
    wrapper?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    draggableIcon?: StyleProp<ViewStyle>;
  };
  children: React.ReactNode;
  styleProps: any
};

type State = {
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  pan: Animated.ValueXY;
};

const defaultProps: Props = {
  animationType: "none",
  height: 200,
  minClosingHeight: 0,
  duration: 300,
  closeOnDragDown: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: false,
  customStyles: {},
  children: <View />,
  styleProps: {}
};

const headerHeight = 25;

class BottomSheet extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  state = {
    modalVisible: false,
    animatedHeight: new Animated.Value(0),
    pan: new Animated.ValueXY(),
  };
  panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => this.props.closeOnDragDown ?? false,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: this.state.pan.y }])(e, gestureState);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { height = 200 } = this.props;
      if ((height + headerHeight) / 4 - gestureState.dy < 0) {
        this.setModalVisible(false);
      } else {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  setModalVisible = (visible: boolean) => {
    const { duration, onClose } = this.props;
    const { minClosingHeight = 0, height = 200 } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height + headerHeight,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: minClosingHeight,
        duration,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });

        if (typeof onClose === "function") {
          onClose();
        }
      });
    }
  };

  open = () => {
    this.setModalVisible(true);
  };

  close = () => {
    this.setModalVisible(false);
  };

  render() {
    const { animationType, closeOnDragDown } = this.props;
    const { closeOnPressMask, closeOnPressBack } = this.props;
    const { children, customStyles, onlyHeader, styleProps } = this.props;
    const { keyboardAvoidingViewEnabled } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };
    const viewProps = onlyHeader ? {} : this.panResponder.panHandlers;

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          if (closeOnPressBack) {
            this.setModalVisible(false);
          }
        }}
      >
        <KeyboardAwareScrollView
          bounces={true}
          enableOnAndroid={true}
          enableAutomaticScroll={keyboardAvoidingViewEnabled}
          contentContainerStyle={[styles.wrapper, customStyles?.wrapper]}
        >
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...viewProps}
            style={StyleSheet.flatten([
              panStyle,
              styles.container,
              styleProps,
              { height: animatedHeight },
              customStyles?.container,
            ])}
          >
            {closeOnDragDown && (
              <View
                style={styles.draggableContainer}
                {...this.panResponder.panHandlers}
              >
                <View
                  style={[styles.draggableIcon, customStyles?.draggableIcon]}
                />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}

export default BottomSheet;

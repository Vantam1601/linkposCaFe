import React from "react";
import { ImageProps, ImageStyle, StyleProp } from "react-native";
import FastImage, { ResizeMode } from "react-native-fast-image";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { DEFAULT_NO_IMAGE, validURL } from "src/helpers/constants";
import { COLOR } from "src/theme/color";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const ImageProgress = createImageProgress(FastImage);

interface Props extends Omit<ImageProps, "source"> {
  placeholder?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode: ResizeMode;
  source?: string | null;
  children?: React.ReactNode;
  needProgress?: boolean;
}

const defaultProps: Props = {
  placeholder: DEFAULT_NO_IMAGE,
  resizeMode: FastImage.resizeMode.cover,
  needProgress: false,
};

type State = {
  loaded: boolean;
};
export default class FastImagePlaceholder extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = defaultProps;
  render() {
    const {
      placeholder,
      resizeMode,
      source,
      style,
      needProgress,
      children,
    } = this.props;
    const sourceC = source ? source : DEFAULT_NO_IMAGE;

    if (needProgress) {
      return (
        <ImageProgress
          source={{
            uri: sourceC,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 50,
            borderWidth: 1,
            color: COLOR.main_color,
            unfilledColor: "rgba(200, 200, 200, 0.2)",
          }}
          resizeMode={resizeMode ?? "center"}
          style={style}
        >
          {children}
        </ImageProgress>
      );
    } else {
      return null;
      // <FastImage
      //   source={{
      //     uri: sourceC,
      //     priority: FastImage.priority.high,
      //     cache: FastImage.cacheControl.immutable,
      //   }}
      //   resizeMode={resizeMode ?? 'center'}
      //   style={style}
      // />
    }
  }
}

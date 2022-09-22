import React, { useState } from 'react';
import { ImageStyle, Modal, SafeAreaView, SafeAreaViewBase, View, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import FastImagePlaceholder from './FastImage';

export type Props = {
  imgStyle?: ImageStyle;
  wrapImgStyle?: ViewStyle;
  url: string;
};

export const ZoomImage: React.SFC<Props> = React.memo(({ url, imgStyle, wrapImgStyle, ...props }) => {
  const [visible, setVisible] = useState(false);
  const user = useCurrentUser();
  const images = [
    {
      // Simplest usage.
      url: url !== '' ? url : (user?.avatar as string),

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];

  const renderImage = (item: any) => {
    return (
      <FastImagePlaceholder  needProgress source={item?.source?.uri} style={[item.style, { overflow: 'hidden' }]} />
    );
  };

  return (
    <View style={wrapImgStyle}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => setVisible(true)}>
        <FastImagePlaceholder resizeMode="contain" source={url} style={[imgStyle, { overflow: 'hidden' }]} />
      </TouchableOpacity>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <Icon
            containerStyle={{ position: 'absolute', left: 10, top: 50, zIndex: 99 }}
            color="white"
            name="close-circle"
            type="ionicon"
            size={30}
            onPress={() => setVisible(false)}
          />
          <ImageViewer
            renderIndicator={() => <View />}
            enableImageZoom
            onSwipeDown={() => setVisible(false)}
            enableSwipeDown
            style={{ justifyContent: 'center', alignItems: 'center' }}
            imageUrls={images}
            renderImage={renderImage}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
});
